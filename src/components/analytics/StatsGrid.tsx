
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Users, MousePointer2, Clock, BarChart3, TrendingUp, TrendingDown } from 'lucide-react';

interface Stat {
  label: string;
  value: string;
  change: string;
  trend: 'up' | 'down';
  icon: any;
}

const stats: Stat[] = [
  { label: 'Total Scans', value: '12,543', change: '+12.5%', trend: 'up', icon: BarChart3 },
  { label: 'Unique Visitors', value: '8,211', change: '+18.2%', trend: 'up', icon: Users },
  { label: 'Avg. Time to Scan', value: '4.2s', change: '-2.1%', trend: 'up', icon: Clock },
  { label: 'Conversion Rate', value: '24.2%', change: '-0.8%', trend: 'down', icon: MousePointer2 },
];

export default function StatsGrid() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
      {stats.map((stat) => (
        <Card key={stat.label} className="glass group hover:border-emerald-500/20 transition-all">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-medium text-muted-foreground uppercase tracking-widest">
              {stat.label}
            </CardTitle>
            <div className="p-2 rounded-lg bg-emerald-500/10 text-emerald-500 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
              <stat.icon className="w-4 h-4" />
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold mb-1">{stat.value}</div>
            <div className="flex items-center gap-1.5">
              {stat.trend === 'up' ? (
                <div className="flex items-center text-xs text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">
                  <TrendingUp className="w-3 h-3 mr-1" />
                  {stat.change}
                </div>
              ) : (
                <div className="flex items-center text-xs text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">
                  <TrendingDown className="w-3 h-3 mr-1" />
                  {stat.change}
                </div>
              )}
              <span className="text-[10px] text-muted-foreground">from last period</span>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
