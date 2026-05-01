import { Link } from "react-router-dom";
import {
  Star, PenLine, Video, Instagram, Users, Handshake, Eye,
  Megaphone, Globe2, Bot, Phone, Briefcase, Database, Sparkles
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import DemoBadge from "@/components/DemoBadge";
import CategoryListingBanner from "@/components/CategoryListingBanner";
import InterestForm from "@/components/InterestForm";
import { bloggers } from "@/data/mock";

const Bloggers = () => {
  const demoBloggers = bloggers.slice(0, 2);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">

          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-primary/10 via-turquoise/5 to-gold/10 p-6 md:p-10 mb-10">
            <Badge className="mb-4 bg-turquoise/15 text-turquoise border-0">🎬 Blogger & Vlogger Programı</Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">
              Hayran Kitleni <span className="text-gradient-primary">Globale Aç</span>, Etkini Para'ya Çevir
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body max-w-3xl">
              CorteQS Diaspora ekosisteminde sponsor & marka talepleri, AI Clone, canlı görüşme ve BOS ile içerik üreticiliğini profesyonel bir işe dönüştür.
            </p>
          </section>

          {/* Listing Banner */}
          <CategoryListingBanner categoryLabel="Blogger / Vlogger" formAnchorId="kayit-form" />

          <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
            <Sparkles className="h-5 w-5 text-turquoise" /> Demo İçerik Üreticiler
          </h2>

          {/* 2 Demo Blogger Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-12 max-w-4xl">
            {demoBloggers.map((b) => (
              <Link
                to={`/blogger/${b.id}`}
                key={b.id}
                className="group relative bg-card rounded-2xl p-6 shadow-card hover:shadow-card-hover transition-all duration-300 hover:-translate-y-1 border border-border block"
              >
                <DemoBadge />
                <div className="flex items-center gap-3 mb-4">
                  <img src={b.photo} alt={b.name} className="w-14 h-14 rounded-full object-cover shrink-0" />
                  <div className="min-w-0">
                    <h3 className="font-bold text-foreground truncate">{b.name}</h3>
                    <Badge variant={b.type === "influencer" ? "default" : "secondary"} className="text-[10px] mt-0.5">
                      {b.type === "influencer" ? "Vlogger" : "Blogger"}
                    </Badge>
                  </div>
                </div>

                <p className="text-sm text-muted-foreground font-body mb-2">📍 {b.city}, {b.country}</p>
                <p className="text-sm text-muted-foreground font-body mb-3">🌍 {b.region}</p>

                <div className="flex items-center gap-3 mb-3 text-sm">
                  <div className="flex items-center gap-1">
                    <Star className="h-3.5 w-3.5 text-gold fill-gold" />
                    <span className="font-semibold">{b.rating}</span>
                  </div>
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Users className="h-3.5 w-3.5" />
                    <span>{(b.followers / 1000).toFixed(0)}K</span>
                  </div>
                </div>

                <div className="flex flex-wrap gap-1 mb-4">
                  {b.specialties.slice(0, 2).map((s) => (
                    <span key={s} className="text-xs bg-primary/10 text-primary rounded-full px-2 py-0.5">{s}</span>
                  ))}
                </div>

                {b.adCollaboration && (
                  <div className="flex items-center gap-1.5 bg-gold/10 text-gold rounded-lg px-3 py-1.5 mb-4 text-xs font-semibold">
                    <Handshake className="h-3.5 w-3.5" />
                    Reklam İşbirliği Açık
                  </div>
                )}

                <div className="flex items-center gap-3 text-xs text-muted-foreground mb-4">
                  {b.blogPosts.length > 0 && (
                    <span className="flex items-center gap-1">
                      <PenLine className="h-3 w-3" /> {b.blogPosts.length} Blog
                    </span>
                  )}
                  {b.vlogs.length > 0 && (
                    <span className="flex items-center gap-1">
                      <Video className="h-3 w-3" /> {b.vlogs.length} Vlog
                    </span>
                  )}
                  {b.instagram && (
                    <span className="flex items-center gap-1">
                      <Instagram className="h-3 w-3" /> {b.instagram}
                    </span>
                  )}
                </div>

                <Button variant="default" size="sm" className="w-full gap-1 text-xs">
                  <Eye className="h-3 w-3" /> Profili Gör
                </Button>
              </Link>
            ))}
          </div>

          {/* Value Proposition Grid */}
          <section className="mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold mb-2">
              CorteQS Blogger & Vlogger <span className="text-gradient-primary">Avantajları</span>
            </h2>
            <p className="text-muted-foreground font-body mb-6 max-w-3xl">
              Sadece bir yayıncı değil, global bir topluluk lideri ol.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {[
                {
                  icon: Megaphone,
                  title: "Sponsor & Marka Talepleri",
                  desc: "Sponsorlardan ve markalardan gelen reklam ve iş birliği taleplerini tek panelden topla, fiyatlandır ve yönet.",
                  color: "text-gold bg-gold/10 border-gold/20",
                },
                {
                  icon: Globe2,
                  title: "Globale Açılan Görünürlük",
                  desc: "Görünürlüğünü diaspora ağı üzerinden katla; ülke, şehir ve konu bazlı keşfedilebilir ol.",
                  color: "text-turquoise bg-turquoise/10 border-turquoise/20",
                },
                {
                  icon: Users,
                  title: "Topluluk Liderleri Toplantıları",
                  desc: "CorteQS Topluluk Liderleri buluşmalarında diğer yöneticilerle bağ kur, ortak etkinlikler düzenle.",
                  color: "text-primary bg-primary/10 border-primary/20",
                },
                {
                  icon: Bot,
                  title: "AI Clone — 7/24 Etkileşim",
                  desc: "AI Clone'un hayran kitlenle sürekli temasta kalsın. Sen uyurken bile sorulara cevap versin.",
                  color: "text-purple-600 bg-purple-500/10 border-purple-500/20",
                },
                {
                  icon: Phone,
                  title: "Ücretli Canlı & Clone Görüşmeleri",
                  desc: "Canlı veya AI Clone üzerinden 1:1 görüşmelerini dakika bazlı ücretlendir, otomatik tahsilat.",
                  color: "text-success bg-success/10 border-success/20",
                },
                {
                  icon: Briefcase,
                  title: "BOS — Business Operating System",
                  desc: "Sözleşme, fatura, takvim, bilet ve gelir; tüm iş süreçlerini tek bir dijital BOS ile yönet.",
                  color: "text-pink-600 bg-pink-500/10 border-pink-500/20",
                },
                {
                  icon: Database,
                  title: "CorteQS Data Evrenine Erişim",
                  desc: "Diaspora trend raporları, kitle insights ve içerik fırsat verilerine doğrudan erişim sağla.",
                  color: "text-orange-600 bg-orange-500/10 border-orange-500/20",
                },
                {
                  icon: Handshake,
                  title: "Ortak Etkinlik & Cross-Promo",
                  desc: "Diğer içerik üreticileri ile cross-promotion ve ortak etkinliklerle topluluğunu hayallerin ötesinde büyüt.",
                  color: "text-blue-600 bg-blue-500/10 border-blue-500/20",
                },
              ].map((f) => (
                <div
                  key={f.title}
                  className="rounded-2xl border border-border bg-card p-5 hover:shadow-card-hover transition-all"
                >
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center mb-3 border ${f.color}`}>
                    <f.icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold mb-1">{f.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* CTA strip */}
          <section className="rounded-3xl bg-gradient-to-r from-primary/15 via-turquoise/10 to-gold/15 border border-border p-6 md:p-10 mb-12 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
              Topluluğunu Hayallerin Ötesinde Büyüt
            </h3>
            <p className="text-muted-foreground font-body mb-6 max-w-2xl mx-auto">
              Tagline: "Sunum / CV / One-Pager vb. tüm dökümanlarını yükleyebilirsin." Aşağıdaki formdan başvur, CorteQS ekibi seninle iletişime geçsin.
            </p>
            <a href="#kayit-form">
              <Button size="lg" className="gap-2">
                <Sparkles className="h-4 w-4" /> Hemen Başvur
              </Button>
            </a>
          </section>

          {/* Inline Form */}
          <div className="mt-10 max-w-2xl mx-auto" id="kayit-form">
            <InterestForm
              modal={false}
              context="genel"
              defaultCategory="blogger"
              title="Blogger / Vlogger Olarak Kayıt Ol"
              description="Sunum / CV / One-Pager / kanal istatistikleri vb. tüm dökümanlarını yükleyebilirsin. İstersen kategoriyi değiştirebilirsin."
              source="bloggers-listing"
            />
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Bloggers;
