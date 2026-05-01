import { ArrowRight, Globe, MapPin, Users, Trophy, MessageCircle, Sparkles, Video, PenSquare, UserPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import landmarksImage from "@/assets/landmarks-collage.png";
import { useDiaspora } from "@/contexts/DiasporaContext";
import HeroCityCounters from "@/components/HeroCityCounters";

const HeroSection = () => {
  const { t } = useDiaspora();
  const h = t.hero;

  return (
    <>
      <section className="relative pt-16 min-h-[75vh] flex items-center bg-gradient-hero overflow-hidden">
        {/* Decorative blobs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-80 h-80 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute top-1/3 left-1/3 w-[500px] h-[500px] bg-turquoise-light/12 rounded-full blur-3xl" />
          <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-gold/10 rounded-full blur-3xl" />
        </div>

      {/* Landmarks image */}
      <div className="absolute bottom-0 right-0 w-full md:w-3/5 h-[50%] md:h-[85%] pointer-events-none">
        <img
          src={landmarksImage}
          alt="World landmarks"
          className="w-full h-full object-contain object-bottom opacity-55"
          loading="eager"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background/70 via-background/15 to-transparent" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/80 via-background/30 to-transparent" />
      </div>

      <div className="container mx-auto px-4 pt-20 relative z-10">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turquoise/15 border border-turquoise/30 mb-8 animate-fade-in-up shadow-md">
            <Globe className="h-4 w-4 text-turquoise" />
            <span className="text-sm font-semibold text-turquoise">{h.badge}</span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6 animate-fade-in-up" style={{ animationDelay: '0.1s' }}>
            {h.title}
            <span className="text-gradient-primary">{h.titleHighlight}</span>
            {h.titleEnd}
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-10 animate-fade-in-up font-body" style={{ animationDelay: '0.2s' }}>
            {h.subtitle}
          </p>

          {/* Primary 5 CTA buttons */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 animate-fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Link to="/auth" className="relative">
              <Button size="lg" className="w-full text-sm px-4 py-6 bg-turquoise hover:bg-turquoise-light text-primary-foreground shadow-lg gap-2">
                <UserPlus className="h-4 w-4" />
                Ücretsiz Kayıt
              </Button>
              <span className="absolute -bottom-5 left-0 right-0 text-center text-[10px] font-semibold text-turquoise">
                🪪 Diaspora Pasaportu
              </span>
            </Link>
            <Link to="/whatsapp-groups">
              <Button size="lg" variant="outline" className="w-full text-sm px-4 py-6 border-foreground/20 hover:bg-foreground/5 gap-2">
                <MessageCircle className="h-4 w-4 text-emerald-500" />
                WhatsApp
              </Button>
            </Link>
            <Link to="/founders-1000">
              <Button size="lg" variant="outline" className="w-full text-sm px-4 py-6 border-amber-400/40 bg-amber-400/10 hover:bg-amber-400/20 gap-2">
                <Sparkles className="h-4 w-4 text-amber-500" />
                Founding 1000
              </Button>
            </Link>
            <Link to="/blog-contest">
              <Button size="lg" variant="outline" className="w-full text-sm px-4 py-6 border-foreground/20 hover:bg-foreground/5 gap-2">
                <PenSquare className="h-4 w-4 text-gold" />
                Blogger Yarışması
              </Button>
            </Link>
            <Link to="/blog-contest">
              <Button size="lg" variant="outline" className="w-full text-sm px-4 py-6 border-foreground/20 hover:bg-foreground/5 gap-2">
                <Video className="h-4 w-4 text-primary" />
                Vlogger Yarışması
              </Button>
            </Link>
          </div>

          {/* Blog Contest Teaser */}
          <Link to="/blog-contest" className="block mt-8 animate-fade-in-up" style={{ animationDelay: '0.35s' }}>
            <div className="bg-gold/10 border border-gold/30 rounded-2xl p-4 flex items-center gap-4 hover:bg-gold/15 transition-colors cursor-pointer group">
              <div className="bg-gold/20 p-2.5 rounded-full shrink-0">
                <Trophy className="h-6 w-6 text-gold" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm">🏆 Blog Yazısı Yarışması — Büyük Ödül $1.000!</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">En iyi diaspora blog yazısını yaz, ödülü kazan. Son tarih: 31 Aralık 2026</p>
              </div>
              <ArrowRight className="h-5 w-5 text-gold shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          {/* City Ambassador Teaser */}
          <Link to="/city-ambassadors" className="block mt-3 animate-fade-in-up" style={{ animationDelay: '0.38s' }}>
            <div className="bg-turquoise/10 border border-turquoise/30 rounded-2xl p-4 flex items-center gap-4 hover:bg-turquoise/15 transition-colors cursor-pointer group">
              <div className="bg-turquoise/20 p-2.5 rounded-full shrink-0">
                <MapPin className="h-6 w-6 text-turquoise" />
              </div>
              <div className="flex-1 min-w-0">
                <p className="font-bold text-foreground text-sm">🌍 Şehir Elçisi Programı — Berlin, Londra, Dubai, New York...</p>
                <p className="text-xs text-muted-foreground font-body mt-0.5">Şehrindeki Türk diaspora ağını sen kur, gelir elde et.</p>
              </div>
              <ArrowRight className="h-5 w-5 text-turquoise shrink-0 group-hover:translate-x-1 transition-transform" />
            </div>
          </Link>

          <div className="flex items-center gap-8 mt-12 animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="flex items-center gap-2">
              <MapPin className="h-5 w-5 text-turquoise" />
              <span className="text-sm text-muted-foreground font-body">{h.stat1}</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-5 w-5 text-primary" />
              <span className="text-sm text-muted-foreground font-body">{h.stat2}</span>
            </div>
            <div className="flex items-center gap-2">
              <Globe className="h-5 w-5 text-turquoise" />
              <span className="text-sm text-muted-foreground font-body">{h.stat3}</span>
            </div>
          </div>
        </div>
      </div>
      </section>
    </>
  );
};

export default HeroSection;
