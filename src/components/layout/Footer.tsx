import React from 'react';
import { Link } from 'react-router-dom';
import { UtensilsCrossed, Facebook, Twitter, Instagram } from 'lucide-react';

const Footer: React.FC = () => {
  console.log('Footer loaded');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted text-muted-foreground border-t">
      <div className="container py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
          {/* Brand Section */}
          <div className="space-y-4 col-span-1 md:col-span-1">
            <Link to="/" className="flex items-center gap-2 text-foreground">
              <UtensilsCrossed className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">FeastFlow</span>
            </Link>
            <p className="text-sm">
              Your favorite food, delivered to your door.
            </p>
          </div>

          {/* Links Section */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 col-span-1 md:col-span-3">
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Company</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/about" className="text-sm hover:text-primary transition-colors">About Us</Link>
                <Link to="/careers" className="text-sm hover:text-primary transition-colors">Careers</Link>
                <Link to="/press" className="text-sm hover:text-primary transition-colors">Press</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Support</h3>
              <nav className="flex flex-col space-y-2">
                <Link to="/contact" className="text-sm hover:text-primary transition-colors">Contact</Link>
                <Link to="/faq" className="text-sm hover:text-primary transition-colors">FAQ</Link>
                <Link to="/terms" className="text-sm hover:text-primary transition-colors">Terms & Conditions</Link>
                <Link to="/privacy" className="text-sm hover:text-primary transition-colors">Privacy Policy</Link>
              </nav>
            </div>
            <div className="space-y-4">
              <h3 className="font-semibold text-foreground">Social</h3>
              <div className="flex items-center space-x-4">
                <a href="#" className="hover:text-primary transition-colors" aria-label="Facebook">
                  <Facebook className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors" aria-label="Twitter">
                  <Twitter className="h-5 w-5" />
                </a>
                <a href="#" className="hover:text-primary transition-colors" aria-label="Instagram">
                  <Instagram className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 pt-8 border-t flex flex-col sm:flex-row items-center justify-between">
          <p className="text-sm">
            &copy; {currentYear} FeastFlow Inc. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;