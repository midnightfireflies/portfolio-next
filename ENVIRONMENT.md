# ENVIRONMENT CONFIGURATION GUIDE

**Project:** Sadman Siam — Engineering Portfolio (`portfolio-next`)  
**Specification:** Environment Variables & External Integration Guide  
**Security Status:** STRICT — No Secrets Committed

---

## 1. Overview

The portfolio application is designed to be **100% functional out of the box** without requiring any external credentials to build, test, and render.

All third-party external integrations (such as email delivery via Resend or production base URLs) are guarded with graceful fallback behaviors. No secrets or credentials are hardcoded or tracked in Git.

---

## 2. Environment Variables Specification

| Variable Name | Required / Optional | Scope | Default Value | Description & Behavior |
| :--- | :--- | :--- | :--- | :--- |
| `RESEND_API_KEY` | Optional | Server-only (`route.ts`) | *Unset* | API key from [Resend](https://resend.com) for sending automated contact notification emails. |
| `CONTACT_NOTIFICATION_EMAIL` | Optional | Server-only (`route.ts`) | `sadmansiam1110@gmail.com` | Destination email inbox where validated contact messages will be forwarded. |
| `NEXT_PUBLIC_SITE_URL` | Optional | Client & Server | `http://localhost:3000` | Canonical URL of the deployed application used for OpenGraph cards, Twitter preview cards, and canonical links. |

---

## 3. Detailed Behavior: Configured vs. Unconfigured

### 3.1 `RESEND_API_KEY`

- **When CONFIGURED:**
  - Upon submitting the contact form, the server route `/api/contact`:
    1. Enforces in-memory rate limiting (max 5 requests per 15-minute window per IP).
    2. Runs honeypot (`website_hp`) and time-gate (< 1.8 seconds) spam detection.
    3. Validates field constraints (length, email regex format, message bounds).
    4. Authenticates to `https://api.resend.com/emails` with Bearer token.
    5. Dispatches email to `CONTACT_NOTIFICATION_EMAIL` with `reply_to` set to user's email.
    6. Returns `{ success: true, providerConfigured: true, message: "..." }`.
  - The frontend UI displays a success banner confirming automated email dispatch.

- **When UNCONFIGURED (Default State):**
  - The server route `/api/contact`:
    1. Still runs all validation, rate limiting, and spam filtering logic.
    2. Returns `{ success: true, providerConfigured: false, message: "..." }` along with validated parameters.
  - The frontend UI displays an honest status notice explaining that the server provider is not yet configured, and offers a 1-click **mailto pre-filled fallback button** (`mailto:sadmansiam1110@gmail.com?subject=...&body=...`) alongside direct copyable email addresses.
  - **Zero false claims:** The site never tells the user a message was emailed if it was not sent.

---

### 3.2 `CONTACT_NOTIFICATION_EMAIL`

- **When CONFIGURED:** Overrides the recipient address for form notification emails.
- **When UNCONFIGURED:** Defaults to verified address `sadmansiam1110@gmail.com`.

---

### 3.3 `NEXT_PUBLIC_SITE_URL`

- **When CONFIGURED:** Sets the OpenGraph canonical URL and metadata tags (e.g., `https://sadmansiam.dev`).
- **When UNCONFIGURED:** Falls back to `http://localhost:3000` for local development.

---

## 4. Local Development Setup

To configure these variables for local development:

1. Copy `.env.example` to `.env.local`:
   ```bash
   cp .env.example .env.local
   ```
2. Open `.env.local` in your editor and provide values:
   ```env
   RESEND_API_KEY=re_1234567890abcdef
   CONTACT_NOTIFICATION_EMAIL=sadmansiam1110@gmail.com
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```
3. Restart the development server (`npm run dev`) or production server (`npm run build && npm run start`).
4. **Security Verification:** Verify that `.env.local` is present in `.gitignore` (already configured in workspace `.gitignore`). Never commit `.env.local` to Git.

---

## 5. Production (Vercel) Deployment Setup

When deploying to Vercel:

1. Navigate to the project settings in the Vercel Dashboard:  
   **Project Settings → Environment Variables**.
2. Add the following variables:
   - `RESEND_API_KEY`: Value from your Resend dashboard (set to Production and Preview environments).
   - `CONTACT_NOTIFICATION_EMAIL`: `sadmansiam1110@gmail.com`.
   - `NEXT_PUBLIC_SITE_URL`: Your custom production domain (e.g., `https://sadman-siam.vercel.app`).
3. Redeploy the application.
