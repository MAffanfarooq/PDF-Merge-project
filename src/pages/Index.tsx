import { useState } from "react";
import { PDFDocument } from "pdf-lib";
import { Download, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PDFUploader from "@/components/PDFUploader";
import PageSelector from "@/components/PageSelector";

interface PDFFile {
  file: File;
  id: string;
}

interface PageSelection {
  [fileId: string]: number[];
}

const Index = () => {
  const [files, setFiles] = useState<PDFFile[]>([]);
  const [pageSelections, setPageSelections] = useState<PageSelection>({});
  const [isProcessing, setIsProcessing] = useState(false);
  const { toast } = useToast();

  const handlePageSelection = (fileId: string, pages: number[]) => {
    setPageSelections(prev => ({
      ...prev,
      [fileId]: pages,
    }));
  };

  const mergePDFs = async () => {
    if (files.length === 0) {
      toast({
        title: "No files selected",
        description: "Please upload at least one PDF file.",
        variant: "destructive",
      });
      return;
    }

    setIsProcessing(true);

    try {
      const mergedPdf = await PDFDocument.create();

      for (const pdfFile of files) {
        const arrayBuffer = await pdfFile.file.arrayBuffer();
        const pdf = await PDFDocument.load(arrayBuffer);
        
        let pagesToCopy = pageSelections[pdfFile.id] || [];
        
        // If no pages selected, copy all pages
        if (pagesToCopy.length === 0) {
          pagesToCopy = Array.from({ length: pdf.getPageCount() }, (_, i) => i + 1);
        }

        // Copy selected pages (pdf-lib uses 0-based indexing)
        const copiedPages = await mergedPdf.copyPages(
          pdf,
          pagesToCopy.map(p => p - 1)
        );

        copiedPages.forEach(page => {
          mergedPdf.addPage(page);
        });
      }

      const mergedPdfBytes = await mergedPdf.save();
      const blob = new Blob([mergedPdfBytes], { type: "application/pdf" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = "merged-document.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      toast({
        title: "Success!",
        description: "Your PDFs have been merged and downloaded.",
      });

      // Reset state
      setFiles([]);
      setPageSelections({});
    } catch (error) {
      console.error("Error merging PDFs:", error);
      toast({
        title: "Error",
        description: "Failed to merge PDFs. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Navbar />
      
      <main className="flex-1 pt-16">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32 bg-gradient-to-br from-primary/5 via-background to-secondary/5">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-6xl mx-auto">
              <div className="grid lg:grid-cols-2 gap-12 items-center">
                <div className="space-y-8 text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                    <Sparkles className="h-4 w-4 text-primary" />
                    <span className="text-sm font-medium text-primary">Free PDF Merging Tool</span>
                  </div>
                  
                  <h1 className="text-5xl md:text-7xl font-bold tracking-tight leading-tight">
                    Merge PDFs
                    <span className="block mt-2 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
                      Effortlessly
                    </span>
                  </h1>
                  
                  <p className="text-xl text-muted-foreground max-w-xl">
                    Pick exactly the pages you want from multiple PDF files and combine them into one — download seamlessly.
                  </p>

                  <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                    <Button 
                      size="lg" 
                      className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg text-lg px-8 py-6"
                      onClick={() => document.getElementById("merge-section")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      Merge Now
                    </Button>
                    <Button 
                      size="lg" 
                      variant="outline"
                      className="border-2 text-lg px-8 py-6"
                      onClick={() => document.getElementById("how-it-works")?.scrollIntoView({ behavior: "smooth" })}
                    >
                      How It Works
                    </Button>
                  </div>
                </div>

                <div className="relative">
                  <div className="absolute inset-0 bg-gradient-to-r from-primary/20 to-secondary/20 blur-3xl rounded-full" />
                  <div className="relative bg-card border-2 border-border rounded-2xl p-8 shadow-2xl">
                    <div className="space-y-4">
                      <div className="flex items-center gap-3 p-4 bg-primary/10 rounded-lg">
                        <div className="w-12 h-12 bg-primary/20 rounded flex items-center justify-center">
                          <Download className="h-6 w-6 text-primary" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-primary/30 rounded w-3/4 mb-2" />
                          <div className="h-2 bg-primary/20 rounded w-1/2" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <div className="w-12 h-12 bg-muted-foreground/20 rounded flex items-center justify-center">
                          <Download className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-muted-foreground/30 rounded w-2/3 mb-2" />
                          <div className="h-2 bg-muted-foreground/20 rounded w-1/3" />
                        </div>
                      </div>
                      <div className="flex items-center gap-3 p-4 bg-muted rounded-lg">
                        <div className="w-12 h-12 bg-muted-foreground/20 rounded flex items-center justify-center">
                          <Download className="h-6 w-6 text-muted-foreground" />
                        </div>
                        <div className="flex-1">
                          <div className="h-3 bg-muted-foreground/30 rounded w-4/5 mb-2" />
                          <div className="h-2 bg-muted-foreground/20 rounded w-2/5" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section id="features" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Why Choose PDFMerge Pro?</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Powerful features that make PDF merging simple and efficient
                </p>
              </div>
              
              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-xl">Selective Page Merge</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose exactly which pages you want from each PDF document
                  </p>
                </div>
                
                <div className="text-center space-y-4 p-6 rounded-xl bg-muted/50 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                    <Download className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-bold text-xl">Fast & Secure</h3>
                  <p className="text-sm text-muted-foreground">
                    All processing happens in your browser. Your files never leave your device
                  </p>
                </div>
                
                <div className="text-center space-y-4 p-6 rounded-xl bg-card border border-border hover:shadow-lg transition-all">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center">
                    <Sparkles className="h-8 w-8 text-primary-foreground" />
                  </div>
                  <h3 className="font-bold text-xl">Preview Pages</h3>
                  <p className="text-sm text-muted-foreground">
                    See page counts and select ranges before merging
                  </p>
                </div>

                <div className="text-center space-y-4 p-6 rounded-xl bg-muted/50 hover:shadow-lg transition-all">
                  <div className="w-16 h-16 mx-auto rounded-xl bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center">
                    <Download className="h-8 w-8 text-secondary-foreground" />
                  </div>
                  <h3 className="font-bold text-xl">Download Instantly</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your merged PDF immediately with no watermarks or fees
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <div className="text-center mb-16">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
                <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                  Four simple steps to merge your PDFs
                </p>
              </div>

              <div className="grid md:grid-cols-4 gap-8">
                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-lg">
                    1
                  </div>
                  <h3 className="font-bold text-xl">Upload PDFs</h3>
                  <p className="text-sm text-muted-foreground">
                    Drag and drop or click to upload multiple PDF files
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-lg">
                    2
                  </div>
                  <h3 className="font-bold text-xl">Select Pages</h3>
                  <p className="text-sm text-muted-foreground">
                    Choose specific pages from each PDF using ranges like "1-3, 5"
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-primary-foreground font-bold text-3xl shadow-lg">
                    3
                  </div>
                  <h3 className="font-bold text-xl">Merge & Preview</h3>
                  <p className="text-sm text-muted-foreground">
                    Click merge and verify your page selections are correct
                  </p>
                </div>

                <div className="text-center space-y-4">
                  <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-secondary to-secondary/70 flex items-center justify-center text-secondary-foreground font-bold text-3xl shadow-lg">
                    4
                  </div>
                  <h3 className="font-bold text-xl">Download</h3>
                  <p className="text-sm text-muted-foreground">
                    Get your merged PDF instantly and download it to your device
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Upload & Merge Section */}
        <section id="merge-section" className="py-20 bg-background">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <div className="text-center mb-12">
                <h2 className="text-4xl md:text-5xl font-bold mb-4">Start Merging</h2>
                <p className="text-xl text-muted-foreground">
                  Upload your PDFs and select the pages you want to merge
                </p>
              </div>

              <PDFUploader files={files} onFilesChange={setFiles} />

              {files.length > 0 && (
                <>
                  <div className="space-y-4">
                    <h3 className="text-2xl font-bold">Select Pages</h3>
                    <p className="text-muted-foreground">
                      Choose which pages to include from each PDF. Leave blank to include all pages.
                    </p>
                    
                    <div className="grid gap-4">
                      {files.map((pdfFile) => (
                        <PageSelector
                          key={pdfFile.id}
                          file={pdfFile.file}
                          fileName={pdfFile.file.name}
                          onPagesChange={(pages) => handlePageSelection(pdfFile.id, pages)}
                        />
                      ))}
                    </div>
                  </div>

                  <div className="flex justify-center pt-4">
                    <Button
                      onClick={mergePDFs}
                      disabled={isProcessing}
                      size="lg"
                      className="bg-gradient-to-r from-primary to-secondary hover:shadow-xl transition-all duration-300 hover:scale-105 text-lg px-8 py-6"
                    >
                      <Download className="mr-2 h-5 w-5" />
                      {isProcessing ? "Processing..." : "Merge & Download"}
                    </Button>
                  </div>
                </>
              )}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 bg-gradient-to-br from-primary to-secondary text-primary-foreground">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center space-y-6">
              <h2 className="text-4xl md:text-5xl font-bold">Ready to merge your PDFs?</h2>
              <p className="text-xl opacity-90">
                Start combining your documents in seconds. No registration required.
              </p>
              <Button 
                size="lg"
                variant="secondary"
                className="bg-background text-foreground hover:bg-background/90 shadow-xl text-lg px-8 py-6"
                onClick={() => document.getElementById("merge-section")?.scrollIntoView({ behavior: "smooth" })}
              >
                Get Started Now
              </Button>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
