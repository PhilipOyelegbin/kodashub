"use client";
import { useState } from "react";
import {
  Mail,
  MessageSquare,
  Clock,
  Send,
  CheckCircle2,
  ShieldAlert,
} from "lucide-react";

export const ContactSection = () => {
  const [submitted, setSubmitted] = useState(false);
  const [inquiryType, setInquiryType] = useState("general");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Left Column: Contact Channels & System SLA */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                Direct Communication
              </span>
              <h2 className="text-3xl font-bold text-navy mt-3 sm:text-4xl">
                Get in Touch with Our Team
              </h2>
              <p className="mt-4 text-slate-600 text-sm leading-relaxed">
                Have questions about our hosting plans, domain reseller
                programs, or need custom SLA support? Our technical operations
                team is available 24/7.
              </p>
            </div>

            {/* Direct Channels Cards */}
            <div className="space-y-4">
              <div className="p-5 rounded-2xl bg-bg border border-slate-200/80 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-blue shadow-sm border border-slate-200 shrink-0">
                  <Mail size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy">
                    Email Engineering Support
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    For ticket updates and technical inquiries
                  </p>
                  <a
                    href="mailto:support@kodashub.com"
                    className="text-xs font-semibold text-blue hover:underline mt-1 inline-block"
                  >
                    support@kodashub.com
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-bg border border-slate-200/80 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-cyan shadow-sm border border-slate-200 shrink-0">
                  <MessageSquare size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy">
                    Live Chat & Ticket Portal
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    Instant triage for active hosting customers
                  </p>
                  <a
                    href="/login"
                    className="text-xs font-semibold text-blue hover:underline mt-1 inline-block"
                  >
                    Open Client Portal →
                  </a>
                </div>
              </div>

              <div className="p-5 rounded-2xl bg-bg border border-slate-200/80 flex items-start gap-4">
                <div className="p-3 bg-white rounded-xl text-blue shadow-sm border border-slate-200 shrink-0">
                  <Clock size={22} />
                </div>
                <div>
                  <h4 className="text-sm font-bold text-navy">
                    Response Time SLA
                  </h4>
                  <p className="text-xs text-slate-500 mt-0.5">
                    • Critical Outages:{" "}
                    <span className="font-semibold text-emerald-600">
                      &lt; 15 Minutes
                    </span>
                    <br />• General Inquiries:{" "}
                    <span className="font-semibold text-slate-700">
                      &lt; 2 Hours
                    </span>
                  </p>
                </div>
              </div>
            </div>

            {/* Emergency Notice */}
            <div className="p-4 rounded-xl bg-amber-50 border border-amber-200 text-amber-800 text-xs flex items-start gap-3">
              <ShieldAlert
                size={20}
                className="text-amber-600 shrink-0 mt-0.5"
              />
              <div>
                <span className="font-bold">Experiencing a server outage?</span>{" "}
                If your website is down or DNS is failing, please use the{" "}
                <a
                  href="/services#request-form"
                  className="underline font-bold hover:text-amber-900"
                >
                  Technical Service Form
                </a>{" "}
                to bypass sales queues.
              </div>
            </div>
          </div>

          {/* Right Column: Contact & Inquiry Form */}
          <div className="lg:col-span-7">
            <div className="bg-white rounded-2xl border border-slate-200 shadow-xl overflow-hidden">
              <div className="bg-navy p-6 md:p-8 text-white">
                <h3 className="text-2xl font-bold">Send Us a Message</h3>
                <p className="text-slate-400 text-sm mt-1">
                  Fill out the form below and we’ll route your inquiry to the
                  right specialist.
                </p>
              </div>

              {submitted ? (
                <div className="p-8 md:p-12 text-center space-y-6">
                  <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
                    <CheckCircle2 size={36} />
                  </div>
                  <h3 className="text-2xl font-bold text-navy">
                    Message Received
                  </h3>
                  <p className="text-slate-600 max-w-md mx-auto text-sm">
                    Thank you for reaching out. A representative will get back
                    to you shortly at the email address provided.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="px-6 py-2.5 text-sm font-semibold text-navy bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
                  {/* Inquiry Type Radio Options */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-2">
                      Inquiry Category
                    </label>
                    <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                      {[
                        { id: "general", label: "General Query" },
                        { id: "sales", label: "Hosting / VPS Sales" },
                        { id: "reseller", label: "Domain Reseller" },
                        { id: "partnership", label: "Partnerships" },
                        { id: "billing", label: "Billing & Invoices" },
                      ].map((item) => (
                        <button
                          type="button"
                          key={item.id}
                          onClick={() => setInquiryType(item.id)}
                          className={`py-2 px-3 text-xs font-semibold rounded-lg border transition-all text-left ${
                            inquiryType === item.id
                              ? "bg-blue-50 border-blue text-blue ring-1 ring-blue/30"
                              : "border-slate-200 text-slate-600 hover:bg-slate-50"
                          }`}
                        >
                          {item.label}
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* Name and Email */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="John Doe"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-slate-700 mb-1">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        required
                        placeholder="john@example.com"
                        className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
                      />
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Subject *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="e.g. Inquiry about Managed VPS Hosting & Custom SLA"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Message */}
                  <div>
                    <label className="block text-xs font-semibold text-slate-700 mb-1">
                      Message *
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="How can we help you?"
                      className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <button
                    type="submit"
                    className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-sm bg-linear-to-r from-blue to-cyan hover:opacity-95 shadow-md shadow-cyan-500/10 flex items-center justify-center gap-2 transition-all"
                  >
                    <Send size={16} />
                    Send Message
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
