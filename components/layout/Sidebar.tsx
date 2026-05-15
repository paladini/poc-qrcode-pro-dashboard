
import { cn } from '@/lib/utils';
import { 
  LayoutDashboard, QrCode, BarChart3, Settings, 
  Layers, Zap, CreditCard, ChevronRight, LogOut 
} from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

const menuItems = [
  { id: 'generator', label: 'QR Generator', icon: QrCode, desc: 'Design & Build' },
  { id: 'analytics', label: 'Analytics', icon: BarChart3, desc: 'Track Performance' },
  { id: 'management', label: 'Management', icon: Layers, desc: 'Bulk & Workspace' },
  { id: 'developers', label: 'Developers', icon: Zap, desc: 'API & Webhooks' },
];

const secondaryItems = [
  { id: 'billing', label: 'Subscription', icon: CreditCard },
  { id: 'settings', label: 'System Settings', icon: Settings },
];

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  return (
    <aside className="w-64 border-r border-hairline h-screen sticky top-0 flex flex-col bg-surface-soft z-40 transition-all duration-300 overflow-hidden">
      <div className="p-8 flex-1 flex flex-col">
        {/* Simplified Sidebar Header */}
        <div className="flex items-center gap-3 mb-12">
          <div className="h-6 w-px bg-primary" />
          <p className="text-[10px] font-bold text-muted uppercase tracking-[0.3em] font-sans">Workspace</p>
        </div>

        <nav className="space-y-8 flex-1">
          <div className="space-y-2">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 px-2 font-sans">Core System</p>
            {menuItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={cn(
                    "w-full flex items-center gap-3 py-2 px-3 rounded-md transition-all group relative",
                    isActive 
                      ? "bg-surface-card text-ink claude-shadow border border-hairline" 
                      : "text-muted hover:text-ink hover:bg-canvas"
                  )}
                >
                  <Icon className={cn("w-4 h-4 transition-colors", isActive ? "text-primary" : "text-muted group-hover:text-body")} />
                  <span className="text-[13px] font-medium font-sans">{item.label}</span>
                  {isActive && (
                    <div className="absolute left-0 w-1 h-4 bg-primary rounded-full transition-all" />
                  )}
                </button>
              );
            })}
          </div>

          <div className="space-y-2">
            <p className="text-[10px] font-bold text-muted uppercase tracking-widest mb-4 px-2 font-sans">Account Control</p>
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                className="w-full flex items-center gap-3 py-2 px-3 rounded-md text-muted hover:text-ink hover:bg-canvas transition-all text-[13px] font-medium group"
              >
                <item.icon className="w-4 h-4 transition-colors group-hover:text-body" />
                <span className="font-sans">{item.label}</span>
              </button>
            ))}
          </div>
        </nav>
      </div>

      <div className="p-6 border-t border-hairline bg-surface-cream-strong">
        <div className="flex items-center gap-3 px-2">
          <div className="w-8 h-8 rounded-full bg-surface-card border border-hairline flex items-center justify-center overflow-hidden">
             <div className="w-full h-full bg-gradient-to-br from-primary/10 to-primary/30" />
          </div>
          <div className="flex-1 overflow-hidden">
            <p className="text-[12px] font-medium text-ink truncate font-sans">Alex Henderson</p>
            <p className="text-[9px] text-primary uppercase font-bold tracking-tight font-sans">Pro Tier Member</p>
          </div>
          <LogOut className="w-4 h-4 text-muted hover:text-destructive cursor-pointer transition-colors" />
        </div>
      </div>
    </aside>
  );
}
