import { useState } from "react";
import { Check, Copy, Facebook, Instagram, Linkedin, Mail, MessageCircle, Rocket, Twitter } from "lucide-react";
import { Link } from "react-router-dom";
import InterestForm from "@/components/InterestForm";
import { footerFlatLinks } from "@/components/footerLinks";
import { useToast } from "@/hooks/use-toast";
import footerCommunityVideo from "../../footer-community.mp4";

const whatsappUrl = "https://chat.whatsapp.com/IOpBgZK29CQEhhdOd5hUAD";

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
  const { toast } = useToast();
  const [registerOpen, setRegisterOpen] = useState(false);
  const [supportOpen, setSupportOpen] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText("info@corteqs.net");
    setCopied(true);
    toast({
      title: "Kopyalandı",
      description: "E-posta adresi panoya alındı.",
    });
    window.setTimeout(() => setCopied(false), 2000);
  };

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
            <div className="mx-auto max-w-3xl">
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-white/70">
                <Rocket className="h-4 w-4 text-turquoise" />
                Diaspora Launch Pad
              </div>

              <h2 className="text-balance text-3xl font-extrabold tracking-[-0.04em] text-white sm:text-4xl lg:text-[3.3rem]">
                Yakında Açılıyoruz!
              </h2>

              <p className="mx-auto mt-4 max-w-3xl text-pretty text-base leading-relaxed text-white/78 sm:text-lg">
                Dünyanın neresinde olursanız olun, CorteQS sizi danışmanlar, topluluklar, fırsatlar ve hızlı bağlantılarla
                bir araya getirecek.
              </p>

              <div className="mt-7">
                <a
                  href="mailto:info@corteqs.net"
                  className="inline-flex items-center gap-3 rounded-2xl border border-white/15 bg-white/10 px-5 py-3 text-left transition-all hover:bg-white/15"
                >
                  <Mail className="h-5 w-5 text-turquoise" />
                  <span className="text-base font-bold text-turquoise sm:text-lg">info@corteqs.net</span>
                </a>
              </div>

              <div className="mx-auto mt-8 flex max-w-md flex-col gap-3">
                <button
                  onClick={() => setRegisterOpen(true)}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-gradient-primary px-5 py-3 text-sm font-bold text-primary-foreground shadow-[0_18px_45px_-18px_rgba(249,115,22,0.75)] transition-all duration-300 hover:-translate-y-0.5 hover:opacity-95"
                >
                  Kategorine Kayıt ve Takip İçin →
                </button>

                <button
                  onClick={() => setSupportOpen(true)}
                  className="inline-flex min-h-12 w-full items-center justify-center rounded-xl bg-[linear-gradient(135deg,#1ab6c9_0%,#2382d5_100%)] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_45px_-18px_rgba(35,130,213,0.72)] transition-all duration-300 hover:-translate-y-0.5 hover:brightness-105"
                >
                  Teknik, Org, Yatırım Görüşmeleri İçin →
                </button>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-[#25D366] px-5 py-3 text-sm font-bold text-white shadow-[0_18px_45px_-18px_rgba(37,211,102,0.72)] transition-all duration-300 hover:-translate-y-0.5 hover:bg-[#1ebe5d]"
                >
                  <MessageCircle className="h-4 w-4" />
                  WhatsApp Grubuna Katıl →
                </a>
              </div>

              <div className="mt-9">
                <p className="mb-3 text-sm font-medium text-white/68">Bizi sosyal medyada takip edin</p>
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
            </div>

            <div className="mt-10 flex flex-col items-center justify-between gap-4 border-t border-white/12 pt-6 text-sm text-white/60 md:flex-row">
              <div className="flex flex-col items-center gap-3 md:flex-row md:gap-4">
                <span>© {new Date().getFullYear()} CorteQS. Diaspora ağı, fırsatlar ve topluluklar için hazırlanıyor.</span>
                <Link to="/pricing" className="font-semibold text-turquoise transition-colors hover:text-white">
                  Hakkımızda / Planlar
                </Link>
              </div>

              <div className="flex items-center gap-2">
                <a href="mailto:info@corteqs.net" className="font-semibold text-turquoise transition-colors hover:text-white">
                  info@corteqs.net
                </a>
                <button
                  onClick={handleCopy}
                  className="rounded-full border border-white/10 bg-white/5 p-2 text-white/70 transition-colors hover:bg-white/10 hover:text-white"
                  title="E-postayı kopyala"
                >
                  {copied ? <Check className="h-4 w-4 text-emerald-400" /> : <Copy className="h-4 w-4" />}
                </button>
              </div>
            </div>

            <div className="mt-6 border-t border-white/10 pt-5">
              <div className="flex flex-wrap items-center justify-center gap-y-3 text-sm text-white/70">
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
        </div>
      </section>

      <InterestForm
        open={registerOpen}
        onOpenChange={setRegisterOpen}
        context="genel"
        title="Kategorine kayıt ol"
        description="Platform açıldığında ilk sen haberdar ol. Rolünü seç, bilgilerini bırak, erken erişim avantajını yakala."
        source="home-closing-cta-register"
      />

      <InterestForm
        open={supportOpen}
        onOpenChange={setSupportOpen}
        context="genel"
        title="Teknik / organizasyon / yatırım görüşmesi"
        description="İş birliği, partnerlik, operasyon veya yatırım tarafında konuşmak istiyorsanız bilgilerinizi bırakın."
        source="home-closing-cta-support"
      />
    </>
  );
};

export default HomeClosingCTA;
