
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
        <Card key={stat.label} className="bg-canvas border-hairline group hover:border-primary/40 transition-all rounded-lg shadow-sm">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-[11px] font-bold text-muted uppercase tracking-[0.1em]">
              {stat.label}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-3xl font-serif text-ink mb-1">{stat.value}</div>
            <div className="flex items-center gap-1.5">
              {stat.trend === 'up' ? (
                <div className="text-[11px] text-active-teal font-medium">
                  {stat.change} vs last week
                </div>
              ) : (
                <div className="text-[11px] text-destructive font-medium">
                  {stat.change} vs last week
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
}
