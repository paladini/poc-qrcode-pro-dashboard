
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
    <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      {types.map((type) => {
        const Icon = type.icon;
        const isActive = currentType === type.id;
        return (
          <button
            key={type.id}
            onClick={() => onTypeChange(type.id)}
            className={cn(
              "flex flex-col items-center justify-center p-6 rounded-lg border transition-all text-center group",
              isActive 
                ? "bg-surface-card border-primary text-ink claude-shadow" 
                : "bg-canvas border-hairline text-muted hover:border-body hover:text-ink hover:bg-surface-soft"
            )}
          >
            <div className={cn(
              "mb-3 p-2.5 rounded-sm transition-colors",
              isActive ? "bg-primary/10 text-primary" : "bg-surface-soft text-muted group-hover:text-ink"
            )}>
              <Icon className="w-5 h-5 translate-y-[0.5px]" />
            </div>
            <span className="text-[11px] font-bold uppercase tracking-[0.15em] mb-1 leading-none">{itemLabel(type.label)}</span>
            <span className="text-[9px] font-medium opacity-60 line-clamp-1">{type.desc}</span>
          </button>
        );
      })}
    </div>
  );
}

function itemLabel(label: string) {
  return label.replace('+', '').split(' ')[0];
}
