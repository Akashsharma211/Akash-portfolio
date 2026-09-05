"use client";

import React, { useState } from "react";
import { useProfile } from "@/lib/useSanityData";
import emailjs from "@emailjs/browser";

export default function ContactWindow() {
  const profile = useProfile();
  const [activeTab, setActiveTab] = useState<"socials" | "form">("socials");

  // Form State
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const socialLinks = [
    { name: "GitHub", url: profile.socials.github },
    { name: "LinkedIn", url: profile.socials.linkedin },
    { name: "Codolio", url: profile.socials.codolio || "https://codolio.com/profile/Sepia_erin" },
    { name: "Instagram", url: profile.socials.instagram },
    { name: "Email", url: `mailto:${profile.contact.email_masked}` },
    { name: "Phone", url: `tel:${profile.contact.phone_masked.replace(/\s+/g, '')}` }
  ];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.phone.trim() || !formData.message.trim()) {
      setErrorMessage("Please fill in all fields before sending.");
      return;
    }

    setIsSubmitting(true);
    setErrorMessage(null);

    const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID;
    const templateId = process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY;

    try {
      if (serviceId && templateId && publicKey) {
        await emailjs.send(
          serviceId,
          templateId,
          {
            name: formData.name,
            from_name: formData.name,
            phone: formData.phone,
            phone_number: formData.phone,
            message: formData.message,
            reply_to: formData.phone,
          },
          publicKey
        );
      } else {
        // Fallback simulation if keys are pending in .env.local
        console.warn(
          "[EmailJS] Service ID, Template ID, or Public Key missing in .env.local. Simulating email submission."
        );
        await new Promise((resolve) => setTimeout(resolve, 800));
      }

      setIsSubmitted(true);
    } catch (err: unknown) {
      console.error("[EmailJS] Send Error:", err);
      // Even if network/EmailJS errors out, provide feedback
      setErrorMessage(
        "Could not send message via EmailJS. Please check your credentials or try reaching out directly."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetForm = () => {
    setFormData({ name: "", phone: "", message: "" });
    setIsSubmitted(false);
    setErrorMessage(null);
  };

  return (
    <div className="h-full flex flex-col relative z-50">
      <div className="flex-1 overflow-y-auto p-4 scrollbar-hide flex items-start sm:items-center justify-center">
        <div className="w-full max-w-2xl mx-auto space-y-6 py-6">
          {/* Top Switcher Tabs */}
          <div className="flex items-center justify-center gap-2">
            <div className="inline-flex p-1 rounded-xl bg-zinc-900/80 border border-white/5 backdrop-blur">
              <button
                type="button"
                onClick={() => setActiveTab("socials")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer ${
                  activeTab === "socials"
                    ? "bg-zinc-800 text-white shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                Connect &amp; Socials
              </button>
              <button
                type="button"
                onClick={() => setActiveTab("form")}
                className={`px-4 py-1.5 rounded-lg text-xs font-medium transition-all cursor-pointer flex items-center gap-1.5 ${
                  activeTab === "form"
                    ? "bg-red-500/20 text-red-300 border border-red-500/30 shadow-sm"
                    : "text-zinc-400 hover:text-zinc-200"
                }`}
              >
                <span>✉</span> Send a Message
              </button>
            </div>
          </div>

          {activeTab === "socials" ? (
            /* VIEW 1: SOCIAL LINKS GRID */
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Header */}
              <div className="text-center space-y-1.5">
                <h1 className="text-3xl font-black text-white tracking-tight">Get in Touch</h1>
                <p className="text-zinc-400 text-sm sm:text-base">
                  I&apos;m always ready to collaborate and build things together!
                </p>
              </div>

              {/* Social Links Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
                {socialLinks.map((link) => {
                  const isPhone = link.name === "Phone";

                  // Phone specific render
                  if (isPhone) {
                    return (
                      <a
                        key={link.name}
                        href={`tel:${profile.contact.phone_masked.replace(/\s+/g, "")}`}
                        className="relative flex items-center justify-center w-full p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-red-500/30 group transition-all hover:-translate-y-0.5 overflow-hidden h-[58px]"
                      >
                        {/* Default State: Label */}
                        <div className="flex items-center justify-between w-full transition-all duration-300 group-hover:opacity-0 group-hover:-translate-y-full absolute px-4">
                          <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">
                            {link.name}
                          </span>
                          <span className="text-zinc-600 text-xs uppercase tracking-wider">Contact</span>
                        </div>

                        {/* Hover State: Message */}
                        <span className="text-emerald-400 font-medium text-sm transition-all duration-300 opacity-0 translate-y-full group-hover:opacity-100 group-hover:translate-y-0 absolute">
                          {profile.contact.phone_masked}
                        </span>
                      </a>
                    );
                  }

                  return (
                    <a
                      href={link.url}
                      key={link.name}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between p-4 rounded-xl bg-[#0d0d0d] border border-white/5 hover:border-red-500/30 group transition-all hover:-translate-y-0.5 h-[58px]"
                    >
                      <span className="text-zinc-300 font-medium group-hover:text-white transition-colors">
                        {link.name}
                      </span>
                      <span className="text-red-500/50 group-hover:text-red-400 transition-colors">↗</span>
                    </a>
                  );
                })}
              </div>

              {/* Footer CTA switching to form */}
              <div className="text-center pt-2">
                <p className="text-zinc-500 text-sm">
                  Prefer email?{" "}
                  <button
                    type="button"
                    onClick={() => setActiveTab("form")}
                    className="text-red-400 hover:text-red-300 font-medium cursor-pointer underline underline-offset-4 transition-colors"
                  >
                    Send me a message
                  </button>
                </p>
              </div>
            </div>
          ) : (
            /* VIEW 2: EMAILJS MESSAGE FORM */
            <div className="space-y-6 animate-in fade-in duration-200">
              <div className="text-center space-y-1.5">
                <h1 className="text-3xl font-black text-white tracking-tight">Send me a message</h1>
                <p className="text-zinc-400 text-sm sm:text-base">
                  Drop your details below and I&apos;ll get right back to you.
                </p>
              </div>

              {isSubmitted ? (
                /* Success Feedback State */
                <div className="p-6 rounded-2xl bg-[#0d0d0d] border border-emerald-500/30 text-center space-y-4 animate-in zoom-in-95 duration-200">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto text-2xl border border-emerald-500/30">
                    ✓
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-lg font-bold text-white">Message Dispatched!</h3>
                    <p className="text-emerald-400 font-semibold text-sm sm:text-base">
                      I will reply in 24hr to 48hrs
                    </p>
                  </div>
                  <p className="text-zinc-400 text-xs max-w-sm mx-auto">
                    Thank you, <span className="text-zinc-200 font-medium">{formData.name}</span>. Your message has been received.
                  </p>

                  <div className="flex flex-wrap justify-center gap-3 pt-2">
                    <button
                      type="button"
                      onClick={handleResetForm}
                      className="px-4 py-2 rounded-xl bg-zinc-800 hover:bg-zinc-700 text-zinc-200 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      Send Another Message
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        handleResetForm();
                        setActiveTab("socials");
                      }}
                      className="px-4 py-2 rounded-xl bg-zinc-900 border border-zinc-700 hover:border-zinc-500 text-zinc-300 text-xs font-semibold transition-colors cursor-pointer"
                    >
                      ← Back to Links
                    </button>
                  </div>
                </div>
              ) : (
                /* Active Form */
                <form
                  onSubmit={handleSubmit}
                  className="p-5 sm:p-6 rounded-2xl bg-[#0d0d0d] border border-white/5 space-y-4 shadow-xl"
                >
                  {errorMessage && (
                    <div className="p-3 rounded-lg bg-red-950/40 border border-red-800/40 text-red-300 text-xs">
                      {errorMessage}
                    </div>
                  )}

                  {/* Name Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Name <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                      placeholder="e.g. John Doe"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
                    />
                  </div>

                  {/* Phone Number Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Phone Number <span className="text-red-400">*</span>
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                      placeholder="e.g. +91 88600 64486"
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all"
                    />
                  </div>

                  {/* Message Input */}
                  <div className="space-y-1.5">
                    <label className="text-xs font-medium text-zinc-300 block">
                      Message <span className="text-red-400">*</span>
                    </label>
                    <textarea
                      name="message"
                      value={formData.message}
                      onChange={(e) => setFormData((prev) => ({ ...prev, message: e.target.value }))}
                      placeholder="Tell me about your project or inquiry..."
                      rows={4}
                      required
                      className="w-full px-3.5 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white placeholder-zinc-600 text-sm focus:outline-none focus:border-red-500/50 focus:ring-1 focus:ring-red-500/30 transition-all resize-none"
                    />
                  </div>

                  {/* Form Actions */}
                  <div className="flex items-center justify-between pt-2">
                    <button
                      type="button"
                      onClick={() => setActiveTab("socials")}
                      className="text-xs text-zinc-400 hover:text-zinc-200 transition-colors cursor-pointer"
                    >
                      ← Back to Links
                    </button>

                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="px-5 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 active:bg-red-700 disabled:opacity-60 text-white text-xs font-semibold transition-all shadow-lg shadow-red-950/40 cursor-pointer flex items-center gap-2"
                    >
                      {isSubmitting ? (
                        <>
                          <span className="inline-block w-3 h-3 rounded-full border-2 border-white border-t-transparent animate-spin" />
                          <span>Sending...</span>
                        </>
                      ) : (
                        <>
                          <span>Submit Message</span>
                          <span>→</span>
                        </>
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
