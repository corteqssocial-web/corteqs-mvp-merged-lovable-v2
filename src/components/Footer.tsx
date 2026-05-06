import { Link } from "react-router-dom";
import { diasporaOptions } from "@/contexts/DiasporaContext";
import corteqsLogo from "@/assets/corteqs-logo.png";
import { footerLinkSections } from "@/components/footerLinks";

const Footer = () => {
  return (
    <footer className="bg-secondary text-secondary-foreground py-16">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-[minmax(0,1.4fr)_repeat(2,minmax(0,1fr))]">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={corteqsLogo} alt="CorteQS" className="h-8 w-auto" />
            </div>
            <p className="text-sm text-secondary-foreground/60 font-body">
              Türk diasporasını birleştiren global platform.
            </p>
            <div className="flex gap-2 mt-4">
              {diasporaOptions.map((opt) => (
                <span key={opt.key} className="text-lg" title={opt.label}>{opt.flag}</span>
              ))}
            </div>
          </div>

          {footerLinkSections.map((section) => (
            <div key={section.title}>
              <h4 className="font-bold mb-4 text-sm uppercase tracking-wider">{section.title}</h4>
              <ul className="space-y-2 text-sm text-secondary-foreground/60 font-body">
                {section.links.map((link) => (
                  <li key={link.label}>
                    {link.to ? (
                      <Link to={link.to} className="hover:text-primary transition-colors">
                        {link.label}
                      </Link>
                    ) : (
                      <a href={link.href} className="hover:text-primary transition-colors">
                        {link.label}
                      </a>
                    )}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-secondary-foreground/10 mt-12 pt-8 text-center text-sm text-secondary-foreground/40 font-body">
          © 2026 CorteQS. Tüm hakları saklıdır.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
