
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Key, Activity, Copy, RefreshCw, Terminal } from 'lucide-react';

const webhooks = [
  { id: '1', event: 'scan.detected', target: '/api/analytics', status: '200 OK', time: '12:45:02' },
  { id: '2', event: 'scan.detected', target: '/api/analytics', status: '200 OK', time: '12:44:59' },
  { id: '3', event: 'campaign.created', target: '/api/sync', status: '500 ERR', time: '12:40:12' },
];

export default function DeveloperSettings() {
  return (
    <div className="space-y-6">
      <Card className="glass">
        <CardHeader>
          <div className="flex items-center gap-2 mb-1">
            <Key className="w-4 h-4 text-emerald-500" />
            <CardTitle>API Credentials</CardTitle>
          </div>
          <CardDescription>Authentication for headless QR generation and tracking</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex gap-2">
            <Input 
              type="password" 
              readOnly 
              value="qr_live_51P88J200x9sFvY9k" 
              className="font-mono bg-slate-900 border-white/5 h-10"
            />
            <Button variant="outline" className="glass h-10 px-3">
              <Copy className="w-4 h-4" />
            </Button>
            <Button variant="outline" className="glass h-10 px-3">
              <RefreshCw className="w-4 h-4" />
            </Button>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-emerald-500/5 border border-emerald-500/10">
            <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-bold">Standard Usage Plan</span>
            <span className="text-[10px] text-emerald-400">12,450 / 50,000 requests left</span>
          </div>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <Activity className="w-4 h-4 text-emerald-500" />
              <CardTitle>Webhook Pipeline</CardTitle>
            </div>
            <CardDescription>Real-time delivery logs for scan events</CardDescription>
          </div>
          <Badge variant="outline" className="bg-emerald-500/10 text-emerald-500 border-emerald-500/20">
            Live Monitoring
          </Badge>
        </CardHeader>
        <CardContent>
          <div className="bg-slate-950 rounded-xl border border-white/5 overflow-hidden">
            <div className="flex items-center gap-2 px-4 py-2 bg-white/[0.03] border-b border-white/5">
              <Terminal className="w-3 h-3 text-muted-foreground" />
              <span className="text-[10px] uppercase font-mono text-muted-foreground">Log Stream</span>
            </div>
            <div className="divide-y divide-white/5 px-2">
              {webhooks.map((log) => (
                <div key={log.id} className="py-2 flex items-center justify-between text-[11px] font-mono px-2 hover:bg-white/[0.02]">
                  <div className="flex items-center gap-3">
                    <span className="text-muted-foreground">{log.time}</span>
                    <span className="text-emerald-400">{log.event}</span>
                    <span className="text-muted-foreground">→</span>
                    <span className="text-blue-400">{log.target}</span>
                  </div>
                  <span className={log.status.includes('ERR') ? 'text-red-400' : 'text-emerald-500'}>
                    {log.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
