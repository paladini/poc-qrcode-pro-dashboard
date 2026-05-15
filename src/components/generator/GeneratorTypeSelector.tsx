
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { QRCodeType } from '@/src/types';
import { Globe, User, Wifi, FileText, AppWindow, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils';

interface GeneratorTypeSelectorProps {
  currentType: QRCodeType;
  onTypeChange: (type: QRCodeType) => void;
}

const types: { id: QRCodeType; icon: any; label: string; desc: string }[] = [
  { id: 'url', icon: Globe, label: 'Dynamic URL', desc: 'Editable destination' },
  { id: 'vcard', icon: User, label: 'vCard+', desc: 'Contact profile' },
  { id: 'wifi', icon: Wifi, label: 'Wi-Fi', desc: 'Auto-connect' },
  { id: 'pdf', icon: FileText, label: 'PDF Menu', desc: 'Digital catalogues' },
  { id: 'app', icon: AppWindow, label: 'Multi-link', desc: 'App store routing' },
  { id: 'ai', icon: Sparkles, label: 'AI Art', desc: 'Stable Diffusion' },
];

export default function GeneratorTypeSelector({ currentType, onTypeChange }: GeneratorTypeSelectorProps) {
  return (
    <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mb-8">
      {types.map((type) => {
        const Icon = type.icon;
        const isActive = currentType === type.id;
        return (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={cn(
              "flex flex-col items-start p-4 rounded-xl border transition-all text-left group overflow-hidden relative",
              isActive 
                ? "bg-emerald-500/10 border-emerald-500/40" 
                : "bg-white/5 border-white/5 hover:border-white/20 hover:bg-white/[0.07]"
            )}
          >
            {isActive && (
              <div className="absolute top-0 right-0 w-16 h-16 bg-emerald-500/10 blur-2xl rounded-full -mr-8 -mt-8" />
            )}
            <Icon className={cn("w-6 h-6 mb-3", isActive ? "text-emerald-500" : "text-muted-foreground")} />
            <span className={cn("font-semibold text-sm mb-1", isActive ? "text-emerald-400" : "text-foreground")}>
              {type.label}
            </span>
            <span className="text-xs text-muted-foreground leading-tight">
              {type.desc}
            </span>
          </button>
        );
      })}
    </div>
  );
}
