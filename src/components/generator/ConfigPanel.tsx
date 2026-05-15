
import { QRConfig, QRCodeType } from '@/src/types';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Palette, Layers, Image as ImageIcon, CheckCircle2 } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import { Switch } from '@/components/ui/switch';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface ConfigPanelProps {
  config: QRConfig;
  setConfig: (config: QRConfig) => void;
}

export default function ConfigPanel({ config, setConfig }: ConfigPanelProps) {
  const updateData = (newData: any) => {
    setConfig({ ...config, data: { ...config.data, ...newData } });
  };

  const updateDesign = (newDesign: any) => {
    setConfig({ ...config, design: { ...config.design, ...newDesign } });
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-left-4 duration-500">
      {/* Dynamic Form based on Type */}
      <section className="space-y-4 bg-white/5 p-6 rounded-2xl border border-white/5">
        <h3 className="text-lg font-semibold flex items-center gap-2">
          {config.type === 'url' && 'Destination URL'}
          {config.type === 'vcard' && 'vCard Details'}
          {config.type === 'wifi' && 'Network Info'}
          {config.type === 'pdf' && 'PDF Mapping'}
          {config.type === 'app' && 'Multi-destination'}
          {config.type === 'ai' && 'Prompt-to-QR'}
        </h3>

        <div className="grid gap-4">
          {config.type === 'url' && (
            <div className="space-y-2">
              <Label>Redirect URL</Label>
              <Input 
                className="h-12 bg-slate-900 border-emerald-500/10 focus:border-emerald-500 transition-colors"
                placeholder="https://example.com/campaign" 
                value={config.data.url || ''}
                onChange={(e) => updateData({ url: e.target.value })}
              />
            </div>
          )}

          {config.type === 'vcard' && (
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label>Full Name</Label>
                <Input placeholder="John Doe" onChange={(e) => updateData({ name: e.target.value })} />
              </div>
              <div className="space-y-2">
                <Label>Work Email</Label>
                <Input placeholder="john@acme.com" onChange={(e) => updateData({ email: e.target.value })} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Phone Number</Label>
                <Input placeholder="+1 (555) 000-0000" onChange={(e) => updateData({ tel: e.target.value })} />
              </div>
              <div className="space-y-2 col-span-2">
                <Label>Social Links (comma separated)</Label>
                <Input placeholder="LinkedIn, Twitter, Github" onChange={(e) => updateData({ socials: e.target.value })} />
              </div>
            </div>
          )}

          {config.type === 'ai' && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Base Prompt</Label>
                <Input placeholder="Cyberpunk landscape with neon trees" onChange={(e) => updateData({ prompt: e.target.value })} />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-white/5 bg-slate-900">
                <div className="space-y-0.5">
                  <Label>Diffusion Strength</Label>
                  <p className="text-[10px] text-muted-foreground uppercase tracking-widest">Balances readability vs aesthetics</p>
                </div>
                <Select defaultValue="balanced">
                  <SelectTrigger className="w-[120px] h-8 text-xs bg-slate-800">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="low">Readable</SelectItem>
                    <SelectItem value="balanced">Balanced</SelectItem>
                    <SelectItem value="high">Artistic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Customization Accordion */}
      <section>
        <Accordion type="single" collapsible className="w-full space-y-4">
          <AccordionItem value="design" className="glass px-6 rounded-2xl border-white/5 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <Palette className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Design & Color</p>
                  <p className="text-xs text-muted-foreground underline-offset-4 group-hover:underline">Gradients, Dots, Corner styles</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 space-y-6 pt-2">
              <div className="grid grid-cols-2 gap-6">
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground uppercase tracking-widest">Dot Style</Label>
                  <div className="grid grid-cols-2 gap-2">
                    {['square', 'rounded', 'dots', 'classy'].map((style) => (
                      <button 
                        key={style}
                        onClick={() => updateDesign({ dots: style as any })}
                        className={cn(
                          "px-3 py-2 rounded-lg border text-xs capitalize transition-all",
                          config.design.dots === style ? "bg-emerald-500 border-emerald-500 text-slate-950 font-bold" : "bg-white/5 border-white/10 hover:border-white/20"
                        )}
                      >
                        {style}
                      </button>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <Label className="text-xs text-muted-foreground uppercase tracking-widest">Corner Style</Label>
                  <div className="grid grid-cols-1 gap-2">
                    {['square', 'rounded', 'extra-rounded'].map((style) => (
                      <button 
                        key={style}
                        onClick={() => updateDesign({ corners: style as any })}
                        className={cn(
                          "px-3 py-2 rounded-lg border text-xs capitalize transition-all flex items-center justify-between",
                          config.design.corners === style ? "bg-emerald-500 border-emerald-500 text-slate-950 font-bold" : "bg-white/5 border-white/10 hover:border-white/20"
                        )}
                      >
                        {style}
                        {config.design.corners === style && <CheckCircle2 className="w-3 h-3" />}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
              
              <div className="space-y-3">
                <Label className="text-xs text-muted-foreground uppercase tracking-widest">Foreground Color</Label>
                <div className="flex items-center gap-4">
                  <Input 
                    type="color" 
                    className="w-12 h-12 p-1 bg-transparent border-0 cursor-pointer" 
                    value={config.design.color} 
                    onChange={(e) => updateDesign({ color: e.target.value })}
                  />
                  <Input 
                    className="flex-1 bg-slate-900 border-white/10 h-12 font-mono text-sm" 
                    value={config.design.color}
                    onChange={(e) => updateDesign({ color: e.target.value })}
                  />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          <AccordionItem value="branding" className="glass px-6 rounded-2xl border-white/5 overflow-hidden">
            <AccordionTrigger className="hover:no-underline py-6 group">
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </div>
                <div className="text-left">
                  <p className="font-semibold text-sm">Logo & Branding</p>
                  <p className="text-xs text-muted-foreground underline-offset-4 group-hover:underline">Center logo, Auto-background removal</p>
                </div>
              </div>
            </AccordionTrigger>
            <AccordionContent className="pb-8 space-y-6 pt-2">
              <div className="space-y-4">
                <div className="flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-xl p-8 bg-white/5 hover:border-emerald-500/40 transition-colors cursor-pointer group">
                  <ImageIcon className="w-8 h-8 text-muted-foreground group-hover:text-emerald-500 mb-2" />
                  <p className="text-sm font-medium">Click to upload logo</p>
                  <p className="text-[10px] text-muted-foreground">PNG, SVG or WEBP (Max 2MB)</p>
                </div>

                <div className="flex items-center justify-between p-4 rounded-xl glass-emerald border-emerald-500/20">
                  <div className="space-y-0.5">
                    <Label className="text-xs font-semibold">AI Bg Removal</Label>
                    <p className="text-[10px] text-emerald-400">Perfect for non-transparent logos</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
      </section>
    </div>
  );
}

import { cn } from '@/lib/utils';
