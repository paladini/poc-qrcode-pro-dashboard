
import { 
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow 
} from '@/components/ui/card'; // Wait, Table needs its own file from shadcn
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { MoreHorizontal, Folder, ExternalLink, QrCode } from 'lucide-react';
import { 
  DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';

const campaigns = [
  { id: '1', name: 'Summer Sale 2024', folder: 'Marketing', scans: 4520, status: 'active', date: '2024-05-10' },
  { id: '2', name: 'Product Launch v2', folder: 'Sales', scans: 1240, status: 'active', date: '2024-05-12' },
  { id: '3', name: 'Event Registration', folder: 'Events', scans: 890, status: 'paused', date: '2024-04-28' },
];

export default function CampaignList() {
  return (
    <div className="glass rounded-2xl overflow-hidden border border-white/5">
      <div className="p-6 border-b border-white/5 flex items-center justify-between">
        <div>
          <h3 className="text-lg font-bold">Workspace & Folders</h3>
          <p className="text-xs text-muted-foreground uppercase tracking-widest mt-1">Organize and manage active campaigns</p>
        </div>
        <Button size="sm" variant="outline" className="h-8 border-emerald-500/20 text-emerald-500 hover:bg-emerald-500/10">
          <Folder className="w-4 h-4 mr-2" />
          New Folder
        </Button>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-white/5 bg-white/[0.02]">
              <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase">Campaign</th>
              <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase text-center">Folder</th>
              <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase text-center">Total Scans</th>
              <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase text-center">Status</th>
              <th className="px-6 py-4 text-xs font-semibold text-muted-foreground uppercase text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {campaigns.map((c) => (
              <tr key={c.id} className="hover:bg-white/[0.02] transition-colors group">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                      <QrCode className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm">{c.name}</p>
                      <p className="text-[10px] text-muted-foreground">{c.date}</p>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 text-center">
                  <Badge variant="outline" className="bg-white/5 border-white/10">{c.folder}</Badge>
                </td>
                <td className="px-6 py-4 text-center font-mono text-sm">{c.scans.toLocaleString()}</td>
                <td className="px-6 py-4 text-center">
                  {c.status === 'active' ? (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-emerald-500">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                      Active
                    </div>
                  ) : (
                    <div className="flex items-center justify-center gap-1.5 text-xs text-muted-foreground">
                      <span className="w-1.5 h-1.5 rounded-full bg-muted-foreground" />
                      Paused
                    </div>
                  )}
                </td>
                <td className="px-6 py-4 text-right">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button variant="ghost" size="icon" className="h-8 w-8 hover:bg-white/5">
                        <MoreHorizontal className="w-4 h-4" />
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-white">
                      <DropdownMenuItem className="focus:bg-emerald-500 focus:text-slate-950 cursor-pointer">
                        <ExternalLink className="w-4 h-4 mr-2" /> View Public Page
                      </DropdownMenuItem>
                      <DropdownMenuItem className="focus:bg-emerald-500 focus:text-slate-950 cursor-pointer">
                        <Folder className="w-4 h-4 mr-2" /> Move to Folder
                      </DropdownMenuItem>
                      <DropdownMenuItem className="text-red-400 focus:bg-red-500 focus:text-white cursor-pointer">
                        Archive Campaign
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
