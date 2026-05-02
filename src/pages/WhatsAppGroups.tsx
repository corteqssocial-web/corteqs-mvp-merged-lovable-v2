import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  MessageSquare, Users, GraduationCap, Heart, PlusCircle, Sparkles, Stethoscope,
  ShieldCheck, Layout, FileText,
  TrendingUp, Rocket, BookOpen, HandHeart,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

import { useToast } from "@/hooks/use-toast";
import { submitLanding, listLandings, type LandingMode, type WhatsAppLanding } from "@/lib/whatsappLandings";
import { useAuth } from "@/contexts/AuthContext";

const categoryMeta = {
  alumni: { icon: GraduationCap, label: "Alumni", color: "text-primary bg-primary/10 border-primary/20" },
  doktor: { icon: Stethoscope, label: "Doktor", color: "text-success bg-success/10 border-success/20" },
  hobi: { icon: Heart, label: "Hobi", color: "text-turquoise bg-turquoise/10 border-turquoise/20" },
  is: { icon: Users, label: "İş", color: "text-gold bg-gold/10 border-gold/20" },
  yatirim: { icon: TrendingUp, label: "Yatırım", color: "text-emerald-600 bg-emerald-500/10 border-emerald-500/20" },
  girisim: { icon: Rocket, label: "Girişim", color: "text-orange-600 bg-orange-500/10 border-orange-500/20" },
  akademik: { icon: BookOpen, label: "Akademik", color: "text-indigo-600 bg-indigo-500/10 border-indigo-500/20" },
  dayanisma: { icon: HandHeart, label: "Dayanışma", color: "text-rose-600 bg-rose-500/10 border-rose-500/20" },
} as const;

const WhatsAppGroups = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);

  // 4 örnek demo grup: 2 Alumni (farklı şehir), 1 Doktor, 1 Hobi
  const demoIds = ["odtu-almanya", "bogazici-bae", "doktor-londra", "kitap-dubai"];
  const demoGroups = demoIds
    .map((id) => whatsappGroups.find((g) => g.id === id))
    .filter(Boolean) as typeof whatsappGroups;

  // ---- Post Group + Landing Page form state ----
  const [groupName, setGroupName] = useState("");
  const [category, setCategory] = useState<keyof typeof categoryMeta>("alumni");
  const [country, setCountry] = useState("");
  const [city, setCity] = useState("");
  const [whatsappLink, setWhatsappLink] = useState("");
  const [description, setDescription] = useState("");

  const [createLanding, setCreateLanding] = useState(true);
  const [mode, setMode] = useState<LandingMode>("visual");
  const [heroImage, setHeroImage] = useState("");
  const [tagline, setTagline] = useState("");
  const [callToActionText, setCallToActionText] = useState("");
  const [conditions, setConditions] = useState("");
  const [adminName, setAdminName] = useState("");
  const [adminContact, setAdminContact] = useState("");

  const [openDialog, setOpenDialog] = useState(false);

  const resetForm = () => {
    setGroupName(""); setCountry(""); setCity(""); setWhatsappLink(""); setDescription("");
    setHeroImage(""); setTagline(""); setCallToActionText(""); setConditions("");
    setAdminName(""); setAdminContact(""); setMode("visual"); setCreateLanding(true);
  };

  const handleSubmit = async () => {
    if (!groupName || !country || !city || !whatsappLink) {
      toast({ title: "Eksik alan", description: "Grup adı, ülke, şehir ve WhatsApp linki zorunludur.", variant: "destructive" });
      return;
    }
    if (!user) {
      toast({ title: "Giriş gerekli", description: "Grup eklemek için önce giriş yap.", variant: "destructive" });
      navigate("/auth");
      return;
    }

    setSubmitting(true);
    try {
      await submitLanding({
        groupName,
        category,
        country,
        city,
        mode,
        heroImage: mode === "visual" ? heroImage : undefined,
        tagline: tagline || description.slice(0, 100),
        callToActionText: callToActionText || description,
        conditions,
        whatsappLink,
        adminName,
        adminContact,
        description,
      });
      toast({
        title: "Başvurun alındı! 🎉",
        description: createLanding
          ? "Landing sayfan admin onayından sonra herkese görünür olacak."
          : "Grubun admin onayından sonra listede yayınlanacak.",
      });
      setOpenDialog(false);
      resetForm();
    } catch (e: unknown) {
      const msg = e instanceof Error ? e.message : "Bilinmeyen hata";
      toast({ title: "Gönderilemedi", description: msg, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-16">
        <div className="container mx-auto px-4">

          {/* Hero */}
          <section className="relative overflow-hidden rounded-3xl border border-border bg-gradient-to-br from-[#25D366]/10 via-turquoise/5 to-primary/10 p-6 md:p-10 mb-8 text-center">
            <Badge className="mb-4 bg-[#25D366]/15 text-[#25D366] border-0">
              <MessageSquare className="h-3 w-3 mr-1" /> WhatsApp Diaspora Ağı
            </Badge>
            <h1 className="text-3xl md:text-5xl font-extrabold leading-tight mb-3">
              Diasporanın WhatsApp Gruplarını <span className="text-gradient-primary">Tek Çatı Altında</span> Bul
            </h1>
            <p className="text-base md:text-lg text-muted-foreground font-body max-w-3xl mx-auto mb-2">
              Alumni, doktor, hobi ve iş gruplarına saniyeler içinde katıl — ya da kendi grubun için ücretsiz bir landing sayfası yayınla.
            </p>
            <Badge className="bg-success/15 text-success border-0 text-sm px-3 py-1 mt-2">
              <ShieldCheck className="h-3.5 w-3.5 mr-1.5" /> Grup listeleme ve landing page tamamen ücretsiz
            </Badge>
          </section>

          {/* Banner: Listing + Landing CTA */}
          <div className="rounded-2xl border border-turquoise/30 bg-gradient-to-br from-turquoise/5 via-card to-orange-50/40 p-5 md:p-6 mb-8">
            <div className="flex items-start gap-3 mb-4">
              <Sparkles className="h-5 w-5 text-turquoise shrink-0 mt-1" />
              <div>
                <h2 className="text-lg md:text-xl font-bold">WhatsApp Gruplarımıza başvurularımız devam etmektedir</h2>
                <p className="text-sm text-muted-foreground mt-1">
                  Aşağıda gördüğün kartlar örnek (DEMO) gruplardır. Sen de grubunu hem listele hem de istersen profesyonel bir landing sayfasıyla paylaş.
                </p>
              </div>
            </div>
            <Dialog open={openDialog} onOpenChange={setOpenDialog}>
              <DialogTrigger asChild>
                <Button size="lg" className="w-full sm:w-auto gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white">
                  <PlusCircle className="h-4 w-4" /> Grubunu Listele + Landing Page Oluştur
                </Button>
              </DialogTrigger>
              <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                  <DialogTitle>Grubunu Paylaş</DialogTitle>
                </DialogHeader>

                <div className="space-y-5 mt-4">
                  {/* Step 1 — Grup bilgisi */}
                  <div className="space-y-3">
                    <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">1. Grup Bilgileri</h3>
                    <div>
                      <Label>Grup Adı *</Label>
                      <Input value={groupName} onChange={(e) => setGroupName(e.target.value)} placeholder="Örn: Berlin Türk Girişimciler" />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Kategori *</Label>
                        <Select value={category} onValueChange={(v) => setCategory(v as keyof typeof categoryMeta)}>
                          <SelectTrigger><SelectValue /></SelectTrigger>
                          <SelectContent>
                            <SelectItem value="alumni">Alumni</SelectItem>
                            <SelectItem value="doktor">Doktor / Sağlık</SelectItem>
                            <SelectItem value="hobi">Hobi</SelectItem>
                            <SelectItem value="is">İş Grubu</SelectItem>
                            <SelectItem value="yatirim">Yatırım</SelectItem>
                            <SelectItem value="girisim">Girişim</SelectItem>
                            <SelectItem value="akademik">Akademik</SelectItem>
                            <SelectItem value="dayanisma">Dayanışma</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <Label>WhatsApp Linki *</Label>
                        <Input value={whatsappLink} onChange={(e) => setWhatsappLink(e.target.value)} placeholder="https://chat.whatsapp.com/..." />
                      </div>
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label>Ülke *</Label>
                        <Input value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Almanya" />
                      </div>
                      <div>
                        <Label>Şehir *</Label>
                        <Input value={city} onChange={(e) => setCity(e.target.value)} placeholder="Berlin" />
                      </div>
                    </div>
                    <div>
                      <Label>Kısa Açıklama</Label>
                      <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Grup hakkında 1-2 cümle" rows={2} />
                    </div>
                  </div>

                  {/* Step 2 — Landing page opsiyonu */}
                  <div className="rounded-xl border border-border p-4 bg-muted/30">
                    <label className="flex items-start gap-3 cursor-pointer">
                      <Checkbox checked={createLanding} onCheckedChange={(v) => setCreateLanding(!!v)} className="mt-0.5" />
                      <div>
                        <p className="font-semibold text-sm">Profesyonel landing sayfası da oluştur</p>
                        <p className="text-xs text-muted-foreground">
                          Linkini paylaştığında insanlar önce çağrını ve grup koşullarını görsün, sonra katılsın.
                        </p>
                      </div>
                    </label>

                    {createLanding && (
                      <div className="mt-5 space-y-4">
                        <div>
                          <Label className="mb-2 block">Landing Stili</Label>
                          <RadioGroup value={mode} onValueChange={(v) => setMode(v as LandingMode)} className="grid grid-cols-2 gap-3">
                            <label className={`rounded-lg border p-3 cursor-pointer flex items-start gap-2 ${mode === "visual" ? "border-primary bg-primary/5" : "border-border"}`}>
                              <RadioGroupItem value="visual" className="mt-0.5" />
                              <div>
                                <div className="flex items-center gap-1.5 font-semibold text-sm"><Layout className="h-3.5 w-3.5" /> Görsel + CTA</div>
                                <p className="text-xs text-muted-foreground">Hero görseli ve büyük CTA butonu ile.</p>
                              </div>
                            </label>
                            <label className={`rounded-lg border p-3 cursor-pointer flex items-start gap-2 ${mode === "text" ? "border-primary bg-primary/5" : "border-border"}`}>
                              <RadioGroupItem value="text" className="mt-0.5" />
                              <div>
                                <div className="flex items-center gap-1.5 font-semibold text-sm"><FileText className="h-3.5 w-3.5" /> Sade Yazı</div>
                                <p className="text-xs text-muted-foreground">Sadece çağrı yazısı + grup koşulları.</p>
                              </div>
                            </label>
                          </RadioGroup>
                        </div>

                        {mode === "visual" && (
                          <div>
                            <Label>Hero Görsel URL</Label>
                            <Input value={heroImage} onChange={(e) => setHeroImage(e.target.value)} placeholder="https://..." />
                            <p className="text-[11px] text-muted-foreground mt-1">Boş bırakırsan gradient arka plan kullanılır.</p>
                          </div>
                        )}

                        <div>
                          <Label>Tagline (kısa pitch)</Label>
                          <Input value={tagline} onChange={(e) => setTagline(e.target.value)} placeholder="Tek cümlede grubunu anlat" />
                        </div>

                        <div>
                          <Label>Çağrı Metni</Label>
                          <Textarea value={callToActionText} onChange={(e) => setCallToActionText(e.target.value)} placeholder="Topluluğa neden katılmalı? Ne sunuyorsun?" rows={4} />
                        </div>

                        <div>
                          <Label>Grup Koşulları (her satıra bir madde)</Label>
                          <Textarea value={conditions} onChange={(e) => setConditions(e.target.value)} placeholder={"Sadece mezunlar\nReklam yasak\n..."} rows={4} />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label>Yönetici Adı</Label>
                            <Input value={adminName} onChange={(e) => setAdminName(e.target.value)} placeholder="Adın" />
                          </div>
                          <div>
                            <Label>Yönetici İletişim</Label>
                            <Input value={adminContact} onChange={(e) => setAdminContact(e.target.value)} placeholder="E-posta veya telefon" />
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="rounded-lg bg-amber-50 border border-amber-200 p-3 text-xs text-amber-900">
                    🛡️ Başvurun admin onayından sonra herkese görünür olacak. (Spam ve sahte grupları önlemek için.)
                  </div>

                  <Button
                    className="w-full gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white"
                    onClick={handleSubmit}
                    disabled={submitting}
                  >
                    <MessageSquare className="h-4 w-4" />
                    {submitting ? "Gönderiliyor..." : (createLanding ? "Landing Sayfası Oluştur ve Onaya Gönder" : "Grubu Onaya Gönder")}
                  </Button>
                </div>
              </DialogContent>
            </Dialog>
          </div>

          {/* Blurred placeholder row — "Grubunuzu ekleyin" */}
          <div className="relative mb-12 max-w-5xl mx-auto">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 select-none pointer-events-none blur-sm opacity-70">
              {(["alumni", "doktor", "hobi"] as const).map((cat) => {
                const meta = categoryMeta[cat];
                const Icon = meta.icon;
                return (
                  <div key={cat} className="bg-card rounded-2xl border border-border p-5 shadow-card flex flex-col">
                    <div className={`w-11 h-11 rounded-xl border ${meta.color} flex items-center justify-center mb-3`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-foreground mb-1">{meta.label} Grubu</h3>
                    <p className="text-xs text-muted-foreground mb-2">📍 Şehir, Ülke</p>
                    <p className="text-sm text-muted-foreground mb-3">Grup açıklaması burada yer alacak.</p>
                    <Button size="sm" className="w-full bg-[#25D366] text-white">Katıl</Button>
                  </div>
                );
              })}
            </div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="bg-card/95 backdrop-blur border-2 border-dashed border-[#25D366]/50 rounded-2xl px-6 py-5 text-center shadow-lg max-w-md">
                <PlusCircle className="h-8 w-8 text-[#25D366] mx-auto mb-2" />
                <h3 className="font-bold text-lg mb-1">Grubunuzu ekleyin</h3>
                <p className="text-sm text-muted-foreground mb-3">Alumni, Doktor, Hobi ve daha fazlası — kendi grubunu ücretsiz listele.</p>
                <Button size="sm" className="gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white" onClick={() => setOpenDialog(true)}>
                  <PlusCircle className="h-4 w-4" /> Grubunu Listele
                </Button>
              </div>
            </div>
          </div>

          {/* Why a landing page — value props */}
          <section className="mb-12">
            <h2 className="text-xl md:text-2xl font-extrabold mb-1 text-center">
              Neden <span className="text-gradient-primary">Landing Sayfası</span>?
            </h2>
            <p className="text-sm text-muted-foreground font-body mb-5 max-w-2xl mx-auto text-center">
              WhatsApp linkini ham paylaşmak yerine bir karşılama sayfasından geçir; doğru üyeyi çek, koşulları net göster.
            </p>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 max-w-5xl mx-auto">
              {[
                { icon: Globe2, title: "Sosyal medyada paylaş", desc: "Tek link, profesyonel ön izleme.", color: "text-turquoise bg-turquoise/10 border-turquoise/20" },
                { icon: ShieldCheck, title: "Koşullarını göster", desc: "Üyelik kuralları baştan net.", color: "text-success bg-success/10 border-success/20" },
                { icon: Megaphone, title: "Doğru üye çek", desc: "Spam ve alakasız katılımı azalt.", color: "text-gold bg-gold/10 border-gold/20" },
                { icon: Layout, title: "İki stil seç", desc: "Görsel + CTA veya sade yazı.", color: "text-primary bg-primary/10 border-primary/20" },
              ].map((f) => (
                <div key={f.title} className="rounded-xl border border-border bg-card p-3">
                  <div className={`w-7 h-7 rounded-md flex items-center justify-center mb-2 border ${f.color}`}>
                    <f.icon className="h-3.5 w-3.5" />
                  </div>
                  <h3 className="font-semibold text-xs mb-0.5 leading-tight">{f.title}</h3>
                  <p className="text-[11px] text-muted-foreground font-body leading-snug">{f.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Bottom CTA */}
          <section className="rounded-3xl bg-gradient-to-r from-[#25D366]/15 via-turquoise/10 to-primary/15 border border-border p-6 md:p-10 text-center">
            <h3 className="text-2xl md:text-3xl font-extrabold mb-2">
              Grubunu Hemen Yayınla
            </h3>
            <p className="text-muted-foreground font-body mb-5 max-w-2xl mx-auto">
              Listeleme + landing sayfası tamamen ücretsiz. Bir dakikada hazır.
            </p>
            <Button size="lg" className="gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white" onClick={() => setOpenDialog(true)}>
              <PlusCircle className="h-5 w-5" /> Grubunu Listele
              <ArrowRight className="h-4 w-4" />
            </Button>
          </section>

          {/* All groups — collapsed list under tabs (kept for completeness) */}
          <section className="mt-12">
            <h2 className="text-lg font-bold mb-4">Tüm Gruplar</h2>
            <Tabs defaultValue="alumni">
              <TabsList className="bg-card border border-border w-full justify-start h-auto gap-1 p-1 mb-4 flex-wrap">
                {(Object.keys(categoryMeta) as Array<keyof typeof categoryMeta>).map((cat) => {
                  const M = categoryMeta[cat];
                  const count = whatsappGroups.filter((g) => g.category === cat).length;
                  return (
                    <TabsTrigger key={cat} value={cat} className="gap-1.5">
                      <M.icon className="h-4 w-4" /> {M.label} ({count})
                    </TabsTrigger>
                  );
                })}
              </TabsList>
              {(Object.keys(categoryMeta) as Array<keyof typeof categoryMeta>).map((cat) => (
                <TabsContent key={cat} value={cat}>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                    {whatsappGroups.filter((g) => g.category === cat).map((g) => (
                      <div key={g.id} className="rounded-xl border border-border bg-card p-4">
                        <h4 className="font-semibold text-sm mb-1">{g.name}</h4>
                        <p className="text-xs text-muted-foreground mb-2">📍 {g.city}, {g.country} · {g.members} üye</p>
                        <p className="text-xs text-muted-foreground font-body mb-3 line-clamp-2">{g.description}</p>
                        <div className="flex gap-2">
                          {g.landingId ? (
                            <Link to={`/whatsapp-groups/${g.landingId}`} className="flex-1">
                              <Button size="sm" variant="outline" className="w-full gap-1 text-xs">
                                <Layout className="h-3 w-3" /> Landing
                              </Button>
                            </Link>
                          ) : null}
                          <a href={g.link} target="_blank" rel="noopener noreferrer" className="flex-1">
                            <Button size="sm" className="w-full gap-1 text-xs bg-[#25D366] hover:bg-[#20bd5a] text-white">
                              <MessageSquare className="h-3 w-3" /> Katıl
                            </Button>
                          </a>
                        </div>
                      </div>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          </section>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default WhatsAppGroups;
