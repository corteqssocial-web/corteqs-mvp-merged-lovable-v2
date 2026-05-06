import {
  ArrowRight,
  Globe,
  MessageCircle,
  PenSquare,
  Sparkles,
  UserPlus,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import { useDiaspora } from "@/contexts/DiasporaContext";
import { cn } from "@/lib/utils";

const actionCardBase =
  "group relative w-full overflow-hidden rounded-[1.5rem] border px-5 py-4 shadow-[0_18px_40px_-30px_rgba(15,23,42,0.38)] transition-all duration-300 hover:-translate-y-0.5 hover:shadow-[0_22px_48px_-30px_rgba(15,23,42,0.44)]";

const HeroSection = () => {
  const { t } = useDiaspora();
  const h = t.hero;

  return (
    <section className="relative flex min-h-[calc(100vh-4rem)] items-center overflow-hidden bg-gradient-hero pt-16">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-5rem] top-20 h-56 w-56 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute bottom-10 left-1/4 h-40 w-40 rounded-full bg-turquoise/10 blur-3xl" />
      </div>

      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[52%] lg:block"
        aria-hidden="true"
      >
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/78 to-transparent" />
        <div className="absolute inset-y-6 right-0 w-full bg-[url('/newera.png')] bg-contain bg-right bg-no-repeat opacity-[0.3]" />
        <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-background/95 via-background/68 to-transparent blur-2xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 py-8 md:py-10">
        <div className="max-w-[43rem]">
          <div className="mb-4 flex items-center gap-4 lg:gap-5">
            <img
              src="/logo.png"
              alt="Corteqs"
              className="h-20 w-20 shrink-0 object-contain drop-shadow-[0_16px_26px_rgba(249,115,22,0.14)] sm:h-24 sm:w-24 lg:h-28 lg:w-28"
              loading="eager"
            />

            <div className="min-w-0">
              <div className="mb-2 inline-flex items-center gap-2 rounded-full border border-turquoise/28 bg-turquoise/10 px-3 py-1.5 shadow-sm">
                <Globe className="h-3.5 w-3.5 text-turquoise" />
                <span className="text-xs font-semibold text-turquoise sm:text-sm">{h.badge}</span>
              </div>

              <h1 className="max-w-[10.5ch] text-[2.8rem] font-extrabold leading-[0.92] tracking-[-0.05em] text-foreground sm:text-[3.6rem] lg:text-[4.2rem]">
                {h.title}
                <span className="text-gradient-primary">{h.titleHighlight}</span>
                {h.titleEnd}
              </h1>
            </div>
          </div>

          <p className="mb-5 max-w-[36rem] text-base leading-relaxed text-muted-foreground/88 sm:text-[1.1rem]">
            {h.subtitle}
          </p>

          <div className="max-w-[42rem] space-y-3">
            <Link to="/auth" className="block">
              <div
                className={cn(
                  actionCardBase,
                  "border-turquoise/38 bg-[linear-gradient(135deg,#11385f_0%,#1b6288_55%,#36bcc7_110%)] text-primary-foreground",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/15 p-2.5 backdrop-blur-sm">
                      <UserPlus className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold leading-tight sm:text-[1.1rem]">Kaydol — Diaspora Pasaportun Çıksın</p>
                      <p className="mt-1 text-sm text-primary-foreground/80">Hesabını aç, profilini kur, ağın içine gir.</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link to="/whatsapp-groups" className="block">
              <div
                className={cn(
                  actionCardBase,
                  "border-emerald-300/52 bg-[linear-gradient(135deg,#92d65c_0%,#b5e15d_52%,#d9ef8f_100%)] text-slate-900",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/40 p-2.5">
                      <MessageCircle className="h-4.5 w-4.5 text-emerald-700" />
                    </div>
                    <div>
                      <p className="text-lg font-bold leading-tight sm:text-[1.1rem]">WhatsApp Grubuna Katıl</p>
                      <p className="mt-1 text-sm text-slate-800/78">Topluluklar, şehirler, hızlı bağlantılar</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-slate-800/75 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link to="/founders-1000" className="block">
              <div
                className={cn(
                  actionCardBase,
                  "border-amber-300/58 bg-[linear-gradient(135deg,#ffd35a_0%,#ffe07b_55%,#fff1a8_100%)] text-slate-900",
                )}
              >
                <span className="absolute right-4 top-3 rounded-full bg-slate-900 px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-gold">
                  Erken Erişim
                </span>
                <div className="flex items-center justify-between gap-4 pr-24">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/45 p-2.5">
                      <Sparkles className="h-4.5 w-4.5 text-amber-600" />
                    </div>
                    <div>
                      <p className="text-lg font-bold leading-tight sm:text-[1.1rem]">Founding 1000&apos;e Katıl</p>
                      <p className="mt-1 text-sm text-slate-800/76">Danışmanlar, işletmeler, kuruluşlar, vloggerlar</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 text-slate-800/75 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link to="/blog-contest" className="block">
              <div
                className={cn(
                  actionCardBase,
                  "border-orange-300/54 bg-[linear-gradient(135deg,#f26a21_0%,#f68d33_56%,#f7a55b_100%)] text-white",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/16 p-2.5">
                      <PenSquare className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold leading-tight sm:text-[1.1rem]">Blogger Yarışması</p>
                      <p className="mt-1 text-sm text-white/82">Yaz, yayınla, ödül havuzuna gir.</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>

            <Link to="/vlogger-contest" className="block">
              <div
                className={cn(
                  actionCardBase,
                  "border-sky-300/48 bg-[linear-gradient(135deg,#1887b4_0%,#2676a1_54%,#315b91_100%)] text-white",
                )}
              >
                <div className="flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="rounded-full bg-white/16 p-2.5">
                      <Video className="h-4.5 w-4.5" />
                    </div>
                    <div>
                      <p className="text-lg font-bold leading-tight sm:text-[1.1rem]">Vlogger Yarışması</p>
                      <p className="mt-1 text-sm text-white/82">Video üret, kitleni büyüt, öne çık.</p>
                    </div>
                  </div>
                  <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                </div>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
