import { useRef } from "react";
import { Upload, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

interface PDFFile {
  file: File;
  id: string;
}

interface PDFUploaderProps {
  files: PDFFile[];
  onFilesChange: (files: PDFFile[]) => void;
}

const PDFUploader = ({ files, onFilesChange }: PDFUploaderProps) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFiles = Array.from(e.target.files || []);
    const pdfFiles = selectedFiles.filter(file => file.type === "application/pdf");
    
    const newFiles: PDFFile[] = pdfFiles.map(file => ({
      file,
      id: Math.random().toString(36).substr(2, 9),
    }));
    
    onFilesChange([...files, ...newFiles]);
  };

  const removeFile = (id: string) => {
    onFilesChange(files.filter(f => f.id !== id));
  };

  return (
    <div className="space-y-4">
      <div
        onClick={() => fileInputRef.current?.click()}
        className="border-2 border-dashed border-border rounded-xl p-12 text-center cursor-pointer transition-all duration-300 hover:border-primary hover:bg-primary/5 group"
      >
        <input
          ref={fileInputRef}
          type="file"
          accept=".pdf"
          multiple
          onChange={handleFileSelect}
          className="hidden"
        />
        <Upload className="h-12 w-12 mx-auto mb-4 text-muted-foreground group-hover:text-primary transition-colors" />
        <p className="text-lg font-medium mb-2">Drop your PDF files here</p>
        <p className="text-sm text-muted-foreground">or click to browse</p>
      </div>

      {files.length > 0 && (
        <div className="space-y-2">
          {files.map((pdfFile) => (
            <Card key={pdfFile.id} className="p-4 flex items-center justify-between hover:shadow-md transition-shadow">
              <div className="flex items-center gap-3">
                <div className="rounded bg-primary/10 p-2">
                  <Upload className="h-4 w-4 text-primary" />
                </div>
                <div>
                  <p className="font-medium text-sm">{pdfFile.file.name}</p>
                  <p className="text-xs text-muted-foreground">
                    {(pdfFile.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={() => removeFile(pdfFile.id)}
                className="hover:bg-destructive/10 hover:text-destructive"
              >
                <X className="h-4 w-4" />
              </Button>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default PDFUploader;
