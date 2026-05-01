import { useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import { Loader2, CheckCircle2 } from "lucide-react";

export type InterestCategory =
  | "founders_1000"
  | "yarisma"
  | "kariyer"
  | "genel";

interface InterestFormProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  category: InterestCategory;
  title?: string;
  description?: string;
  defaultRole?: string;
  source?: string;
  referralCode?: string;
}

const titles: Record<InterestCategory, string> = {
  founders_1000: "Founding 1000'e Katıl",
  yarisma: "Yarışmaya Başvur",
  kariyer: "İş İlanına Başvur",
  genel: "Kayıt Bırak",
};

const InterestForm = ({
  open,
  onOpenChange,
  category,
  title,
  description,
  defaultRole,
  source,
  referralCode,
}: InterestFormProps) => {
  const { toast } = useToast();
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    city: "",
    role: defaultRole || "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) {
      toast({
        title: "Eksik bilgi",
        description: "Lütfen ad ve e-posta alanlarını doldurun.",
        variant: "destructive",
      });
      return;
    }
    setSubmitting(true);
    const { error } = await supabase.from("interest_registrations").insert({
      category,
      ...form,
      referral_code: referralCode || null,
      source: source || null,
    });
    setSubmitting(false);

    if (error) {
      toast({
        title: "Bir şeyler ters gitti",
        description: error.message,
        variant: "destructive",
      });
      return;
    }

    setSubmitted(true);
    toast({
      title: "Kaydınız alındı",
      description: "En kısa sürede sizinle iletişime geçeceğiz.",
    });
  };

  const reset = () => {
    setSubmitted(false);
    setForm({
      name: "",
      email: "",
      phone: "",
      country: "",
      city: "",
      role: defaultRole || "",
      message: "",
    });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        if (!o) reset();
        onOpenChange(o);
      }}
    >
      <DialogContent className="sm:max-w-lg max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{title || titles[category]}</DialogTitle>
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>

        {submitted ? (
          <div className="flex flex-col items-center text-center py-6 gap-3">
            <CheckCircle2 className="h-12 w-12 text-turquoise" />
            <h3 className="text-lg font-bold">Teşekkürler!</h3>
            <p className="text-sm text-muted-foreground">
              Kaydınız alındı. En kısa sürede sizinle iletişime geçeceğiz.
            </p>
            <Button onClick={() => onOpenChange(false)} className="mt-2">
              Kapat
            </Button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-3">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="name">Ad Soyad *</Label>
                <Input
                  id="name"
                  value={form.name}
                  onChange={(e) => setForm({ ...form, name: e.target.value })}
                  required
                />
              </div>
              <div>
                <Label htmlFor="email">E-posta *</Label>
                <Input
                  id="email"
                  type="email"
                  value={form.email}
                  onChange={(e) => setForm({ ...form, email: e.target.value })}
                  required
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="phone">Telefon (WhatsApp)</Label>
                <Input
                  id="phone"
                  value={form.phone}
                  onChange={(e) => setForm({ ...form, phone: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="role">
                  {category === "kariyer" ? "Pozisyon" : "Kategori / Meslek"}
                </Label>
                <Input
                  id="role"
                  value={form.role}
                  onChange={(e) => setForm({ ...form, role: e.target.value })}
                  placeholder={
                    category === "kariyer"
                      ? "Hangi ilana başvuruyorsun?"
                      : "Doktor, avukat, restoran vb."
                  }
                />
              </div>
            </div>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <Label htmlFor="country">Ülke</Label>
                <Input
                  id="country"
                  value={form.country}
                  onChange={(e) => setForm({ ...form, country: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="city">Şehir</Label>
                <Input
                  id="city"
                  value={form.city}
                  onChange={(e) => setForm({ ...form, city: e.target.value })}
                />
              </div>
            </div>
            <div>
              <Label htmlFor="message">Mesaj</Label>
              <Textarea
                id="message"
                value={form.message}
                onChange={(e) => setForm({ ...form, message: e.target.value })}
                rows={3}
                placeholder="Kısa bir not ekleyebilirsin (opsiyonel)"
              />
            </div>
            {referralCode && (
              <p className="text-xs text-muted-foreground">
                Referral kodu:{" "}
                <code className="bg-muted px-1.5 py-0.5 rounded">
                  {referralCode}
                </code>
              </p>
            )}
            <DialogFooter>
              <Button type="submit" disabled={submitting} className="w-full">
                {submitting && <Loader2 className="h-4 w-4 mr-2 animate-spin" />}
                Kaydı Tamamla
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default InterestForm;
