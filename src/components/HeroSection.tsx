import {
  ArrowRight,
  Globe,
  MapPin,
  MessageCircle,
  PenSquare,
  Sparkles,
  UserPlus,
  Users,
  Video,
} from "lucide-react";
import { Link } from "react-router-dom";
import landmarksImage from "@/assets/landmarks-collage.png";
import { useDiaspora } from "@/contexts/DiasporaContext";
import { cn } from "@/lib/utils";

const actionCardBase =
  "group relative overflow-hidden rounded-[1.6rem] border px-5 py-5 shadow-[0_20px_50px_-28px_rgba(15,23,42,0.45)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_24px_60px_-28px_rgba(15,23,42,0.52)]";

const HeroSection = () => {
  const { t } = useDiaspora();
  const h = t.hero;

  return (
    <section className="relative overflow-hidden bg-gradient-hero pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-[-6rem] top-20 h-64 w-64 rounded-full bg-primary/10 blur-3xl" />
        <div className="absolute right-[-4rem] top-28 h-72 w-72 rounded-full bg-gold/12 blur-3xl" />
        <div className="absolute bottom-8 left-1/3 h-56 w-56 rounded-full bg-turquoise/12 blur-3xl" />
      </div>

      <div className="container relative z-10 mx-auto px-4 pb-14 pt-8 md:pb-20 md:pt-12">
        <div className="grid items-center gap-10 xl:grid-cols-[minmax(0,1.03fr)_minmax(540px,1fr)] xl:gap-12">
          <div className="max-w-2xl">
            <div className="mb-6 flex flex-col gap-5 sm:flex-row sm:items-start">
              <img
                src="/logo.png"
                alt="Corteqs"
                className="h-28 w-28 shrink-0 object-contain drop-shadow-[0_18px_30px_rgba(249,115,22,0.15)] sm:h-36 sm:w-36 lg:h-44 lg:w-44"
                loading="eager"
              />
              <div className="pt-1">
                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-turquoise/30 bg-turquoise/12 px-4 py-2 shadow-sm">
                  <Globe className="h-4 w-4 text-turquoise" />
                  <span className="text-sm font-semibold text-turquoise">{h.badge}</span>
                </div>

                <h1
                  className="max-w-[11ch] text-[2.7rem] font-extrabold leading-[0.94] tracking-[-0.045em] text-foreground sm:text-[3.2rem] lg:text-[4.4rem]"
                  style={{ animationDelay: "0.08s" }}
                >
                  {h.title}
                  <span className="text-gradient-primary">{h.titleHighlight}</span>
                  {h.titleEnd}
                </h1>
              </div>
            </div>

            <p
              className="mb-8 max-w-xl text-lg leading-relaxed text-muted-foreground/90 sm:text-[1.35rem]"
              style={{ animationDelay: "0.16s" }}
            >
              {h.subtitle}
            </p>

            <div className="space-y-4">
              <Link to="/auth" className="block">
                <div
                  className={cn(
                    actionCardBase,
                    "rounded-[1.8rem] border-turquoise/40 bg-[linear-gradient(135deg,#12395f_0%,#1f6990_54%,#30c8c9_110%)] text-primary-foreground",
                  )}
                >
                  <div className="flex items-center justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <div className="rounded-full bg-white/16 p-3 backdrop-blur-sm">
                        <UserPlus className="h-5 w-5" />
                      </div>
                      <div>
                        <p className="text-[1.08rem] font-bold sm:text-[1.22rem]">Kaydol — Diaspora Pasaportun Çıksın</p>
                        <p className="mt-1 text-sm text-primary-foreground/80">Hesabını aç, profilini kur, ağın içine gir.</p>
                      </div>
                    </div>
                    <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                  </div>
                </div>
              </Link>

              <div className="grid gap-4 md:grid-cols-2">
                <Link to="/whatsapp-groups" className="block">
                  <div
                    className={cn(
                      actionCardBase,
                      "min-h-[8.5rem] border-emerald-300/55 bg-[linear-gradient(135deg,#79c95b_0%,#a7d45a_48%,#d8eb84_100%)] text-slate-900",
                    )}
                  >
                    <div className="flex h-full flex-col justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/40 p-3">
                          <MessageCircle className="h-5 w-5 text-emerald-700" />
                        </div>
                        <span className="text-lg font-bold">WhatsApp Grubuna Katıl</span>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800/80">
                        Topluluklar, şehirler, hızlı bağlantılar
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>

                <Link to="/founders-1000" className="block">
                  <div
                    className={cn(
                      actionCardBase,
                      "min-h-[8.5rem] border-amber-300/60 bg-[linear-gradient(135deg,#ffd04e_0%,#ffdd6c_48%,#fff1a8_100%)] text-slate-900",
                    )}
                  >
                    <span className="absolute right-4 top-3 rounded-full bg-slate-900 px-3 py-1 text-[0.66rem] font-extrabold uppercase tracking-[0.16em] text-gold">
                      Erken Erisim
                    </span>
                    <div className="flex h-full flex-col justify-between gap-5">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/45 p-3">
                          <Sparkles className="h-5 w-5 text-amber-600" />
                        </div>
                        <div>
                          <p className="text-lg font-bold">Founding 1000&apos;e Katil</p>
                          <p className="mt-1 text-sm text-slate-800/75">Danismanlar, isletmeler, kuruluslar, vloggerlar</p>
                        </div>
                      </div>
                      <span className="inline-flex items-center gap-2 text-sm font-semibold text-slate-800/80">
                        Kurucu toplulukta yerini ayir
                        <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                      </span>
                    </div>
                  </div>
                </Link>
              </div>

              <div className="grid gap-4 md:grid-cols-2">
                <Link to="/blog-contest" className="block">
                  <div
                    className={cn(
                      actionCardBase,
                      "border-orange-300/55 bg-[linear-gradient(135deg,#f26a21_0%,#f58b30_52%,#f6a357_100%)] text-white",
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/16 p-3">
                          <PenSquare className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-lg font-bold">Blogger Yarismasi</p>
                          <p className="mt-1 text-sm text-white/80">Yaz, yayinla, odul havuzuna gir.</p>
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
                      "border-sky-300/50 bg-[linear-gradient(135deg,#1989b8_0%,#2478a6_48%,#315c92_100%)] text-white",
                    )}
                  >
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-3">
                        <div className="rounded-full bg-white/16 p-3">
                          <Video className="h-5 w-5" />
                        </div>
                        <div>
                          <p className="text-lg font-bold">Vlogger Yarismasi</p>
                          <p className="mt-1 text-sm text-white/80">Video uret, kitleni buyut, one cik.</p>
                        </div>
                      </div>
                      <ArrowRight className="h-5 w-5 shrink-0 transition-transform duration-300 group-hover:translate-x-1" />
                    </div>
                  </div>
                </Link>
              </div>
            </div>

            <div className="mt-8 flex flex-wrap items-center gap-x-6 gap-y-3 rounded-2xl border border-white/55 bg-white/55 px-5 py-4 shadow-[0_22px_50px_-34px_rgba(15,23,42,0.35)] backdrop-blur-md">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-turquoise" />
                <span className="text-sm font-medium text-foreground/80">{h.stat1}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-foreground/80">{h.stat2}</span>
              </div>
              <div className="flex items-center gap-2">
                <Globe className="h-4 w-4 text-gold" />
                <span className="text-sm font-medium text-foreground/80">{h.stat3}</span>
              </div>
            </div>
          </div>

          <div className="relative mx-auto w-full max-w-[58rem] xl:max-w-none">
            <div className="absolute -inset-x-4 -inset-y-6 rounded-[2.5rem] bg-white/45 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2.4rem] border border-white/70 bg-[linear-gradient(180deg,rgba(255,255,255,0.88),rgba(255,250,245,0.72))] p-4 shadow-[0_38px_80px_-42px_rgba(15,23,42,0.42)] backdrop-blur-xl sm:p-6 lg:p-7">
              <div className="absolute inset-y-0 left-0 w-16 bg-gradient-to-r from-background/65 via-background/20 to-transparent blur-xl" />
              <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background/25 to-transparent" />
              <div className="absolute right-8 top-8 h-28 w-28 rounded-full bg-primary/6 blur-2xl" />
              <div className="relative rounded-[2rem] border border-orange-100/70 bg-[linear-gradient(135deg,rgba(255,255,255,0.9),rgba(255,245,238,0.76))] px-2 py-3 sm:px-4 sm:py-5">
                <img
                  src={landmarksImage}
                  alt="World landmarks"
                  className="h-full w-full object-contain object-center opacity-95"
                  loading="eager"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
