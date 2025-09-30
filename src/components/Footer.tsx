import { FileText, Github, Twitter, Linkedin, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Footer = () => {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <footer className="border-t border-border bg-foreground/95 text-background mt-auto relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />
      
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2">
              <div className="rounded-lg bg-gradient-to-br from-primary to-secondary p-2 shadow-md">
                <FileText className="h-5 w-5 text-primary-foreground" />
              </div>
              <span className="text-xl font-bold">
                PDFMerge Pro
              </span>
            </div>
            <p className="text-sm text-background/70 max-w-sm">
              The easiest way to merge your PDF documents. Fast, secure, and completely free. 
              Select specific pages from multiple files and combine them seamlessly.
            </p>
            <div className="flex gap-3 pt-2">
              <a 
                href="https://twitter.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Twitter className="h-5 w-5" />
              </a>
              <a 
                href="https://github.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Github className="h-5 w-5" />
              </a>
              <a 
                href="https://linkedin.com" 
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Linkedin className="h-5 w-5" />
              </a>
              <a 
                href="mailto:contact@pdfmergepro.com"
                className="p-2 rounded-lg bg-background/10 hover:bg-primary hover:text-primary-foreground transition-all duration-300"
              >
                <Mail className="h-5 w-5" />
              </a>
            </div>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-background">Quick Links</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <Link to="/" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Home
                </Link>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("features")}
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  Features
                </button>
              </li>
              <li>
                <button 
                  onClick={() => scrollToSection("how-it-works")}
                  className="hover:text-primary transition-colors hover:translate-x-1 inline-block"
                >
                  How It Works
                </button>
              </li>
              <li>
                <Link to="/about" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  About
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-background">Resources</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  FAQ
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Blog
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Support
                </a>
              </li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-semibold mb-4 text-background">Legal</h3>
            <ul className="space-y-3 text-sm text-background/70">
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  Cookie Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-primary transition-colors hover:translate-x-1 inline-block">
                  GDPR
                </a>
              </li>
            </ul>
          </div>
        </div>
        
        <div className="mt-12 pt-8 border-t border-background/20 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-background/60">
            © 2025 PDFMerge Pro. All rights reserved.
          </p>
          <p className="text-sm text-background/60">
            Built with ❤️ for better PDF workflows
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
