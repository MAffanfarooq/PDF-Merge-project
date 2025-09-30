import { useState, useEffect } from "react";
import { PDFDocument } from "pdf-lib";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FileText } from "lucide-react";

interface PageSelectorProps {
  file: File;
  fileName: string;
  onPagesChange: (pages: number[]) => void;
}

const PageSelector = ({ file, fileName, onPagesChange }: PageSelectorProps) => {
  const [totalPages, setTotalPages] = useState(0);
  const [selectedPages, setSelectedPages] = useState("");

  useEffect(() => {
    const loadPDF = async () => {
      const arrayBuffer = await file.arrayBuffer();
      const pdf = await PDFDocument.load(arrayBuffer);
      setTotalPages(pdf.getPageCount());
    };
    loadPDF();
  }, [file]);

  const handlePagesChange = (value: string) => {
    setSelectedPages(value);
    
    // Parse page ranges like "1-3, 5, 7-9"
    const pages: number[] = [];
    const parts = value.split(",").map(p => p.trim());
    
    for (const part of parts) {
      if (part.includes("-")) {
        const [start, end] = part.split("-").map(n => parseInt(n.trim()));
        if (start && end && start <= end && start > 0 && end <= totalPages) {
          for (let i = start; i <= end; i++) {
            if (!pages.includes(i)) pages.push(i);
          }
        }
      } else {
        const page = parseInt(part);
        if (page && page > 0 && page <= totalPages && !pages.includes(page)) {
          pages.push(page);
        }
      }
    }
    
    onPagesChange(pages.sort((a, b) => a - b));
  };

  return (
    <Card className="p-4 space-y-3">
      <div className="flex items-center gap-3">
        <div className="rounded bg-secondary/10 p-2">
          <FileText className="h-4 w-4 text-secondary" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium text-sm truncate">{fileName}</p>
          <p className="text-xs text-muted-foreground">{totalPages} pages</p>
        </div>
      </div>
      
      <div className="space-y-2">
        <Label htmlFor={`pages-${fileName}`} className="text-sm">
          Select Pages
        </Label>
        <Input
          id={`pages-${fileName}`}
          placeholder="e.g., 1-3, 5, 7-9"
          value={selectedPages}
          onChange={(e) => handlePagesChange(e.target.value)}
          className="text-sm"
        />
        <p className="text-xs text-muted-foreground">
          Enter page numbers or ranges separated by commas
        </p>
      </div>
    </Card>
  );
};

export default PageSelector;
