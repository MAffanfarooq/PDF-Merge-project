import { Shield, Zap, Heart, Target } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Card } from "@/components/ui/card";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                About
                <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  PDFMerge Pro
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Your trusted companion for effortless PDF merging with precision and control.
              </p>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">Our Mission</h2>
                <p className="text-lg text-muted-foreground">
                  We believe document management should be simple, secure, and accessible to everyone. 
                  PDFMerge Pro was created to give you complete control over your PDF documents without 
                  compromising on privacy or ease of use.
                </p>
              </div>

              {/* Values Grid */}
              <div className="grid md:grid-cols-2 gap-6 pt-8">
                <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Privacy First</h3>
                  <p className="text-muted-foreground">
                    All PDF processing happens directly in your browser. Your documents never touch our servers, 
                    ensuring complete privacy and security.
                  </p>
                </Card>

                <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-secondary/10 flex items-center justify-center">
                    <Zap className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-xl font-semibold">Lightning Fast</h3>
                  <p className="text-muted-foreground">
                    Modern browser technology allows us to process your PDFs instantly, no matter how large 
                    or complex they are.
                  </p>
                </Card>

                <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-xl font-semibold">User Focused</h3>
                  <p className="text-muted-foreground">
                    We designed PDFMerge Pro with one goal: make PDF merging as intuitive and straightforward 
                    as possible.
                  </p>
                </Card>

                <Card className="p-6 space-y-4 hover:shadow-lg transition-shadow">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Target className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold">Precision Control</h3>
                  <p className="text-muted-foreground">
                    Select exactly which pages you need from each document. No more, no less. You're in 
                    complete control.
                  </p>
                </Card>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-12">
              <div className="text-center space-y-4">
                <h2 className="text-3xl font-bold">How It Works</h2>
                <p className="text-lg text-muted-foreground">
                  Merging PDFs has never been easier. Just follow these simple steps.
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-8">
                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto">
                    1
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-lg">Upload Your PDFs</h3>
                    <p className="text-sm text-muted-foreground">
                      Drag and drop or click to select multiple PDF files from your device
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto">
                    2
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-lg">Select Pages</h3>
                    <p className="text-sm text-muted-foreground">
                      Choose specific pages from each PDF or merge entire documents
                    </p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-primary flex items-center justify-center text-primary-foreground font-bold text-2xl mx-auto">
                    3
                  </div>
                  <div className="text-center space-y-2">
                    <h3 className="font-semibold text-lg">Download Merged PDF</h3>
                    <p className="text-sm text-muted-foreground">
                      Click merge and instantly download your combined PDF document
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl font-bold">Ready to Get Started?</h2>
              <p className="text-lg text-muted-foreground">
                Start merging your PDFs today with precision and control.
              </p>
              <div className="pt-4">
                <a 
                  href="/" 
                  className="inline-flex items-center justify-center px-8 py-3 rounded-lg bg-gradient-to-r from-primary to-secondary text-primary-foreground font-medium hover:shadow-lg transition-all duration-300 hover:scale-105"
                >
                  Try PDFMerge Pro Now
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
