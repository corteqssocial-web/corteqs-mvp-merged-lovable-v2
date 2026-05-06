import { Facebook, Instagram, Linkedin, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import { footerFlatLinks } from "@/components/footerLinks";
import footerCommunityVideo from "../../footer-community.mp4";

const socialLinks = [
  {
    href: "https://www.linkedin.com/company/corteqs-global",
    label: "LinkedIn",
    icon: Linkedin,
    className: "bg-[#0A66C2] hover:bg-[#0958a7]",
  },
  {
    href: "https://www.facebook.com/corteqs",
    label: "Facebook",
    icon: Facebook,
    className: "bg-[#1877F2] hover:bg-[#1669d2]",
  },
  {
    href: "https://www.instagram.com/corteqsturk",
    label: "Instagram",
    icon: Instagram,
    className: "bg-[linear-gradient(135deg,#feda75_0%,#d62976_50%,#4f5bd5_100%)] hover:opacity-90",
  },
  {
    href: "https://x.com/turksdiaspora",
    label: "X",
    icon: Twitter,
    className: "bg-black hover:bg-neutral-800",
  },
];

const HomeClosingCTA = () => {
  return (
    <>
      <section className="relative isolate overflow-hidden px-4 py-14 sm:px-6 lg:px-8 lg:py-20">
        <video
          className="absolute inset-0 h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
          aria-hidden="true"
        >
          <source src={footerCommunityVideo} type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-[linear-gradient(135deg,rgba(8,36,44,0.88)_0%,rgba(16,37,47,0.76)_40%,rgba(23,29,35,0.72)_66%,rgba(51,35,28,0.84)_100%)]" />
        <div className="absolute inset-0 opacity-30 [background-image:linear-gradient(rgba(255,255,255,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.08)_1px,transparent_1px)] [background-size:32px_32px]" />
        <div className="pointer-events-none absolute left-[-12%] top-16 h-44 w-44 rounded-full bg-turquoise/25 blur-3xl" />
        <div className="pointer-events-none absolute bottom-10 right-[-4%] h-56 w-56 rounded-full bg-primary/25 blur-3xl" />

        <div className="container relative z-10 mx-auto max-w-6xl">
          <div className="mx-auto max-w-5xl rounded-[2rem] border border-white/15 bg-black/25 px-5 py-8 text-center shadow-[0_36px_120px_-42px_rgba(0,0,0,0.55)] backdrop-blur-xl sm:px-8 lg:px-12 lg:py-10">
            <div className="mx-auto mb-10 max-w-3xl">
              <p className="mb-4 text-sm font-medium text-white/68">Bizi sosyal medyada takip edin</p>
              <div className="mx-auto grid max-w-xl grid-cols-2 gap-3 sm:grid-cols-4">
                {socialLinks.map(({ href, label, icon: Icon, className }) => (
                  <a
                    key={label}
                    href={href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`CorteQS ${label}`}
                    className={`inline-flex min-h-12 items-center justify-center gap-2 rounded-2xl px-4 py-3 text-sm font-semibold text-white shadow-md transition-all duration-300 hover:-translate-y-0.5 ${className}`}
                  >
                    <Icon className="h-4 w-4" />
                    {label}
                  </a>
                ))}
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
                <div className="inline-flex min-w-max items-center whitespace-nowrap px-1 text-sm text-white/70">
                {footerFlatLinks.map((link, index) => (
                  <div
                    key={link.label}
                    className={index > 0 ? "ml-3 border-l border-white/20 pl-3" : ""}
                  >
                    {link.to ? (
                      <Link
                        to={link.to}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.href}
                        className="transition-colors hover:text-white"
                      >
                        {link.label}
                      </a>
                    )}
                  </div>
                ))}
                </div>
              </div>
            </div>

            <div className="mt-5 border-t border-white/10 pt-5">
              <p className="overflow-x-auto whitespace-nowrap text-center text-xs text-white/60 sm:text-sm">
                © 2026 CorteQS bir Qualtron Sinclair ve Akçakanat-Terzioğlu Girişimidir. Tüm hakları saklıdır.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default HomeClosingCTA;
