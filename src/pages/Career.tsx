import { useState } from "react";
import { Briefcase, MapPin, Clock, Building2 } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import InterestForm from "@/components/InterestForm";
import { Button } from "@/components/ui/button";

interface Job {
  id: string;
  title: string;
  location: string;
  type: string;
  team: string;
  summary: string;
}

// Placeholder iskelet — gerçek ilan içeriği geldiğinde güncellenir.
const jobs: Job[] = [
  {
    id: "growth-lead",
    title: "Growth & Community Lead",
    location: "Remote (TR / EU)",
    type: "Tam zamanlı",
    team: "Growth",
    summary:
      "Türk diasporası şehirlerinde topluluk büyütmeyi, şehir elçileri programını ve viral döngüleri sahiplenecek bir lider arıyoruz.",
  },
  {
    id: "city-ambassador-ops",
    title: "City Ambassador Operations",
    location: "Remote",
    type: "Tam zamanlı / Sözleşmeli",
    team: "Operations",
    summary:
      "Berlin, Londra, Dubai, New York gibi öncelikli şehirlerde elçi alımını, eğitimi ve gelir paylaşımını yönetecek operasyon uzmanı.",
  },
  {
    id: "fullstack-eng",
    title: "Full-stack Engineer (React + Supabase)",
    location: "Remote",
    type: "Tam zamanlı",
    team: "Engineering",
    summary:
      "Platformun ürün yol haritasında danışman, işletme ve etkinlik akışlarını uçtan uca geliştirecek bir mühendis.",
  },
  {
    id: "content-editor",
    title: "Diaspora İçerik Editörü",
    location: "Remote",
    type: "Yarı zamanlı",
    team: "Content",
    summary:
      "Şehir haberleri, blog yarışması ve vlogger ekosistemi için editöryel kalite ve takvim yönetimi.",
  },
];

const Career = () => {
  const [open, setOpen] = useState(false);
  const [activeJob, setActiveJob] = useState<Job | null>(null);

  const apply = (job: Job) => {
    setActiveJob(job);
    setOpen(true);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="pt-24 pb-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-turquoise/15 border border-turquoise/30 mb-6">
              <Briefcase className="h-4 w-4 text-turquoise" />
              <span className="text-sm font-semibold text-turquoise">CorteQS Kariyer</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Global diasporaya hizmet eden bir takım kuruyoruz.</h1>
            <p className="text-muted-foreground text-lg">
              Açık pozisyonlarımıza göz at ve CorteQS'i birlikte büyütelim.
            </p>
          </div>

          <div className="max-w-4xl mx-auto grid gap-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group rounded-2xl border border-border bg-card p-6 hover:border-turquoise/40 hover:shadow-card transition-all"
              >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 text-xs text-muted-foreground mb-2">
                      <span className="inline-flex items-center gap-1"><Building2 className="h-3.5 w-3.5" />{job.team}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1"><MapPin className="h-3.5 w-3.5" />{job.location}</span>
                      <span>•</span>
                      <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{job.type}</span>
                    </div>
                    <h2 className="text-xl font-bold mb-2">{job.title}</h2>
                    <p className="text-sm text-muted-foreground">{job.summary}</p>
                  </div>
                  <Button onClick={() => apply(job)} className="shrink-0">
                    Başvur
                  </Button>
                </div>
              </div>
            ))}
          </div>

          <p className="text-center text-sm text-muted-foreground mt-10 max-w-xl mx-auto">
            Aradığınız pozisyonu bulamadınız mı? Yine de kayıt bırakın — yeni roller açıldıkça size ulaşırız.
          </p>
          <div className="text-center mt-4">
            <Button
              variant="outline"
              onClick={() => {
                setActiveJob(null);
                setOpen(true);
              }}
            >
              Genel Başvuru
            </Button>
          </div>
        </div>
      </main>
      <Footer />
      <InterestForm
        open={open}
        onOpenChange={setOpen}
        category="kariyer"
        title={activeJob ? `Başvuru: ${activeJob.title}` : "Genel Başvuru"}
        description="Bilgilerinizi bırakın, başvurunuzu inceleyip dönüş yapalım."
        defaultRole={activeJob?.title}
        source={activeJob ? `career-${activeJob.id}` : "career-general"}
      />
    </div>
  );
};

export default Career;
