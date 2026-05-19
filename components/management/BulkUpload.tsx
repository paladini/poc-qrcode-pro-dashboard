
import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Upload, FileSpreadsheet, CheckCircle2, Loader2, AlertCircle } from 'lucide-react';
import { Progress } from "@/components/ui/progress";

export default function BulkUpload() {
  const [isUploading, setIsUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<'idle' | 'processing' | 'completed'>('idle');

  const startUpload = () => {
    setIsUploading(true);
    setStatus('processing');
    let p = 0;
    const interval = setInterval(() => {
      p += 5;
      setProgress(p);
      if (p >= 100) {
        clearInterval(interval);
        setStatus('completed');
        setIsUploading(false);
      }
    }, 150);
  };

  return (
    <Card className="glass border-dashed border-emerald-500/20 mb-8">
      <CardHeader className="text-center">
        <div className="mx-auto w-12 h-12 rounded-full bg-emerald-500/10 flex items-center justify-center mb-4">
          <FileSpreadsheet className="w-6 h-6 text-emerald-500" />
        </div>
        <CardTitle>Bulk Code Generation</CardTitle>
        <CardDescription>Upload CSV/Excel to generate up to 5,000 QRs at once</CardDescription>
      </CardHeader>
      <CardContent>
        {status === 'idle' && (
          <div 
            className="border-2 border-dashed border-white/5 bg-white/[0.02] rounded-2xl p-12 text-center hover:border-emerald-500/40 transition-all cursor-pointer group"
            onClick={startUpload}
          >
            <Upload className="w-10 h-10 text-muted-foreground group-hover:text-emerald-500 mx-auto mb-4 transition-transform group-hover:-translate-y-1" />
            <p className="text-sm font-medium mb-1">Drag & drop your file or <span className="text-emerald-500">browse</span></p>
            <p className="text-xs text-muted-foreground">Supported: .csv, .xlsx (Max 5MB)</p>
          </div>
        )}

        {status === 'processing' && (
          <div className="space-y-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="flex items-center gap-2">
                <Loader2 className="w-4 h-4 animate-spin text-emerald-500" />
                Parsing datasheet...
              </span>
              <span className="font-mono">{progress}%</span>
            </div>
            <Progress value={progress} className="h-2 bg-white/5" />
            <div className="flex gap-4 p-4 rounded-xl bg-blue-500/5 border border-blue-500/10">
              <AlertCircle className="w-5 h-5 text-blue-400 shrink-0" />
              <p className="text-xs text-blue-100/70 leading-relaxed">
                Found 1,240 valid URLs. Generating dynamic tracking IDs for each.
              </p>
            </div>
          </div>
        )}

        {status === 'completed' && (
          <div className="space-y-6 py-6 text-center animate-in zoom-in-95 duration-500">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 flex items-center justify-center mx-auto mb-4 border border-emerald-500/30">
              <CheckCircle2 className="w-8 h-8 text-emerald-500" />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg text-emerald-400">Generation Complete!</h4>
              <p className="text-sm text-muted-foreground">1,240 unique codes added to workspace.</p>
            </div>
            <div className="flex gap-3 justify-center">
              <Button variant="outline" className="glass h-10 px-6" onClick={() => setStatus('idle')}>Upload Another</Button>
              <Button className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 h-10 px-6">View Folders</Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
