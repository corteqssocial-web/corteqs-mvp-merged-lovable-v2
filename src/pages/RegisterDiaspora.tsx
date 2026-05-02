import { useState } from "react";
import { Link } from "react-router-dom";
import {
  Globe, Sparkles, Users, Briefcase, Building2, MapPin, MessageCircle,
  Calendar, Newspaper, Home, Plane, Scale, TrendingUp, Heart, GraduationCap,
  Rocket, CheckCircle2, Loader2, Upload, X, Languages,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

/**
 * EN landing — "Register Diaspora" — mirrors the Turkish hero structure
 * for any community. All category buttons are display-only (no navigation).
 * Submissions are written to interest_registrations with
 *   source = "register_diaspora_<community>"
 * so admin can sort applications by diaspora.
 */

const ENGLISH_CATEGORIES = [
  { icon: Home, title: "Real Estate Consultants", desc: "Property & investment abroad" },
  { icon: Plane, title: "Visa & Immigration", desc: "Residency, citizenship, golden visa" },
  { icon: Briefcase, title: "Company Setup & Business", desc: "Free zone / mainland incorporation" },
  { icon: Scale, title: "Legal & Tax", desc: "Cross-border legal and tax planning" },
  { icon: TrendingUp, title: "Financial Advisors", desc: "Investment & wealth planning" },
  { icon: Heart, title: "Healthcare", desc: "Doctors, hospitals, insurance" },
  { icon: GraduationCap, title: "Education & Schools", desc: "Schools, universities, scholarships" },
  { icon: Building2, title: "Diaspora Organizations", desc: "Associations, foundations, schools, media" },
  { icon: Users, title: "Diaspora Businesses", desc: "Restaurants, markets, services" },
  { icon: MapPin, title: "City Ambassadors", desc: "Build your city's diaspora network" },
  { icon: MessageCircle, title: "WhatsApp Groups", desc: "Alumni, hobby, professional, doctors" },
  { icon: Calendar, title: "Events", desc: "Networking, culture, sports, business" },
  { icon: Newspaper, title: "Bloggers / Vloggers", desc: "Content creators of the diaspora" },
];

const RegisterDiaspora = () => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    diaspora_community: "",
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    organization: "",
    role: "general",
    links: "",
    message: "",
  });

  const handleFiles = (e: React.ChangeEvent<HTMLInputElement>) => {
    const list = Array.from(e.target.files || []);
    if (files.length + list.length > 5) {
      toast({ title: "Max 5 files", variant: "destructive" });
      return;
    }
    const big = list.find((f) => f.size > 10 * 1024 * 1024);
    if (big) {
      toast({ title: "File too large", description: `${big.name} > 10MB`, variant: "destructive" });
      return;
    }
    setFiles((p) => [...p, ...list]);
  };

  const upload = async (tag: string) => {
    const urls: string[] = [];
    for (const f of files) {
      const ext = f.name.split(".").pop() || "bin";
      const path = `register_diaspora/${tag}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("interest-uploads").upload(path, f, { contentType: f.type });
      if (error) throw error;
      urls.push(path);
    }
    return urls;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.diaspora_community.trim()) {
      toast({ title: "Diaspora community, name and email are required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const tag = form.diaspora_community
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "_")
        .replace(/(^_|_$)/g, "")
        .slice(0, 40) || "unknown";
      const attachment_urls = await upload(tag);
      const { error } = await supabase.from("interest_registrations").insert({
        category: "register_diaspora",
        role: form.role,
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        organization: form.organization,
        // Tag the desired diaspora community so admin can sort
        interest_area: form.diaspora_community.trim(),
        supply_demand: form.message,
        heard_from: form.links,
        source: `register_diaspora_${tag}`,
        attachment_urls,
        message: form.message,
      });
      if (error) throw error;
      setDone(true);
      toast({ title: "Thank you!", description: "Registration received. We'll be in touch shortly." });
    } catch (err: unknown) {
      toast({
        title: "Something went wrong",
        description: err instanceof Error ? err.message : String(err),
        variant: "destructive",
      });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* HERO — mirrors the Turkish hero, in English */}
      <section className="relative pt-16 min-h-[70vh] flex items-center bg-gradient-hero overflow-hidden">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-10 right-20 w-80 h-80 bg-turquoise/20 rounded-full blur-3xl" />
          <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
        </div>

        <div className="container mx-auto px-4 pt-20 relative z-10">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/30 mb-6 shadow-md">
              <Sparkles className="h-4 w-4 text-amber-500" />
              <span className="text-sm font-semibold text-amber-600">Register Your Diaspora — Pre-launch</span>
            </div>

            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extrabold text-foreground leading-tight mb-6">
              Wherever you go, an{" "}
              <span className="text-gradient-primary">organized diaspora network</span>{" "}
              is waiting for you
            </h1>

            <p className="text-lg md:text-xl text-muted-foreground max-w-xl mb-8 font-body">
              CorteQS is the diaspora infrastructure platform — already live for the Turkish diaspora.
              Tell us which community should be next and we'll bring the same toolkit to your people.
            </p>

            <div className="flex flex-wrap items-center gap-3 mb-8">
              <Button
                size="lg"
                onClick={() => document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth" })}
                className="bg-turquoise hover:bg-turquoise-light text-primary-foreground gap-2"
              >
                <Globe className="h-5 w-5" /> Register Your Diaspora
              </Button>
              <Link to="/">
                <Button size="lg" variant="outline" className="gap-2">
                  <Languages className="h-4 w-4" /> See it live (Turkish diaspora)
                </Button>
              </Link>
            </div>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <span className="flex items-center gap-2"><MapPin className="h-4 w-4 text-turquoise" /> 45+ Countries</span>
              <span className="flex items-center gap-2"><Users className="h-4 w-4 text-primary" /> 500+ Consultants</span>
              <span className="flex items-center gap-2"><Building2 className="h-4 w-4 text-turquoise" /> 200+ Organizations</span>
            </div>
          </div>
        </div>
      </section>

      {/* CATEGORY GRID — display only, no clicks */}
      <section className="py-16 bg-muted/20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h2 className="text-3xl md:text-4xl font-extrabold text-foreground mb-3">
              Everything your diaspora needs, in one platform
            </h2>
            <p className="text-muted-foreground font-body max-w-2xl mx-auto">
              Preview of the modules already built for the Turkish diaspora — these will be available
              in your community's language once registrations reach critical mass.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {ENGLISH_CATEGORIES.map((c) => (
              <div
                key={c.title}
                className="bg-card border border-border rounded-xl p-4 shadow-card opacity-90 cursor-default select-none"
                aria-disabled="true"
              >
                <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center mb-3">
                  <c.icon className="h-5 w-5 text-primary" />
                </div>
                <h3 className="font-bold text-sm text-foreground">{c.title}</h3>
                <p className="text-xs text-muted-foreground mt-1 font-body">{c.desc}</p>
              </div>
            ))}
          </div>

          <div className="mt-10 text-center">
            <p className="text-sm text-muted-foreground mb-4">
              Want to see <strong>your diaspora</strong> here?
            </p>
            <Button
              size="lg"
              onClick={() => document.getElementById("register-form")?.scrollIntoView({ behavior: "smooth" })}
              className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
            >
              <Sparkles className="h-5 w-5" /> Fill the registration form
            </Button>
          </div>
        </div>
      </section>

      {/* REGISTRATION FORM */}
      <section id="register-form" className="py-16">
        <div className="container mx-auto px-4 max-w-2xl">
          <div className="rounded-2xl border border-border bg-card p-6 sm:p-8 shadow-card">
            {done ? (
              <div className="flex flex-col items-center text-center py-10 gap-3">
                <CheckCircle2 className="h-14 w-14 text-turquoise" />
                <h3 className="text-2xl font-bold">Thank you!</h3>
                <p className="text-sm text-muted-foreground max-w-sm">
                  Your diaspora registration has been received. We'll be in touch shortly.
                </p>
              </div>
            ) : (
              <>
                <h3 className="text-2xl font-bold mb-1">Register Your Diaspora — Early Access</h3>
                <p className="text-sm text-muted-foreground mb-6">
                  Submissions are tagged by community so we can prioritise the most-requested diasporas.
                </p>
                <form onSubmit={submit} className="space-y-4">
                  <div>
                    <Label>Which diaspora community do you want to see here? *</Label>
                    <Input
                      value={form.diaspora_community}
                      onChange={(e) => setForm({ ...form, diaspora_community: e.target.value })}
                      placeholder="e.g. Indian, Chinese, Filipino, Greek, Lebanese, Brazilian…"
                      required
                    />
                    <p className="text-[11px] text-muted-foreground mt-1">
                      This tag will be used to group your registration with others from the same community.
                    </p>
                  </div>

                  <div>
                    <Label>I am joining as</Label>
                    <Select value={form.role} onValueChange={(v) => setForm({ ...form, role: v })}>
                      <SelectTrigger><SelectValue /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="general">General registration</SelectItem>
                        <SelectItem value="investment_partnership">Investment & Partnership</SelectItem>
                        <SelectItem value="founder_startup">Founder / Startup</SelectItem>
                        <SelectItem value="professional">Professional / Job seeker</SelectItem>
                        <SelectItem value="organization">Diaspora Organization / NGO</SelectItem>
                        <SelectItem value="city_ambassador">City Ambassador candidate</SelectItem>
                        <SelectItem value="media">Media / Blogger / Vlogger</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Full name *</Label>
                    <Input value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} required />
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Email *</Label>
                      <Input type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} required />
                    </div>
                    <div>
                      <Label>Phone (with country code)</Label>
                      <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+..." />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div>
                      <Label>Country</Label>
                      <Input value={form.country} onChange={(e) => setForm({ ...form, country: e.target.value })} />
                    </div>
                    <div>
                      <Label>City</Label>
                      <Input value={form.city} onChange={(e) => setForm({ ...form, city: e.target.value })} />
                    </div>
                  </div>

                  <div>
                    <Label>Company / Organization (optional)</Label>
                    <Input value={form.organization} onChange={(e) => setForm({ ...form, organization: e.target.value })} />
                  </div>

                  <div>
                    <Label>Links (LinkedIn, website, deck URL)</Label>
                    <Input value={form.links} onChange={(e) => setForm({ ...form, links: e.target.value })} placeholder="https://..." />
                  </div>

                  <div>
                    <Label>What would you like to see / build for this diaspora?</Label>
                    <Textarea
                      rows={3}
                      value={form.message}
                      onChange={(e) => setForm({ ...form, message: e.target.value })}
                      placeholder="e.g. WhatsApp networking groups, consulate map, business directory, events…"
                    />
                  </div>

                  <div>
                    <Label>Documents (optional)</Label>
                    <label className="mt-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-turquoise/60 hover:bg-turquoise/5 transition-colors">
                      <Upload className="h-4 w-4 text-turquoise" />
                      <span className="text-xs text-muted-foreground">Deck / CV / one-pager (PDF, PPTX, DOCX — max 10MB each)</span>
                      <input type="file" multiple accept=".pdf,.ppt,.pptx,.doc,.docx,.png,.jpg,.jpeg" className="hidden" onChange={handleFiles} />
                    </label>
                    {files.length > 0 && (
                      <ul className="mt-2 space-y-1">
                        {files.map((f, i) => (
                          <li key={i} className="flex items-center justify-between text-xs bg-muted/50 px-2 py-1 rounded">
                            <span className="truncate">{f.name}</span>
                            <button type="button" onClick={() => setFiles((p) => p.filter((_, idx) => idx !== i))} className="text-destructive">
                              <X className="h-3.5 w-3.5" />
                            </button>
                          </li>
                        ))}
                      </ul>
                    )}
                  </div>

                  <p className="text-[11px] text-muted-foreground">
                    By submitting you agree to our{" "}
                    <Link to="/legal/privacy" className="underline">Privacy Policy</Link> and{" "}
                    <Link to="/legal/terms" className="underline">Terms of Service</Link>.
                  </p>

                  <Button type="submit" disabled={submitting} className="w-full" size="lg">
                    {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Rocket className="h-4 w-4 mr-2" />}
                    Complete Registration
                  </Button>
                </form>
              </>
            )}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default RegisterDiaspora;
