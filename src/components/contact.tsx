"use client";

import React, { useState, useEffect } from "react";
import { siteConfig } from "@/data/site";
import { SectionHeading } from "@/components/ui/section-heading";
import { useToast } from "@/components/ui/toaster";
import {
  Mail,
  Linkedin,
  Github,
  MapPin,
  Clock,
  Send,
  ExternalLink,
  FileText,
  AlertCircle,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";

export function Contact() {
  const { toast } = useToast();
  const [currentTime, setCurrentTime] = useState<string>("--:--:--");
  const [renderedAt, setRenderedAt] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formFeedback, setFormFeedback] = useState<{
    type: "success" | "info" | "error";
    message: string;
  } | null>(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
    website_hp: "", // Honeypot spam trap
  });

  // Track component mount timestamp for time-gate spam protection
  useEffect(() => {
    setRenderedAt(Date.now());
  }, []);

  // Live Dhaka clock
  useEffect(() => {
    const updateTime = () => {
      try {
        const timeString = new Intl.DateTimeFormat([], {
          timeZone: siteConfig.timezone,
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        }).format(new Date());
        setCurrentTime(timeString);
      } catch {
        setCurrentTime("--:--:--");
      }
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setFormFeedback(null);

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          subject: formData.subject,
          message: formData.message,
          website_hp: formData.website_hp,
          renderedAt,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        setFormFeedback({
          type: "error",
          message: result.error || "Validation error occurred.",
        });
        toast(result.error || "Validation failed", "error");
        setIsSubmitting(false);
        return;
      }

      if (result.providerConfigured) {
        setFormFeedback({
          type: "success",
          message: "Thank you! Your message was delivered successfully.",
        });
        toast("Message sent successfully!", "success");
        setFormData({ name: "", email: "", subject: "", message: "", website_hp: "" });
      } else {
        // Honest disclosure: server validation passed, provider not yet configured
        setFormFeedback({
          type: "info",
          message:
            "Input validated! (Note: Server delivery provider RESEND_API_KEY is not configured yet). Opening your email client to dispatch...",
        });
        toast("Validated. Opening email client...", "info");

        // Construct pre-filled mailto
        const encodedSubject = encodeURIComponent(
          formData.subject || `Inquiry from ${formData.name}`
        );
        const encodedBody = encodeURIComponent(
          `Hi Sadman,\n\n${formData.message}\n\n---\nSender: ${formData.name}\nEmail: ${formData.email}`
        );

        setTimeout(() => {
          window.location.href = `mailto:${siteConfig.email}?subject=${encodedSubject}&body=${encodedBody}`;
        }, 800);
      }
    } catch {
      setFormFeedback({
        type: "error",
        message: "Failed to connect to contact server endpoint. Please email directly.",
      });
      toast("Connection error", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 md:py-28 px-4 sm:px-6 lg:px-8 border-t border-[var(--border)]">
      <div className="max-w-6xl mx-auto">
        <SectionHeading
          eyebrow="07 / CONTACT"
          title="Initiate a Discussion"
          subtitle="Open to conversations regarding cybersecurity collaboration, software projects, internships, and technical problem-solving."
        />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-start">
          {/* Verified Contact Details & Channels */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] space-y-5 shadow-sm">
              <div>
                <h3 className="text-lg font-bold font-display text-[var(--text-primary)] mb-2">
                  Verified Channels
                </h3>
                <p className="text-xs sm:text-sm text-[var(--text-secondary)] leading-relaxed">
                  Direct channels for inquiries, recruitment, or academic discussions.
                </p>
              </div>

              {/* Channels List */}
              <div className="space-y-3 font-mono text-xs">
                <a
                  href={`mailto:${siteConfig.email}`}
                  className="flex items-center gap-3 p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-accent)] text-[var(--text-primary)] transition-colors group"
                >
                  <Mail className="w-4 h-4 text-[var(--accent)]" />
                  <span className="truncate group-hover:text-[var(--accent)] transition-colors">
                    {siteConfig.email}
                  </span>
                </a>

                {siteConfig.linkedin && (
                  <a
                    href={siteConfig.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-accent)] text-[var(--text-primary)] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Linkedin className="w-4 h-4 text-[var(--accent)]" />
                      <span className="group-hover:text-[var(--accent)] transition-colors">
                        LinkedIn Profile
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  </a>
                )}

                {siteConfig.github && (
                  <a
                    href={siteConfig.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-accent)] text-[var(--text-primary)] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <Github className="w-4 h-4 text-[var(--accent)]" />
                      <span className="group-hover:text-[var(--accent)] transition-colors">
                        @{siteConfig.githubUser}
                      </span>
                    </div>
                    <ExternalLink className="w-3.5 h-3.5 text-[var(--text-secondary)]" />
                  </a>
                )}

                {siteConfig.resumePdf && (
                  <a
                    href={siteConfig.resumePdf}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-between p-3 rounded-lg bg-[var(--surface)] border border-[var(--border)] hover:border-[var(--border-accent)] text-[var(--text-primary)] transition-colors group"
                  >
                    <div className="flex items-center gap-3">
                      <FileText className="w-4 h-4 text-[var(--accent)]" />
                      <span className="group-hover:text-[var(--accent)] transition-colors">
                        Download Verified CV
                      </span>
                    </div>
                    <span className="text-[10px] text-[var(--text-secondary)] bg-[var(--border-subtle)] px-2 py-0.5 rounded">
                      PDF
                    </span>
                  </a>
                )}
              </div>

              {/* Local Time & Location */}
              <div className="pt-4 border-t border-[var(--border)] space-y-2 font-mono text-xs">
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <MapPin className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>{siteConfig.location}</span>
                </div>
                <div className="flex items-center gap-2 text-[var(--text-secondary)]">
                  <Clock className="w-3.5 h-3.5 text-[var(--accent)]" />
                  <span>
                    Local Time:{" "}
                    <strong className="text-[var(--text-primary)] font-semibold">
                      {currentTime}
                    </strong>{" "}
                    (Dhaka)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form with Server-side validation */}
          <div className="lg:col-span-7">
            <form
              onSubmit={handleSubmit}
              className="p-6 sm:p-8 rounded-xl bg-[var(--card-bg)] border border-[var(--border)] shadow-md space-y-4"
            >
              {/* Spam Protection Honeypot (Visually Hidden) */}
              <div className="sr-only" aria-hidden="true">
                <label htmlFor="website_hp">Leave this field blank</label>
                <input
                  id="website_hp"
                  type="text"
                  name="website_hp"
                  tabIndex={-1}
                  autoComplete="off"
                  value={formData.website_hp}
                  onChange={(e) =>
                    setFormData({ ...formData, website_hp: e.target.value })
                  }
                />
              </div>

              {/* Form Feedback Alert */}
              {formFeedback && (
                <div
                  role="alert"
                  aria-live="polite"
                  className={`p-4 rounded-lg flex items-start gap-3 text-xs font-mono leading-relaxed border ${
                    formFeedback.type === "success"
                      ? "bg-[var(--accent-muted)] border-[var(--border-accent)] text-[var(--accent)]"
                      : formFeedback.type === "info"
                      ? "bg-blue-500/10 border-blue-500/30 text-blue-500"
                      : "bg-red-500/10 border-red-500/30 text-red-500"
                  }`}
                >
                  {formFeedback.type === "success" && (
                    <CheckCircle2 className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  {formFeedback.type === "info" && (
                    <HelpCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  {formFeedback.type === "error" && (
                    <AlertCircle className="w-4 h-4 shrink-0 mt-0.5" />
                  )}
                  <p>{formFeedback.message}</p>
                </div>
              )}

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="block font-mono text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                  >
                    Your Name *
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    required
                    minLength={2}
                    maxLength={100}
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="e.g. Alex Morgan"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="block font-mono text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                  >
                    Your Email *
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="alex@example.com"
                    className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                  />
                </div>
              </div>

              <div>
                <label
                  htmlFor="contact-subject"
                  className="block font-mono text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                >
                  Subject
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  maxLength={200}
                  value={formData.subject}
                  onChange={(e) =>
                    setFormData({ ...formData, subject: e.target.value })
                  }
                  placeholder="e.g. Cybersecurity collaboration / Software project"
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:border-[var(--accent)] focus:outline-none transition-colors"
                />
              </div>

              <div>
                <label
                  htmlFor="contact-message"
                  className="block font-mono text-xs font-semibold text-[var(--text-primary)] mb-1.5"
                >
                  Message *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  minLength={10}
                  maxLength={5000}
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  placeholder="Please describe your project, inquiry, or discussion topic..."
                  className="w-full px-3.5 py-2.5 rounded-lg bg-[var(--surface)] border border-[var(--border)] text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:border-[var(--accent)] focus:outline-none transition-colors resize-y"
                />
              </div>

              <div className="pt-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="inline-flex items-center justify-center gap-2 px-6 py-2.5 rounded-lg bg-[var(--accent)] text-[var(--bg-primary)] font-semibold text-sm hover:opacity-90 transition-all shadow-md focus-visible:outline-2 focus-visible:outline-[var(--accent)] disabled:opacity-50"
                >
                  <Send className="w-4 h-4" />
                  <span>
                    {isSubmitting ? "Validating & Submitting..." : "Submit Message"}
                  </span>
                </button>

                <p className="font-mono text-[11px] text-[var(--text-secondary)]">
                  Server-side validated with rate-limit &amp; honeypot bot filters.
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
