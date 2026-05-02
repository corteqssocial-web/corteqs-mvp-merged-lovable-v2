import { useState } from "react";
import { Trophy, Video, Calendar, BarChart3, Heart, CheckCircle2, ArrowRight, Star, Clock, Award, Film } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import vloggerHero from "@/assets/vlogger-contest-hero.jpg";
import mascot from "@/assets/corteqs-mascot.png";

const contestRules = [
  "Yarışmaya tüm CorteQS platformuna kayıtlı vloggerlar katılabilir.",
  "Videolar Türkçe veya İngilizce (altyazılı) olabilir.",
  "Videolar ülke, şehir, kültür, gusto veya diaspora hikâyeleri temalı olmalıdır.",
  "Her katılımcı en fazla 5 video ile yarışmaya katılabilir.",
  "Videolar 1 Ocak 2026 - 15 Aralık 2026 tarihleri arasında yayınlanmış olmalıdır.",
  "Telif hakkı ihlali toleransı sıfırdır. Orijinal içerik zorunludur.",
  "Sonuçlar 31 Aralık 2026'da izlenme + etkileşim performansına göre açıklanacaktır.",
];

const prizes = [
  { place: "1.", prize: "$1.000", icon: Trophy, color: "text-gold" },
  { place: "2.", prize: "$500", icon: Award, color: "text-muted-foreground" },
  { place: "3.", prize: "$250", icon: Star, color: "text-primary" },
];

const VloggerContest = () => {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    channelUrl: "",
    country: "",
    city: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast({
      title: "Başvuru Alındı! 🎬",
      description: "Vlogger yarışmasına başvurunuz başarıyla alındı. Detaylar e-posta ile gönderilecektir.",
    });
    setFormData({ name: "", email: "", channelUrl: "", country: "", city: "" });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        {/* Hero */}
        <section className="relative overflow-hidden py-16 md:py-24">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-turquoise/5 to-gold/10" />
          <div className="absolute top-10 right-20 w-80 h-80 bg-primary/15 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-turquoise/10 rounded-full blur-3xl" />

          <div className="container mx-auto px-4 relative z-10">
            <div className="grid lg:grid-cols-2 gap-10 items-center">
              <div>
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/15 border border-primary/30 mb-6">
                  <Video className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">2026 Vlogger Yarışması</span>
                </div>

                <h1 className="text-4xl md:text-6xl font-extrabold text-foreground leading-tight mb-6">
                  En İyi Diaspora<br />
                  <span className="text-gradient-primary">Vlog & Video Yarışması</span>
                </h1>

                <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mb-8 font-body">
                  Hikâyeni ya da Global Türklerin hikâyesini video ile anlat. Dünyaya duyur,
                  <span className="text-gold font-bold"> $1.000 büyük ödülü</span> kazan!
                </p>

                <div className="flex flex-wrap gap-4 mb-8">
                  {prizes.map((p) => (
                    <div key={p.place} className="bg-card border border-border rounded-2xl p-4 shadow-card min-w-[120px]">
                      <p.icon className={`h-7 w-7 mb-1.5 ${p.color}`} />
                      <p className="text-xl font-bold text-foreground">{p.prize}</p>
                      <p className="text-xs text-muted-foreground">{p.place} Ödül</p>
                    </div>
                  ))}
                </div>

                <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                  <span className="flex items-center gap-1.5"><Calendar className="h-4 w-4 text-primary" /> Son Tarih: 31 Aralık 2026</span>
                  <span className="flex items-center gap-1.5"><BarChart3 className="h-4 w-4 text-turquoise" /> İzlenme + Etkileşim Bazlı</span>
                  <span className="flex items-center gap-1.5"><Film className="h-4 w-4 text-gold" /> Orijinal Video</span>
                </div>
              </div>

              <div className="relative">
                <img
                  src={vloggerHero}
                  alt="Diaspora vlogger filming stories"
                  width={1280}
                  height={960}
                  className="rounded-3xl shadow-2xl w-full object-cover"
                />
                <img
                  src={mascot}
                  alt="CorteQS mascot"
                  loading="lazy"
                  className="absolute -bottom-6 -left-6 w-20 h-20 md:w-24 md:h-24 drop-shadow-xl"
                />
              </div>
            </div>
          </div>
        </section>

        {/* How it works */}
        <section className="py-16 bg-card border-y border-border">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-foreground text-center mb-12">Nasıl Çalışır?</h2>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Kayıt Ol", desc: "CorteQS'e vlogger olarak kayıt olun ve yarışma başvurusunu yapın.", icon: Video },
                { step: "2", title: "Video Çek", desc: "Diaspora yaşamı, kültür, gusto veya şehir rehberi temalı videolarınızı paylaşın.", icon: Film },
                { step: "3", title: "Paylaş & Etkileşim", desc: "Videolarınızı paylaşın, izleyici kitlenizi büyütün ve beğeni toplayın.", icon: Heart },
                { step: "4", title: "Kazan!", desc: "31 Aralık'ta en iyi izlenme + etkileşim performansını gösteren video 1. olacak.", icon: Trophy },
              ].map((item) => (
                <div key={item.step} className="text-center">
                  <div className="w-16 h-16 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <item.icon className="h-7 w-7 text-primary" />
                  </div>
                  <div className="inline-flex items-center justify-center w-8 h-8 rounded-full bg-primary text-primary-foreground text-sm font-bold mb-3">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Rules & Application */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Rules */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Katılım Şartları</h2>
                <div className="space-y-4">
                  {contestRules.map((rule, i) => (
                    <div key={i} className="flex items-start gap-3 p-4 bg-card rounded-xl border border-border">
                      <CheckCircle2 className="h-5 w-5 text-primary shrink-0 mt-0.5" />
                      <p className="text-muted-foreground font-body">{rule}</p>
                    </div>
                  ))}
                </div>

                <div className="mt-8 bg-primary/10 border border-primary/20 rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-3 flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-primary" /> Değerlendirme Kriterleri
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground font-body">
                    <p>• <strong>İzlenme Performansı (50%)</strong>: Toplam izlenme, izleme süresi, paylaşım sayısı</p>
                    <p>• <strong>Etkileşim Performansı (30%)</strong>: Beğeni, yorum ve etkileşim oranı</p>
                    <p>• <strong>İçerik Kalitesi (20%)</strong>: Jüri değerlendirmesi, orijinallik, prodüksiyon ve anlatım gücü</p>
                  </div>
                </div>

                <div className="mt-6 bg-muted/50 border border-border rounded-2xl p-6">
                  <h3 className="font-bold text-foreground mb-2 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-primary" /> Önemli Tarihler
                  </h3>
                  <div className="space-y-2 text-sm text-muted-foreground font-body">
                    <p>📅 Başvuru Başlangıcı: <strong>1 Ocak 2026</strong></p>
                    <p>📅 Son Video Yayınlama: <strong>15 Aralık 2026</strong></p>
                    <p>🏆 Sonuç Açıklaması: <strong>31 Aralık 2026</strong></p>
                  </div>
                </div>
              </div>

              {/* Application Form */}
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-8">Başvuru Formu</h2>
                <form onSubmit={handleSubmit} className="bg-card border border-border rounded-2xl p-6 shadow-card space-y-5">
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Ad Soyad</label>
                    <Input
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Adınız ve soyadınız"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">E-posta</label>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="email@example.com"
                      required
                    />
                  </div>
                  <div>
                    <label className="text-sm font-semibold text-foreground mb-1.5 block">Kanal / Video URL (YouTube, Instagram, TikTok)</label>
                    <Input
                      type="url"
                      value={formData.channelUrl}
                      onChange={(e) => setFormData({ ...formData, channelUrl: e.target.value })}
                      placeholder="https://youtube.com/@kanalim"
                      required
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Ülke</label>
                      <Input
                        value={formData.country}
                        onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                        placeholder="Almanya"
                        required
                      />
                    </div>
                    <div>
                      <label className="text-sm font-semibold text-foreground mb-1.5 block">Şehir</label>
                      <Input
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                        placeholder="Berlin"
                        required
                      />
                    </div>
                  </div>

                  <div className="bg-muted/50 rounded-xl p-4 text-sm text-muted-foreground">
                    <p className="font-semibold text-foreground mb-1">📋 Başvuru ile kabul edilen şartlar:</p>
                    <p>• Yarışma kurallarını okudum ve kabul ediyorum</p>
                    <p>• Videolarımın CorteQS platformunda paylaşılmasını onaylıyorum</p>
                    <p>• İçeriklerimin orijinal olduğunu beyan ederim</p>
                  </div>

                  <Button type="submit" size="lg" className="w-full gap-2 text-base">
                    Yarışmaya Başvur <ArrowRight className="h-5 w-5" />
                  </Button>
                </form>

                <div className="mt-6 bg-turquoise/10 border border-turquoise/20 rounded-2xl p-6 text-center">
                  <p className="text-sm text-muted-foreground font-body mb-2">
                    Zaten bir kanalınız var mı? Videolarınızı CorteQS'te öne çıkarın!
                  </p>
                  <Button variant="outline" className="gap-2">
                    <Video className="h-4 w-4" /> Video İçe Aktarma
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default VloggerContest;
