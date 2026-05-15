
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
    <aside className="w-72 border-r border-white/5 h-screen sticky top-0 flex flex-col bg-slate-950/50 backdrop-blur-3xl z-40">
      <div className="p-8">
        <div className="flex items-center gap-3 mb-10 group cursor-pointer">
          <div className="w-10 h-10 rounded-xl bg-emerald-500 flex items-center justify-center shadow-[0_0_20px_rgba(16,185,129,0.4)] group-hover:scale-105 transition-transform duration-300">
            <QrCode className="text-slate-950 w-6 h-6" strokeWidth={3} />
          </div>
          <div>
            <h1 className="text-xl font-black tracking-tighter">QR<span className="text-emerald-500">PRO</span></h1>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-bold">Enterprise SaaS</p>
          </div>
        </div>

        <nav className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={cn(
                  "w-full flex items-center gap-3 p-3 rounded-xl transition-all group relative",
                  isActive 
                    ? "bg-emerald-500/10 text-emerald-400" 
                    : "text-muted-foreground hover:bg-white/5 hover:text-white"
                )}
              >
                {isActive && (
                  <div className="absolute left-0 w-1 h-6 bg-emerald-500 rounded-full" />
                )}
                <Icon className={cn("w-5 h-5", isActive && "text-emerald-500")} />
                <div className="text-left">
                  <p className="text-sm font-semibold">{item.label}</p>
                  <p className="text-[10px] opacity-60 font-medium group-hover:opacity-100 transition-opacity">
                    {item.desc}
                  </p>
                </div>
                <ChevronRight className={cn(
                  "w-4 h-4 ml-auto opacity-0 group-hover:opacity-40 transition-opacity",
                  isActive && "opacity-100"
                )} />
              </button>
            );
          })}
        </nav>
      </div>

      <div className="mt-auto p-6 space-y-4">
        <div className="space-y-1">
          {secondaryItems.map((item) => (
            <button
              key={item.id}
              className="w-full flex items-center gap-3 p-2 rounded-lg text-muted-foreground hover:bg-white/5 transition-all text-xs font-semibold"
            >
              <item.icon className="w-4 h-4" />
              {item.label}
            </button>
          ))}
        </div>

        <div className="p-4 rounded-xl bg-white/[0.03] border border-white/5 flex items-center gap-3">
          <div className="w-8 h-8 rounded-full bg-slate-800 border border-white/10" />
          <div className="flex-1 overflow-hidden">
            <p className="text-[11px] font-bold truncate">Alex Henderson</p>
            <p className="text-[9px] text-muted-foreground uppercase tracking-widest font-black">Pro Tier</p>
          </div>
          <LogOut className="w-4 h-4 text-muted-foreground hover:text-red-400 cursor-pointer transition-colors" />
        </div>
      </div>
    </aside>
  );
}
