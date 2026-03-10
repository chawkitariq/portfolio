import { Github, Linkedin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MaltIcon } from "../malt-icon";

const socialLinks = [
  { icon: Github, href: "https://github.com/chawkitariq", label: "Github" },
  {
    icon: Linkedin,
    href: "https://linkedin.com/in/chawkitariq",
    label: "LinkedIn",
  },
  {
    icon: MaltIcon,
    href: "https://www.malt.fr/profile/tariqchawki",
    label: "Malt",
  },
];

export default function PortfolioFooter() {
  return (
    <footer className="border-t border-border/40 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex flex-col items-center space-y-6">
          {/* Social Links */}
          <div className="flex items-center space-x-2">
            {socialLinks.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={social.label}
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="hover:scale-110 transition-transform"
                >
                  <social.icon size={20} />
                </Button>
              </a>
            ))}
          </div>

          {/* Copyright */}
          <div className="text-center text-sm text-muted-foreground">
            <p>
              © {new Date().getFullYear()} Tariq Chawki. Tous droits réservés.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
