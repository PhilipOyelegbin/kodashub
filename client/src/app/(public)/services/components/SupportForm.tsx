"use client";

import { useState } from "react";
import {
  Send,
  Paperclip,
  ShieldCheck,
  Server,
  Globe,
  Lock,
  Mail,
  RefreshCw,
  Cpu,
  CheckCircle2,
} from "lucide-react";

type ServiceCategory =
  | "dns_domain"
  | "ssl_cert"
  | "cpanel_directadmin"
  | "wordpress_repair"
  | "email_issues"
  | "vps_server";

export const SupportForm = () => {
  const [category, setCategory] = useState<ServiceCategory>("dns_domain");
  const [priority, setPriority] = useState<"normal" | "urgent" | "critical">(
    "normal",
  );
  const [submitted, setSubmitted] = useState(false);
  const [files, setFiles] = useState<FileList | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Connect to backend API endpoint (e.g., NestJS / Express API)
    setSubmitted(true);
  };

  if (submitted) {
    return (
      <div className="bg-white rounded-2xl p-8 md:p-12 border border-slate-200 shadow-xl text-center space-y-6">
        <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
          <CheckCircle2 size={36} />
        </div>
        <h3 className="text-2xl font-bold text-navy">
          Technical Request Submitted
        </h3>
        <p className="text-slate-600 max-w-md mx-auto text-sm">
          Our engineering team has received your request. An initial diagnostic
          scan has been queued for your domain. We will contact you via email
          shortly.
        </p>
        <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 text-left text-xs font-mono text-slate-700 max-w-md mx-auto">
          <p className="text-slate-400 mb-1"># Ticket Reference</p>
          <p className="font-bold text-blue">
            KH-REQ-{Math.floor(100000 + Math.random() * 900000)}
          </p>
        </div>
        <button
          onClick={() => setSubmitted(false)}
          className="px-6 py-2.5 text-sm font-semibold text-navy bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
        >
          Submit Another Request
        </button>
      </div>
    );
  }

  return (
    <div
      id="request-form"
      className="bg-white rounded-2xl border border-slate-200/80 shadow-xl overflow-hidden"
    >
      <div className="bg-navy p-6 md:p-8 text-white relative">
        <div className="flex items-center justify-between">
          <div>
            <h3 className="text-2xl font-bold">
              Request Technical Intervention
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Provide details about your website, hosting, or server error to
              get started.
            </p>
          </div>
          <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800 text-cyan text-xs font-mono border border-slate-700">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
            Engineers Online
          </div>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="p-6 md:p-8 space-y-6">
        {/* Step 1: Issue Category Selection */}
        <div>
          <label className="block text-sm font-semibold text-navy mb-3">
            1. Select Issue Category
          </label>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
            {[
              { id: "dns_domain", label: "DNS & Domains", icon: Globe },
              { id: "ssl_cert", label: "SSL / HTTPS", icon: Lock },
              {
                id: "cpanel_directadmin",
                label: "cPanel / DirectAdmin",
                icon: Server,
              },
              {
                id: "wordpress_repair",
                label: "WordPress Repair",
                icon: RefreshCw,
              },
              { id: "email_issues", label: "Email / SPF / DKIM", icon: Mail },
              { id: "vps_server", label: "VPS & Linux Server", icon: Cpu },
            ].map((item) => {
              const Icon = item.icon;
              const isSelected = category === item.id;
              return (
                <button
                  type="button"
                  key={item.id}
                  onClick={() => setCategory(item.id as ServiceCategory)}
                  className={`flex flex-col items-start p-3.5 rounded-xl border text-left transition-all ${
                    isSelected
                      ? "border-blue bg-blue-50/50 text--blue ring-2 ring-blue/20"
                      : "border-slate-200 hover:border-slate-300 text-slate-700 bg-white"
                  }`}
                >
                  <Icon
                    size={20}
                    className={isSelected ? "text-blue" : "text-slate-400"}
                  />
                  <span className="text-xs font-semibold mt-2">
                    {item.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Step 2: Contact Information */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Your Name *
            </label>
            <input
              type="text"
              required
              placeholder="Philip Oyelegbin"
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
              placeholder="you@domain.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Step 3: Server & Domain Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Affected Domain / URL *
            </label>
            <input
              type="text"
              required
              placeholder="example.com"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent font-mono transition-all"
            />
          </div>
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-1">
              Hosting Provider / Control Panel (Optional)
            </label>
            <input
              type="text"
              placeholder="e.g. cPanel, DirectAdmin, Namecheap, AWS"
              className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
            />
          </div>
        </div>

        {/* Step 4: Issue Description & Priority */}
        <div>
          <label className="block text-xs font-semibold text-slate-700 mb-1">
            Detailed Issue Description *
          </label>
          <textarea
            required
            rows={4}
            placeholder="Describe the error message, behavior, or error codes (e.g. 500 Internal Server Error, ERR_TOO_MANY_REDIRECTS, DNS_PROBE_FINISHED_NXDOMAIN)..."
            className="w-full px-3.5 py-2.5 text-sm rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue focus:border-transparent transition-all"
          />
        </div>

        {/* Priority & File Upload Row */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 items-center">
          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Urgency Level
            </label>
            <div className="flex gap-2">
              {[
                { id: "normal", label: "Normal" },
                { id: "urgent", label: "Urgent" },
                { id: "critical", label: "Critical Outage" },
              ].map((item) => (
                <button
                  type="button"
                  key={item.id}
                  onClick={() =>
                    setPriority(item.id as "normal" | "urgent" | "critical")
                  }
                  className={`flex-1 py-2 text-xs font-semibold rounded-lg border transition-all ${
                    priority === item.id
                      ? item.id === "critical"
                        ? "bg-red-50 border-red-500 text-red-600"
                        : "bg-blue-50 border-blue text-blue"
                      : "border-slate-200 text-slate-600 hover:bg-slate-50"
                  }`}
                >
                  {item.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-slate-700 mb-2">
              Attachments (Error Logs / Screenshots)
            </label>
            <label className="flex items-center justify-center gap-2 px-3 py-2 border border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-blue transition-colors text-xs text-slate-600">
              <Paperclip size={16} />
              <span>
                {files
                  ? `${files.length} file(s) selected`
                  : "Upload logs or screenshots"}
              </span>
              <input
                type="file"
                multiple
                className="hidden"
                onChange={(e) => setFiles(e.target.files)}
              />
            </label>
          </div>
        </div>

        {/* Security / Privacy Guarantee */}
        <div className="p-3 bg-slate-50 border border-slate-200/80 rounded-xl flex items-center gap-3 text-xs text-slate-600">
          <ShieldCheck size={20} className="text-blue shrink-0" />
          <span>
            Your data is strictly confidential. Confidential details like server
            credentials should only be provided after ticket creation via our
            encrypted client portal.
          </span>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3.5 px-6 rounded-xl text-white font-semibold text-sm bg-linear-to-r from-blue to-cyan hover:opacity-95 shadow-md shadow-cyan-500/10 flex items-center justify-center gap-2 transition-all"
        >
          <Send size={16} />
          Submit Technical Assistance Request
        </button>
      </form>
    </div>
  );
};
