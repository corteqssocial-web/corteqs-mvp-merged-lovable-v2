// Lightweight client-side store for WhatsApp Group landing pages.
// Real persistence can later be moved to Supabase; for now we keep this
// in localStorage so admins can ship a landing without a backend round-trip.

export type LandingMode = "visual" | "text";

export interface WhatsAppLanding {
  id: string;
  groupName: string;
  category: "alumni" | "hobi" | "is" | "doktor";
  country: string;
  city: string;
  mode: LandingMode;
  /** Hero image URL for visual mode */
  heroImage?: string;
  /** Short tagline / pitch */
  tagline: string;
  /** Long-form invitation copy */
  callToActionText: string;
  /** Group conditions / rules (one per line) */
  conditions: string;
  /** Direct WhatsApp join link */
  whatsappLink: string;
  /** Optional admin contact */
  adminName?: string;
  adminContact?: string;
  createdAt: string;
}

const KEY = "corteqs.whatsapp.landings.v1";

const DEFAULTS: WhatsAppLanding[] = [
  {
    id: "odtu-almanya",
    groupName: "ODTÜ Mezunları Almanya",
    category: "alumni",
    country: "Almanya",
    city: "Berlin",
    mode: "visual",
    heroImage:
      "https://images.unsplash.com/photo-1523580494863-6f3031224c94?w=1200&h=600&fit=crop",
    tagline: "Almanya'daki ODTÜ ailesi tek çatı altında",
    callToActionText:
      "Mezun networking, kariyer fırsatları ve aylık şehir buluşmaları için aramıza katıl. Her hafta bir mezunumuzdan kariyer hikayesi paylaşıyoruz.",
    conditions:
      "Sadece ODTÜ mezunları (lisans/yüksek lisans/doktora)\nMezuniyet yılı ve bölüm ile tanış\nReklam ve link spam yasak\nGrup dili: Türkçe",
    whatsappLink: "https://chat.whatsapp.com/odtu-almanya",
    adminName: "Burak Yılmaz",
    adminContact: "+49 170 000 0000",
    createdAt: new Date().toISOString(),
  },
  {
    id: "doktor-londra",
    groupName: "Londra Türk Doktorlar Networking",
    category: "doktor",
    country: "İngiltere",
    city: "Londra",
    mode: "text",
    tagline: "NHS ve özel sektörde Türk hekim dayanışması",
    callToActionText:
      "Vaka tartışması, branş referansı ve iş ilanları için Londra ve çevresindeki Türk doktorların buluştuğu profesyonel ağ. Yeni gelen meslektaşlara mentorluk önceliklidir.",
    conditions:
      "Sadece GMC kayıtlı veya kayıt sürecinde olan Türk hekimler\nKısa CV ve branş bilgisi gerekli\nReçete / hasta bilgisi paylaşımı kesinlikle yasak\nReklam yasak — sadece mesleki içerik",
    whatsappLink: "https://chat.whatsapp.com/doktor-london",
    adminName: "Dr. Leyla Aydın",
    adminContact: "admin@drleylaaydin.co.uk",
    createdAt: new Date().toISOString(),
  },
  {
    id: "kitap-dubai",
    groupName: "Dubai Türk Kitap Kulübü",
    category: "hobi",
    country: "BAE",
    city: "Dubai",
    mode: "visual",
    heroImage:
      "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=1200&h=600&fit=crop",
    tagline: "Ayda bir kitap, ayda bir buluşma",
    callToActionText:
      "Dubai'de yaşayan Türk kitapseverler için her ay seçilen bir kitabı tartışıyoruz. Kafe buluşmaları, yazar söyleşileri ve okuma maratonları seni bekliyor.",
    conditions:
      "Aylık seçilen kitabı okuma sözü ver\nBuluşmalara ayda en az 1 kez katıl\nSpoiler uyarısı zorunlu\nGrup içi reklam yasak",
    whatsappLink: "https://chat.whatsapp.com/kitap-dubai",
    adminName: "Selma Kaya",
    adminContact: "+971 50 000 0000",
    createdAt: new Date().toISOString(),
  },
];

const readAll = (): WhatsAppLanding[] => {
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULTS;
    const parsed = JSON.parse(raw) as WhatsAppLanding[];
    // merge defaults that aren't overridden
    const ids = new Set(parsed.map((p) => p.id));
    return [...parsed, ...DEFAULTS.filter((d) => !ids.has(d.id))];
  } catch {
    return DEFAULTS;
  }
};

export const getLanding = (id: string): WhatsAppLanding | undefined =>
  readAll().find((l) => l.id === id);

export const listLandings = (): WhatsAppLanding[] => readAll();

export const saveLanding = (landing: WhatsAppLanding) => {
  const all = readAll().filter((l) => l.id !== landing.id);
  all.push(landing);
  // Persist only user-created ones (defaults stay as fallback)
  const userOnly = all.filter((l) => !DEFAULTS.find((d) => d.id === l.id) || true);
  localStorage.setItem(KEY, JSON.stringify(userOnly));
};

export const slugify = (s: string) =>
  s
    .toLowerCase()
    .replace(/ğ/g, "g").replace(/ü/g, "u").replace(/ş/g, "s")
    .replace(/ı/g, "i").replace(/ö/g, "o").replace(/ç/g, "c")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 60);
