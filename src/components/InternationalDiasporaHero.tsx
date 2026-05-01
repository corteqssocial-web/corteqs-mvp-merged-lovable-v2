import { useState } from "react";
import { Globe, Sparkles, Rocket, Handshake, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { useDiaspora, type DiasporaKey } from "@/contexts/DiasporaContext";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import { Loader2, Upload, X, CheckCircle2 } from "lucide-react";

type Copy = {
  badge: string;
  title: string;
  highlight: string;
  subtitle: string;
  formTitle: string;
  formIntro: string;
  cta1: string;
  cta2: string;
  interestLabel: string;
  options: { value: string; label: string }[];
  uploadHint: string;
  submit: string;
  success: string;
  langCode: DiasporaKey;
};

const COPY: Record<Exclude<DiasporaKey, "tr">, Copy> = {
  in: {
    badge: "Indian Diaspora — Infrastructure Demand Live",
    title: "We're seeing massive demand from the ",
    highlight: "Indian global diaspora",
    subtitle:
      "CorteQS is opening dedicated infrastructure for the Indian diaspora — investors, founders, professionals and students. Register early to get your slot.",
    formTitle: "Indian Diaspora — Early Access Registration",
    formIntro:
      "Drop your documents, deck or LinkedIn link. Tell us if you're here for investment & partnership or general access.",
    cta1: "Investment & Partnership",
    cta2: "General Registration",
    interestLabel: "Why are you joining?",
    options: [
      { value: "investment_partnership", label: "Investment & Partnership" },
      { value: "founder_startup", label: "Founder / Startup" },
      { value: "professional", label: "Professional / Job seeker" },
      { value: "student", label: "Student" },
      { value: "general", label: "General registration" },
    ],
    uploadHint: "Upload deck / CV / one-pager (PDF, PPTX, DOCX — max 10MB)",
    submit: "Complete Registration",
    success: "Registration received. We'll be in touch shortly.",
    langCode: "in",
  },
  cn: {
    badge: "Chinese Diaspora — Infrastructure Demand Live",
    title: "Strong inbound demand from the ",
    highlight: "Chinese global diaspora",
    subtitle:
      "CorteQS is launching dedicated infrastructure for Chinese diaspora investors, founders, professionals and families. Reserve your spot.",
    formTitle: "Chinese Diaspora — Early Access Registration",
    formIntro:
      "Share your deck, CV or links. Let us know your goal: investment / partnership or general access.",
    cta1: "Investment & Partnership",
    cta2: "General Registration",
    interestLabel: "Why are you joining?",
    options: [
      { value: "investment_partnership", label: "Investment & Partnership" },
      { value: "founder_startup", label: "Founder / Startup" },
      { value: "professional", label: "Professional / Job seeker" },
      { value: "student", label: "Student" },
      { value: "general", label: "General registration" },
    ],
    uploadHint: "Upload deck / CV / one-pager (PDF, PPTX, DOCX — max 10MB)",
    submit: "Complete Registration",
    success: "Registration received. We'll be in touch shortly.",
    langCode: "cn",
  },
  ph: {
    badge: "Filipino Diaspora — Infrastructure Demand Live",
    title: "Growing demand from the ",
    highlight: "Filipino global diaspora",
    subtitle:
      "CorteQS is preparing dedicated infrastructure for the Filipino diaspora — OFWs, founders, professionals and families. Get early access.",
    formTitle: "Filipino Diaspora — Early Access Registration",
    formIntro:
      "Upload your documents or links. Tell us if it's for investment & partnership or general registration.",
    cta1: "Investment & Partnership",
    cta2: "General Registration",
    interestLabel: "Why are you joining?",
    options: [
      { value: "investment_partnership", label: "Investment & Partnership" },
      { value: "founder_startup", label: "Founder / Startup" },
      { value: "professional", label: "Professional / Job seeker" },
      { value: "student", label: "Student" },
      { value: "general", label: "General registration" },
    ],
    uploadHint: "Upload deck / CV / one-pager (PDF, PPTX, DOCX — max 10MB)",
    submit: "Complete Registration",
    success: "Registration received. We'll be in touch shortly.",
    langCode: "ph",
  },
};

const InternationalDiasporaHero = () => {
  const { diaspora } = useDiaspora();
  const { toast } = useToast();
  const [intent, setIntent] = useState<"investment_partnership" | "general">("general");
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const [files, setFiles] = useState<File[]>([]);
  const [form, setForm] = useState({
    name: "", email: "", phone: "", country: "", city: "",
    organization: "", interest_area: "general", links: "", message: "",
  });

  if (diaspora === "tr") return null;
  const c = COPY[diaspora as "in" | "cn" | "ph"];

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

  const upload = async () => {
    const urls: string[] = [];
    for (const f of files) {
      const ext = f.name.split(".").pop() || "bin";
      const path = `diaspora_${c.langCode}/${Date.now()}-${Math.random().toString(36).slice(2, 8)}.${ext}`;
      const { error } = await supabase.storage.from("interest-uploads").upload(path, f, { contentType: f.type });
      if (error) throw error;
      urls.push(path);
    }
    return urls;
  };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({ title: "Name & email required", variant: "destructive" });
      return;
    }
    setSubmitting(true);
    try {
      const attachment_urls = await upload();
      const { error } = await supabase.from("interest_registrations").insert({
        category: "international",
        role: intent,
        name: form.name,
        email: form.email,
        phone: form.phone,
        country: form.country,
        city: form.city,
        organization: form.organization,
        interest_area: form.interest_area,
        supply_demand: form.message,
        heard_from: form.links,
        source: `diaspora_${c.langCode}`,
        attachment_urls,
        message: form.message,
      });
      if (error) throw error;
      setDone(true);
      toast({ title: "Thanks!", description: c.success });
    } catch (err: any) {
      toast({ title: "Something went wrong", description: err.message, variant: "destructive" });
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section className="relative pt-16 min-h-[75vh] bg-gradient-hero overflow-hidden">
      <div className="absolute inset-0">
        <div className="absolute top-10 right-20 w-80 h-80 bg-turquoise/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 left-20 w-96 h-96 bg-primary/15 rounded-full blur-3xl" />
      </div>
      <div className="container mx-auto px-4 pt-20 pb-16 relative z-10 grid lg:grid-cols-2 gap-10 items-start">
        {/* Left — hero copy */}
        <div>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-amber-400/15 border border-amber-400/30 mb-6 shadow-md">
            <Sparkles className="h-4 w-4 text-amber-500" />
            <span className="text-sm font-semibold text-amber-600">{c.badge}</span>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight mb-5">
            {c.title}
            <span className="text-gradient-primary">{c.highlight}</span>
          </h1>
          <p className="text-base md:text-lg text-muted-foreground max-w-xl mb-8 font-body">
            {c.subtitle}
          </p>
          <div className="flex flex-wrap gap-3">
            <Button
              size="lg"
              onClick={() => { setIntent("investment_partnership"); document.getElementById("intl-form")?.scrollIntoView({ behavior: "smooth" }); }}
              className="bg-amber-500 hover:bg-amber-600 text-white gap-2"
            >
              <Handshake className="h-4 w-4" /> {c.cta1}
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { setIntent("general"); document.getElementById("intl-form")?.scrollIntoView({ behavior: "smooth" }); }}
              className="gap-2"
            >
              <FileText className="h-4 w-4" /> {c.cta2}
            </Button>
          </div>
          <div className="flex items-center gap-2 mt-8 text-sm text-muted-foreground">
            <Globe className="h-4 w-4 text-turquoise" />
            <span>Registrations grouped by country & diaspora</span>
          </div>
        </div>

        {/* Right — form */}
        <div id="intl-form" className="rounded-2xl border border-border bg-card p-6 shadow-card">
          {done ? (
            <div className="flex flex-col items-center text-center py-10 gap-3">
              <CheckCircle2 className="h-14 w-14 text-turquoise" />
              <h3 className="text-xl font-bold">Thank you!</h3>
              <p className="text-sm text-muted-foreground max-w-sm">{c.success}</p>
            </div>
          ) : (
            <>
              <h3 className="text-xl font-bold mb-1">{c.formTitle}</h3>
              <p className="text-xs text-muted-foreground mb-4">{c.formIntro}</p>
              <form onSubmit={submit} className="space-y-3">
                <div>
                  <Label>{c.interestLabel}</Label>
                  <Select value={form.interest_area} onValueChange={(v) => setForm({ ...form, interest_area: v })}>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent>
                      {c.options.map((o) => <SelectItem key={o.value} value={o.value}>{o.label}</SelectItem>)}
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
                    <Input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} placeholder="+91 ..." />
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
                  <Label>Message / what you're looking for</Label>
                  <Textarea rows={3} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} />
                </div>
                <div>
                  <Label>Documents</Label>
                  <label className="mt-1 flex items-center justify-center gap-2 px-4 py-3 border-2 border-dashed border-border rounded-lg cursor-pointer hover:border-turquoise/60 hover:bg-turquoise/5 transition-colors">
                    <Upload className="h-4 w-4 text-turquoise" />
                    <span className="text-xs text-muted-foreground">{c.uploadHint}</span>
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
                <div className="text-xs text-muted-foreground bg-amber-50 border border-amber-200 rounded-lg px-3 py-2">
                  Selected intent: <span className="font-semibold">{intent === "investment_partnership" ? c.cta1 : c.cta2}</span>
                </div>
                <Button type="submit" disabled={submitting} className="w-full" size="lg">
                  {submitting ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Rocket className="h-4 w-4 mr-2" />}
                  {c.submit}
                </Button>
              </form>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default InternationalDiasporaHero;
