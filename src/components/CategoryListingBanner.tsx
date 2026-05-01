import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Crown, UserPlus, Sparkles } from "lucide-react";

interface CategoryListingBannerProps {
  /** Kategori adı (ör. "Danışmanlık", "İşletmeler", "Kuruluşlar") */
  categoryLabel: string;
  /** Tıklayınca aşağıdaki forma scroll için id */
  formAnchorId: string;
}

const CategoryListingBanner = ({ categoryLabel, formAnchorId }: CategoryListingBannerProps) => {
  return (
    <div className="rounded-2xl border border-turquoise/30 bg-gradient-to-br from-turquoise/5 via-card to-orange-50/40 p-6 md:p-8 mb-8">
      <div className="flex items-start gap-3 mb-4">
        <Sparkles className="h-5 w-5 text-turquoise shrink-0 mt-1" />
        <div>
          <h2 className="text-xl md:text-2xl font-bold">
            {categoryLabel} kategorimize başvurularımız devam etmektedir
          </h2>
          <p className="text-sm text-muted-foreground mt-1">
            Aşağıda gördüğünüz kartlar örnek (DEMO) içeriklerdir. Gerçek profiller başvurular değerlendirildikçe yayına alınacaktır.
          </p>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row gap-3">
        <Link to="/founders-1000" className="flex-1">
          <Button size="lg" className="w-full bg-gold text-foreground hover:bg-gold/90 gap-2">
            <Crown className="h-4 w-4" />
            Avantajlı Kayıt + Global Görünürlük: Founders 1000
          </Button>
        </Link>
        <a href={`#${formAnchorId}`} className="flex-1">
          <Button size="lg" variant="outline" className="w-full border-turquoise text-turquoise hover:bg-turquoise/10 gap-2">
            <UserPlus className="h-4 w-4" />
            {categoryLabel} Kategorisine Kayıt Ol
          </Button>
        </a>
      </div>
    </div>
  );
};

export default CategoryListingBanner;
