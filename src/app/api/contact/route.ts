import { NextRequest, NextResponse } from "next/server";

// In-memory rate limiting map: ip -> timestamps[]
const rateLimitMap = new Map<string, number[]>();
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000; // 15 minutes
const MAX_REQUESTS_PER_WINDOW = 5;

// Basic email validation regex
const EMAIL_REGEX = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

export async function POST(req: NextRequest) {
  try {
    // 1. IP extraction & in-memory rate limiting
    const ip =
      req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
      req.headers.get("x-real-ip") ||
      "unknown";

    const now = Date.now();
    const timestamps = rateLimitMap.get(ip) || [];
    const validTimestamps = timestamps.filter(
      (ts) => now - ts < RATE_LIMIT_WINDOW_MS
    );

    if (validTimestamps.length >= MAX_REQUESTS_PER_WINDOW) {
      return NextResponse.json(
        {
          error:
            "Too many requests from your IP. Please try again after 15 minutes or email directly.",
        },
        { status: 429 }
      );
    }

    // 2. Parse payload
    const body = await req.json().catch(() => null);
    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { error: "Invalid request payload." },
        { status: 400 }
      );
    }

    const { name, email, subject, message, website_hp, renderedAt } = body;

    // 3. Spam protection: Honeypot field
    // If a bot filled out the hidden website_hp field, reject silently
    if (website_hp) {
      return NextResponse.json(
        { error: "Spam submission detected by honeypot filter." },
        { status: 400 }
      );
    }

    // 4. Spam protection: Timestamp / time-gate check
    // Real humans typically take more than 2 seconds to complete the form
    if (renderedAt && typeof renderedAt === "number") {
      const duration = now - renderedAt;
      if (duration < 1800) {
        return NextResponse.json(
          { error: "Form submission completed too quickly (automated submission blocked)." },
          { status: 400 }
        );
      }
    }

    // 5. Server-side validation
    const trimmedName = typeof name === "string" ? name.trim() : "";
    const trimmedEmail = typeof email === "string" ? email.trim() : "";
    const trimmedSubject = typeof subject === "string" ? subject.trim() : "Portfolio Inquiry";
    const trimmedMessage = typeof message === "string" ? message.trim() : "";

    if (!trimmedName || trimmedName.length < 2 || trimmedName.length > 100) {
      return NextResponse.json(
        { error: "Name must be between 2 and 100 characters." },
        { status: 400 }
      );
    }

    if (
      !trimmedEmail ||
      trimmedEmail.length > 254 ||
      !EMAIL_REGEX.test(trimmedEmail)
    ) {
      return NextResponse.json(
        { error: "Please provide a valid email address." },
        { status: 400 }
      );
    }

    if (trimmedSubject.length > 200) {
      return NextResponse.json(
        { error: "Subject must not exceed 200 characters." },
        { status: 400 }
      );
    }

    if (
      !trimmedMessage ||
      trimmedMessage.length < 10 ||
      trimmedMessage.length > 5000
    ) {
      return NextResponse.json(
        { error: "Message must be between 10 and 5,000 characters." },
        { status: 400 }
      );
    }

    // Record valid attempt for rate limiting
    validTimestamps.push(now);
    rateLimitMap.set(ip, validTimestamps);

    // 6. External provider credential verification
    // We check RESEND_API_KEY or other documented provider
    const resendApiKey = process.env.RESEND_API_KEY;

    if (!resendApiKey) {
      // Honest disclosure: server validation passed, but delivery provider is not configured yet
      return NextResponse.json({
        success: true,
        providerConfigured: false,
        message:
          "Form data successfully validated. Server email provider (RESEND_API_KEY) is not configured in environment variables. Please use the direct email link or mailto fallback.",
        validatedData: {
          name: trimmedName,
          email: trimmedEmail,
          subject: trimmedSubject,
          message: trimmedMessage,
        },
      });
    }

    // If RESEND_API_KEY is configured, dispatch via Resend API
    try {
      const resendRes = await fetch("https://api.resend.com/emails", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${resendApiKey}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          from: "Portfolio Contact <onboarding@resend.dev>",
          to: [process.env.CONTACT_NOTIFICATION_EMAIL || "sadmansiam1110@gmail.com"],
          reply_to: trimmedEmail,
          subject: `[Portfolio Inquiry] ${trimmedSubject}`,
          text: `Name: ${trimmedName}\nEmail: ${trimmedEmail}\nSubject: ${trimmedSubject}\n\nMessage:\n${trimmedMessage}`,
        }),
      });

      if (!resendRes.ok) {
        const errorDetails = await resendRes.text();
        return NextResponse.json(
          {
            error:
              "Delivery provider reported an error. Please contact directly via email.",
            providerError: errorDetails,
          },
          { status: 502 }
        );
      }

      return NextResponse.json({
        success: true,
        providerConfigured: true,
        message: "Message successfully delivered through configured provider.",
      });
    } catch (deliveryError) {
      return NextResponse.json(
        {
          error:
            "Failed to communicate with the delivery provider. Please email directly.",
        },
        { status: 500 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: "Internal server error occurred." },
      { status: 500 }
    );
  }
}
