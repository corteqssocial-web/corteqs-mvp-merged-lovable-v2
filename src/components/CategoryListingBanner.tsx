import { Link } from "react-router-dom";
import { Crown, ArrowRight, Sparkles } from "lucide-react";

interface CategoryListingBannerProps {
  /** Kategori adı (ör. "Danışmanlık", "İşletmeler", "Kuruluşlar") */
  categoryLabel: string;
  /** (Geriye dönük uyumluluk — artık kullanılmıyor) */
  formAnchorId?: string;
}

/**
 * Kayıt formunun ÜZERİNE konulan kompakt Founding 1000 şeridi.
 * Tıklanınca doğrudan /founders-1000 sayfasına yönlendirir.
 */
const CategoryListingBanner = ({ categoryLabel }: CategoryListingBannerProps) => {
  return (
    <Link
      to="/founders-1000"
      className="group block rounded-xl border border-gold/40 bg-gradient-to-r from-gold/10 via-orange-50/60 to-turquoise/10 hover:from-gold/15 hover:via-orange-50 hover:to-turquoise/15 transition-all px-4 py-3 mb-4"
    >
      <div className="flex items-center gap-3">
        <div className="shrink-0 w-9 h-9 rounded-lg bg-gold/20 flex items-center justify-center">
          <Crown className="h-4.5 w-4.5 text-gold" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex items-center gap-1.5">
            <Sparkles className="h-3 w-3 text-turquoise" />
            <span className="text-[11px] font-bold uppercase tracking-wider text-turquoise">
              Founding 1000 — Sınırlı Kontenjan
            </span>
          </div>
          <p className="text-sm font-semibold text-foreground leading-tight mt-0.5">
            {categoryLabel} kategorisinde <span className="text-gold">Founding Partner</span> olmak ister misiniz?
          </p>
        </div>
        <ArrowRight className="h-4 w-4 text-foreground/60 group-hover:translate-x-0.5 group-hover:text-foreground transition-all shrink-0" />
      </div>
    </Link>
  );
};

export default CategoryListingBanner;
