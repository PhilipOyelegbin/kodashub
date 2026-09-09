import Image from "next/image";
import Link from "next/link";

const support = [
  { label: "DNS & Domain Configuration", path: "#" },
  { label: "SSL Installation & Fixes", path: "#" },
  { label: "cPanel / DirectAdmin Assistance", path: "#" },
  { label: "WordPress Restoration and more...", path: "#" },
];

const infrastructure = [
  { label: "Domain Registration", path: "#" },
  { label: "Shared Web Hosting", path: "#" },
  { label: "Cloud VPS Hosting", path: "#" },
];

export const Footer = () => {
  return (
    <footer className="bg-navy text-slate-400 py-12 border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/kh_dark.png"
                alt="KodasHub Dark Logo"
                className="w-32 aspect-video"
                width={32}
                height={32}
              />
            </Link>
            <p className="text-xs leading-relaxed text-slate-400">
              Technical resolution platform for website errors, domain issues,
              and hosting infrastructure.
            </p>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Support Services
            </h4>
            <ul className="space-y-2 text-xs">
              {support.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="hover:text-cyan transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              Infrastructure
            </h4>
            <ul className="space-y-2 text-xs">
              {infrastructure.map((item, index) => (
                <li key={index}>
                  <a
                    href={item.path}
                    className="hover:text-cyan transition-colors"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-semibold text-white mb-4">
              System Status
            </h4>
            <div className="flex items-center gap-2 text-xs text-emerald-400 mb-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              All Support Queues Operational
            </div>
            <p className="text-xs text-slate-500">
              Average response time for urgent tickets is currently under 15
              minutes.
            </p>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-800 text-xs text-center text-slate-500">
          © {new Date().getFullYear()} KodasHub. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
