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
      
      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative overflow-hidden py-20 lg:py-32">
          <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGRlZnM+PHBhdHRlcm4gaWQ9ImdyaWQiIHdpZHRoPSI2MCIgaGVpZ2h0PSI2MCIgcGF0dGVyblVuaXRzPSJ1c2VyU3BhY2VPblVzZSI+PHBhdGggZD0iTSAxMCAwIEwgMCAwIDAgMTAiIGZpbGw9Im5vbmUiIHN0cm9rZT0iIzAwMDAwMCIgc3Ryb2tlLW9wYWNpdHk9IjAuMDMiIHN0cm9rZS13aWR0aD0iMSIvPjwvcGF0dGVybj48L2RlZnM+PHJlY3Qgd2lkdGg9IjEwMCUiIGhlaWdodD0iMTAwJSIgZmlsbD0idXJsKCNncmlkKSIvPjwvc3ZnPg==')] opacity-40" />
          
          <div className="container mx-auto px-4 relative">
            <div className="max-w-4xl mx-auto text-center space-y-8">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Sparkles className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Free PDF Merging Tool</span>
              </div>
              
              <h1 className="text-4xl md:text-6xl font-bold tracking-tight">
                Merge PDFs with
                <span className="block mt-2 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
                  Precision & Ease
                </span>
              </h1>
              
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
                Select specific pages from multiple PDFs and combine them into a single document. 
                Fast, secure, and completely free.
              </p>
            </div>
          </div>
        </section>

        {/* Upload & Merge Section */}
        <section className="py-12 lg:py-20">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto space-y-8">
              <PDFUploader files={files} onFilesChange={setFiles} />

              {files.length > 0 && (
                <>
                  <div className="space-y-4">
                    <h2 className="text-2xl font-bold">Select Pages</h2>
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
                      className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg transition-all duration-300 hover:scale-105"
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

        {/* Features Section */}
        <section className="py-20 bg-muted/30">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12">Why Choose PDFMerge Pro?</h2>
              
              <div className="grid md:grid-cols-3 gap-8">
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    1
                  </div>
                  <h3 className="font-semibold text-lg">Page-Level Control</h3>
                  <p className="text-sm text-muted-foreground">
                    Select exactly which pages you want from each PDF document
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-secondary to-accent flex items-center justify-center text-primary-foreground font-bold text-xl">
                    2
                  </div>
                  <h3 className="font-semibold text-lg">Secure & Private</h3>
                  <p className="text-sm text-muted-foreground">
                    All processing happens in your browser. Your files never leave your device
                  </p>
                </div>
                
                <div className="text-center space-y-3">
                  <div className="w-12 h-12 mx-auto rounded-lg bg-gradient-to-br from-accent to-primary flex items-center justify-center text-primary-foreground font-bold text-xl">
                    3
                  </div>
                  <h3 className="font-semibold text-lg">Completely Free</h3>
                  <p className="text-sm text-muted-foreground">
                    No registration, no watermarks, and no hidden costs
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Index;
