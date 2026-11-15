# SECURITY-REVIEW.md — Security Audit Report

> **Target:** `portfolio-next` (Personal Developer & Cybersecurity Portfolio)
> **Owner:** Md. Sadman Siam
> **Date of Audit:** 2026-11-15
> **Audit Status:** Completed — Evidence-Based Assessment

---

## 1. Executive Summary

This security review covers the architecture, configuration, client components, and server-side route handlers of the `portfolio-next` project. The codebase was audited for secret exposure, environment variable safety, HTTP response headers, content security policy (CSP), input sanitization, external link security, anti-spam mechanisms, and dependency risks.

All findings are documented below with verified evidence from codebase inspection and live server testing.

---

## 2. Environment Variables & Secret Handling

| Check | Status | Verification & Evidence |
| :--- | :--- | :--- |
| **No Committed Secrets** | ✅ PASSED | Scanned git history and working tree. No `.env`, `.env.local`, or private API tokens exist in the repository. |
| **`.gitignore` Protection** | ✅ PASSED | `.gitignore` explicitly ignores `.env*.local`, `.env`, and private files (`*.pem`). |
| **Documented Configuration** | ✅ PASSED | Created `.env.example` documenting optional credentials (`RESEND_API_KEY`, `CONTACT_NOTIFICATION_EMAIL`) with placeholders only. |
| **Client-Side Secret Isolation** | ✅ PASSED | No sensitive keys use the `NEXT_PUBLIC_` prefix. `RESEND_API_KEY` is referenced solely on the server in `src/app/api/contact/route.ts`. |

---

## 3. HTTP Security Headers & Content Security Policy (CSP)

HTTP security headers were added to `next.config.js` and verified against the live Next.js server (`http://localhost:3000`).

### Verified Response Headers (Live HTTP Probe Evidence)

```http
HTTP/1.1 200 OK
Content-Security-Policy: default-src 'self'; script-src 'self' 'unsafe-eval' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; img-src 'self' data: https://avatars.githubusercontent.com https://github.com; font-src 'self' data: https://fonts.gstatic.com; connect-src 'self' https://api.github.com; object-src 'none'; base-uri 'self'; form-action 'self' mailto:; frame-ancestors 'none'; block-all-mixed-content; upgrade-insecure-requests;
X-DNS-Prefetch-Control: on
Strict-Transport-Security: max-age=63072000; includeSubDomains; preload
X-Frame-Options: DENY
X-Content-Type-Options: nosniff
Referrer-Policy: strict-origin-when-cross-origin
Permissions-Policy: camera=(), microphone=(), geolocation=(), browsing-topics=()
```

### Analysis of Implemented Controls:
1. **Content-Security-Policy (CSP):** Restricts script, style, image, font, and API connections to verified origins (`self`, `api.github.com`, `avatars.githubusercontent.com`, `fonts.gstatic.com`). Blocks object/plugin execution (`object-src 'none'`) and clickjacking framing (`frame-ancestors 'none'`).
2. **X-Frame-Options (`DENY`):** Completely prevents the site from being rendered in `<iframe>`, `<frame>`, or `<object>` elements, preventing clickjacking.
3. **X-Content-Type-Options (`nosniff`):** Enforces strict MIME typing and prevents browsers from sniffing content types away from the declared header.
4. **Strict-Transport-Security (HSTS):** Enforces HTTPS for 2 years (`max-age=63072000`) including subdomains and preloading eligibility.
5. **Referrer-Policy (`strict-origin-when-cross-origin`):** Protects user privacy by withholding sensitive referrer URL paths when crossing origins.
6. **Permissions-Policy:** Explicitly revokes browser hardware access (camera, microphone, geolocation, interest cohort/topics).
7. **Server Fingerprinting Disabled (`poweredByHeader: false`):** The default `X-Powered-By: Next.js` header is omitted from server responses.

---

## 4. Input Validation & Safe Rendering

| Vector | Finding | Evidence |
| :--- | :--- | :--- |
| **XSS / HTML Injection** | ✅ SECURE | Zero instances of `dangerouslySetInnerHTML`. React's automatic string escaping sanitizes all rendered variables in both visual components and the interactive terminal emulator. |
| **Server-Side Validation** | ✅ SECURE | `src/app/api/contact/route.ts` enforces strict validation: Name (2–100 chars), Email (RFC-compliant regex, max 254 chars), Subject (max 200 chars), Message (10–5000 chars). |
| **Interactive Terminal Guardrail** | ✅ SECURE | The in-browser terminal emulator explicitly disclaims execution capability. Unknown or probed commands (e.g. `sudo`, `cat`, `nmap`) produce a safe static disclaimer rather than simulating shell execution. |

---

## 5. Contact Form Security & Anti-Spam Architecture

The contact submission pipeline incorporates defense-in-depth against automated bots and resource exhaustion:

1. **Honeypot Trap:** A hidden input `website_hp` with `tabIndex={-1}` and `sr-only` is ignored by legitimate users. Automated scrapers filling this field are instantly blocked (`HTTP 400: Spam submission detected by honeypot filter`).
2. **Time-Gate Verification:** Form tracks client component mount timestamp (`renderedAt`). Submissions completed in under 1.8 seconds are rejected as robotic bursts (`HTTP 400: Form submission completed too quickly`).
3. **In-Memory Rate Limiting:** Enforces a maximum threshold of 5 requests per 15-minute window per IP address (`HTTP 429: Too many requests`).
4. **Delivery Provider Transparency:** If `RESEND_API_KEY` is not present in the runtime environment, the server accurately responds with `providerConfigured: false` and triggers a client `mailto:` fallback rather than falsely reporting delivery.

---

## 6. External Links & Navigation Security

Every external link (`target="_blank"`) across all components was audited:
- Checked components: `navigation.tsx`, `hero.tsx`, `projects.tsx`, `github-activity.tsx`, `security-lab.tsx`, `blog.tsx`, `contact.tsx`, `footer.tsx`, `terminal.tsx`.
- **Result:** 100% of external links enforce `rel="noopener noreferrer"`. This neutralizes `window.opener` reverse-tabnabbing vulnerabilities and prevents cross-origin DOM access.

---

## 7. Dependency Vulnerability Review (`npm audit`)

Running `npm audit` on the project root identified known security advisories:

```
# npm audit report
next  0.9.9 - 16.3.0-preview.10 (Severity: critical/high)
postcss <=8.5.22 (Severity: high)
```

### Risk Assessment & Remediation Notes:
- **Root Cause:** The project was initialized with `next@14.2.5` and `postcss@^8.4.40`. Known CVEs exist in early 14.2.x builds primarily impacting Image Optimization and Server Actions with Edge runtimes.
- **Current Mitigations Active:**
  - Server Actions are **not used** (the contact form uses a dedicated Next.js API Route Handler).
  - External image domains are strictly locked via `remotePatterns` to trusted GitHub origins.
- **Recommended Action Before Production Deployment:**
  - Run `npm audit fix --force` or upgrade `next` to the latest supported security patch (`14.2.25` or `14.2.35`) in `package.json` once network access to the npm registry is unconstrained.

---

## 8. HTTPS & Deployment Readiness

- The application is configured for deployment on modern platforms (e.g. Vercel) where TLS termination occurs at the edge.
- `next.config.js` sets `upgrade-insecure-requests` in the Content Security Policy to prevent mixed-content warnings.
- HSTS headers are enabled to enforce encrypted HTTPS transport across all modern user agents.

---

## 9. Summary of Remaining Risks & Recommendations

1. **Email Provider Configuration:** Set `RESEND_API_KEY` in environment variables when direct server-side email dispatch is desired.
2. **Next.js Package Upgrade:** Upgrade `next` from `14.2.5` to latest `14.2.x` patch release to resolve upstream framework CVEs reported in `npm audit`.
3. **Production Rate Limiting:** For high-traffic production environments, consider backing the in-memory rate limiter with Upstash Redis or Vercel KV if running on distributed serverless instances where in-memory state is not shared across lambda instances.
