import { useEffect, useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Menu, X, User, LogOut, MapPin, PenLine, ChevronDown, Newspaper, MessageCircle, Calendar, Briefcase, Users } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useDiaspora, countryList } from "@/contexts/DiasporaContext";
import { useAuth } from "@/contexts/AuthContext";

const desktopNavItemClass =
  "rounded-none px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:bg-[rgba(148,163,184,0.18)] hover:text-[hsl(220_30%_12%)] focus-visible:bg-[rgba(148,163,184,0.18)] focus-visible:text-[hsl(220_30%_12%)]";

const desktopSeparatorClass = "h-5 w-px bg-border/90";

const Navbar = () => {
const [isOpen, setIsOpen] = useState(false);
const { diaspora, t, selectedCountry, setSelectedCountry } = useDiaspora();
const { user, profile, signOut } = useAuth();
const navigate = useNavigate();
const location = useLocation();
const isHome = location.pathname === "/";
// Routes that have their own dedicated Country+City selector (CountryCitySelector)
// — hide the duplicate navbar selector on these pages.
const routesWithOwnSelector = [
  "/consultants",
  "/businesses",
  "/associations",
  "/events",
  "/city-news",
  "/whatsapp-groups",
  "/map",
];
const hasOwnSelector = routesWithOwnSelector.some((p) => location.pathname.startsWith(p));
// Country selector only makes sense for the Turkish diaspora (the only one
// with full country/city data live). For other diasporas — and the register-
// diaspora landing — hide it entirely so it isn't confused with the diaspora picker.
const isInternational = diaspora !== "tr";
const isRegisterDiaspora = location.pathname.startsWith("/register-diaspora");
const showNavbarCountry = !isHome && !hasOwnSelector && !isInternational && !isRegisterDiaspora;

  const handleSignOut = async () => {
    await signOut();
    navigate("/");
  };

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-card/80 backdrop-blur-lg border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between py-2" style={{ minHeight: '4rem' }}>
          <div className="flex items-center gap-2 min-w-0 shrink-0">
            <Link to="/" className="flex items-center gap-2 shrink-0">
              <img src="/logo.png" alt="CorteQS" className="h-12 w-auto sm:h-14 md:h-16" />
            </Link>

            {/* Country Selector — hidden on home page */}
            {showNavbarCountry && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="sm" className="gap-1.5 px-2.5 h-8 text-xs border-border">
                    <MapPin className="h-3.5 w-3.5 text-primary" />
                    <span className="hidden sm:inline">{selectedCountry === "all" ? t.nav.allCountries : selectedCountry}</span>
                    <ChevronDown className="h-3 w-3 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start" className="w-56 max-h-[70vh] overflow-y-auto">
                  <DropdownMenuLabel className="text-xs text-muted-foreground">{t.nav.selectCountry}</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem
                    className={`cursor-pointer text-sm ${selectedCountry === "all" ? "bg-accent/50 font-semibold" : ""}`}
                    onClick={() => setSelectedCountry("all")}
                  >
                    🌍 {t.nav.allCountries}
                  </DropdownMenuItem>
                  {countryList.map((c) => (
                    <DropdownMenuItem
                      key={c}
                      className={`cursor-pointer text-sm ${selectedCountry === c ? "bg-accent/50 font-semibold" : ""}`}
                      onClick={() => setSelectedCountry(c)}
                    >
                      {c}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <div className="hidden md:flex items-center">
            <Link to="/feed" className={`${desktopNavItemClass} whitespace-nowrap font-semibold text-foreground hover:text-primary`}>Cadde</Link>
            <div className={desktopSeparatorClass} />
            <Link to="/consultants" className={`${desktopNavItemClass} whitespace-nowrap`}>{t.nav.consultants}</Link>
            <div className={desktopSeparatorClass} />
            <Link to="/businesses" className={desktopNavItemClass}>{t.nav.businesses}</Link>
            <div className={desktopSeparatorClass} />
            <Link to="/career" className={desktopNavItemClass}>Kariyer</Link>
            <div className={desktopSeparatorClass} />
            <Link to="/associations" className={desktopNavItemClass}>{t.nav.organizations}</Link>
            <div className={desktopSeparatorClass} />
            <Link to="/bloggers" className={desktopNavItemClass}>{t.nav.vblogger}</Link>
            <div className={desktopSeparatorClass} />


          </div>

          <div className="hidden md:flex items-center gap-3">
            {user ? (
              <>
                <Link to="/profile">
                  <Button variant="ghost" size="sm" className="gap-1.5">
                    <User className="h-4 w-4" />
                    {t.nav.dashboard}
                  </Button>
                </Link>
                <Button variant="ghost" size="sm" className="gap-1.5 text-muted-foreground" onClick={handleSignOut}>
                  <LogOut className="h-4 w-4" /> {t.nav.logout}
                </Button>
              </>
            ) : (
              <>
                <div className="h-6 w-px bg-border/90" />
                <Link to="/auth" className="flex-1 min-w-[132px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full rounded-xl border border-emerald-200/80 bg-[rgba(173,226,202,0.55)] px-4 text-[hsl(155_30%_20%)] shadow-none hover:bg-[rgba(173,226,202,0.8)] hover:text-[hsl(155_30%_18%)]"
                  >
                    {t.nav.login}
                  </Button>
                </Link>
                <div className="h-6 w-px bg-border/90" />
                <Link to="/auth" className="flex-1 min-w-[132px]">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="w-full rounded-xl border border-orange-200/80 bg-[rgba(248,176,121,0.42)] px-4 text-[hsl(20_58%_28%)] shadow-none hover:bg-[rgba(248,176,121,0.65)] hover:text-[hsl(20_58%_24%)]"
                  >
                    {t.nav.signup}
                  </Button>
                </Link>
              </>
            )}
          </div>

          <button
            className="md:hidden text-foreground"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {isOpen && (
          <div className="md:hidden pb-4 border-t border-border pt-4 animate-fade-in">
            <div className="flex flex-col gap-3">
              {/* Mobile Country Selector — hidden on home */}
              {showNavbarCountry && (
                <select
                  value={selectedCountry}
                  onChange={(e) => setSelectedCountry(e.target.value)}
                  className="w-full px-3 py-2 rounded-lg border border-border bg-card text-sm text-foreground mb-2"
                >
                  <option value="all">🌍 {t.nav.allCountries}</option>
                  {countryList.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              )}
              <Link to="/consultants" className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>{t.nav.consultants}</Link>
              <Link to="/associations" className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>{t.nav.organizations}</Link>
              <Link to="/businesses" className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>{t.nav.businesses}</Link>
              <Link to="/career" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => setIsOpen(false)}><Briefcase className="h-3 w-3" />Kariyer</Link>
              <Link to="/bloggers" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => setIsOpen(false)}><PenLine className="h-3 w-3" />{t.nav.vblogger}</Link>
              <Link to="/whatsapp-groups" className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>{t.nav.groups}</Link>
              <Link to="/events" className="text-sm font-medium text-muted-foreground hover:text-foreground" onClick={() => setIsOpen(false)}>{t.nav.events}</Link>
              <Link to="/diaspora-people" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => setIsOpen(false)}><Users className="h-3 w-3" />Diasporada İnsanlar</Link>
              <Link to="/city-news" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => setIsOpen(false)}><Newspaper className="h-3 w-3" />{t.nav.media}</Link>
              <Link to="/feed" className="text-sm font-semibold text-foreground hover:text-primary" onClick={() => setIsOpen(false)}>Cadde</Link>
              
              <Link to="/map" className="text-sm font-medium text-muted-foreground hover:text-foreground flex items-center gap-1" onClick={() => setIsOpen(false)}><MapPin className="h-3 w-3" />{t.nav.map}</Link>
              <div className="border-t border-border pt-3 mt-1">
                {user ? (
                  <>
                    <Link to="/profile" className="flex items-center gap-2 text-sm font-medium text-foreground py-1.5" onClick={() => setIsOpen(false)}>
                      <User className="h-4 w-4 text-primary" />
                      {profile?.full_name || t.nav.profile}
                    </Link>
                    <button
                      className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground py-1.5 w-full"
                      onClick={() => { handleSignOut(); setIsOpen(false); }}
                    >
                      <LogOut className="h-4 w-4" /> {t.nav.logout}
                    </button>
                  </>
                ) : (
                  <div className="flex gap-2 mt-2">
                    <Link to="/auth" onClick={() => setIsOpen(false)} className="flex-1">
                      <Button variant="ghost" size="sm" className="w-full">{t.nav.login}</Button>
                    </Link>
                    <Link to="/auth" onClick={() => setIsOpen(false)} className="flex-1">
                      <Button variant="default" size="sm" className="w-full">{t.nav.signup}</Button>
                    </Link>
                  </div>
                )}
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
