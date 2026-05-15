
import { useState, useEffect } from 'react';
import { QRCodeSVG } from 'qrcode.react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Scan } from 'lucide-react';
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
    <Card className="sticky top-6 bg-canvas border-hairline rounded-xl claude-shadow overflow-hidden">
      <CardHeader className="flex flex-row items-center justify-between border-b border-hairline bg-surface-soft/30 py-4">
        <CardTitle className="text-[11px] font-bold text-muted uppercase tracking-[0.15em]">
          Interface Preview
        </CardTitle>
        <div className="flex items-center gap-2">
          <span className="bg-primary/10 text-primary text-[10px] font-bold px-2 py-0.5 rounded border border-primary/10 uppercase tracking-wider">
            {safetyScore}% Optimal scannability
          </span>
        </div>
      </CardHeader>
      <CardContent className="flex flex-col items-center gap-8 py-12 px-8">
        <div className="relative group">
          <motion.div 
            layout
            className="p-8 bg-white rounded-2xl shadow-xl relative z-10 border border-hairline"
          >
            <div className="absolute top-0 left-0 w-8 h-8 border-t-4 border-l-4 border-primary rounded-tl-xl -m-0.5" />
            <div className="absolute top-0 right-0 w-8 h-8 border-t-4 border-r-4 border-primary rounded-tr-xl -m-0.5" />
            <div className="absolute bottom-0 left-0 w-8 h-8 border-b-4 border-l-4 border-primary rounded-bl-xl -m-0.5" />
            <div className="absolute bottom-0 right-0 w-8 h-8 border-b-4 border-r-4 border-primary rounded-br-xl -m-0.5" />
            
            <QRCodeSVG
              value={qrData}
              size={180}
              level="H"
              includeMargin={false}
              fgColor={config.design.color}
              bgColor="#ffffff"
            />
            
            <AnimatePresence>
              {isScanning && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  className="absolute inset-0 bg-primary/5 backdrop-blur-[1px] flex items-center justify-center rounded-2xl border-2 border-primary border-dashed"
                >
                  <motion.div 
                    animate={{ y: [-40, 40] }}
                    transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                    className="w-full h-0.5 bg-primary shadow-[0_0_15px_rgba(204,120,92,0.8)]"
                  />
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>

        <div className="w-full space-y-4">
          <div className="bg-surface-soft p-4 rounded-md border border-hairline">
             <p className="text-[12px] text-body font-medium italic text-center">
               "Scanning this artifact will resolve to the designated digital endpoint."
             </p>
          </div>
          
          <div className="grid grid-cols-2 gap-3 w-full">
            <Button 
              variant="outline" 
              className="w-full h-10 border-hairline bg-canvas hover:bg-surface-card text-[13px] font-medium transition-all"
              onClick={() => {
                setIsScanning(true);
                setTimeout(() => setIsScanning(false), 3000);
              }}
            >
              Verify Code
            </Button>
            <Button className="w-full h-10 bg-primary hover:bg-primary-active text-white text-[13px] font-medium border-none shadow-sm">
              Deploy
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
