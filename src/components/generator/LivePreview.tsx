
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Smartphone, ShieldCheck, Download, Share2, Scan } from 'lucide-react';
import { QRConfig } from '@/src/types';
import { motion, AnimatePresence } from 'motion/react';

interface LivePreviewProps {
  config: QRConfig;
}

export default function LivePreview({ config }: LivePreviewProps) {
  const [safetyScore, setSafetyScore] = useState(98);
  const [isScanning, setIsScanning] = useState(false);

  // Simple heuristic for safety score
  useEffect(() => {
    let score = 100;
    if (config.design.dots === 'dots') score -= 5;
    if (config.design.gradient) score -= 10;
    if (config.design.logo) score -= 8;
    setSafetyScore(Math.max(score, 65));
  }, [config]);

  const qrData = typeof config.data === 'string' ? config.data : JSON.stringify(config.data);

  return (
    <Card className="sticky top-6 glass border-emerald-500/20 shadow-emerald-500/5">
      <CardHeader className="flex flex-row items-center justify-between pb-2">
        <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
          Live Preview
        </CardTitle>
        <Badge variant={safetyScore > 85 ? 'default' : 'outline'} className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
          <ShieldCheck className="w-3 h-3 mr-1" />
          {safetyScore}% Scannable
        </Badge>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-6 py-8">
        <div className="relative group">
          <div className="absolute -inset-4 bg-emerald-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity rounded-full px-20"></div>
          
          <motion.div 
            layout
            className="p-4 bg-white rounded-2xl shadow-2xl relative z-10"
          >
            <QRCodeSVG
              value={qrData}
              size={240}
              level="H"
              includeMargin={true}
              imageSettings={config.design.logo ? {
                src: config.design.logo,
                x: undefined,
                y: undefined,
                height: 48,
                width: 48,
                excavate: true,
              } : undefined}
              fgColor={config.design.color}
            />
            
            <AnimatePresence>
              {isScanning && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-emerald-500/10 backdrop-blur-[2px] flex items-center justify-center rounded-2xl border-2 border-emerald-500 border-dashed"
                >
                  <motion.div 
                    animate={{ y: [-40, 40] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-full h-0.5 bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.8)]"
                  />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white/10 p-2 rounded-full backdrop-blur-md">
                    <Scan className="w-8 h-8 text-emerald-500 animate-pulse" />
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="grid grid-cols-2 gap-3 w-full">
          <Button 
            variant="outline" 
            className="w-full h-12 glass border-white/5 hover:bg-emerald-500/10 transition-all group"
            onClick={() => {
              setIsScanning(true);
              setTimeout(() => setIsScanning(false), 3000);
            }}
          >
            <Smartphone className="w-4 h-4 mr-2 group-hover:scale-110 transition-transform" />
            Scan to Test
          </Button>
          <Button className="w-full h-12 bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold group">
            <Download className="w-4 h-4 mr-2 group-hover:translate-y-0.5 transition-transform" />
            Download
          </Button>
        </div>

        <div className="flex items-center justify-between w-full text-xs text-muted-foreground border-t border-white/5 pt-4">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
            Dynamic tracking active
          </div>
          <Button variant="ghost" size="sm" className="h-6 px-2 text-xs">
            <Share2 className="w-3 h-3 mr-1" />
            Share
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
