
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { 
  AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend, BarChart, Bar 
} from 'recharts';
import { Badge } from '@/components/ui/badge';
import { Clock } from 'lucide-react';

const timelineData = [
  { time: '00:00', scans: 45 }, { time: '04:00', scans: 32 }, { time: '08:00', scans: 120 },
  { time: '12:00', scans: 254 }, { time: '16:00', scans: 380 }, { time: '20:00', scans: 210 },
  { time: '23:59', scans: 88 },
];

const deviceData = [
  { name: 'iOS', value: 55, color: '#10b981' },
  { name: 'Android', value: 35, color: '#3b82f6' },
  { name: 'Windows/MacOS', value: 10, color: '#6366f1' },
];

const geoData = [
  { city: 'New York', scans: 1240 }, { city: 'London', scans: 980 },
  { city: 'Tokyo', scans: 850 }, { city: 'Paris', scans: 620 },
  { city: 'Berlin', scans: 430 },
];

export default function ChartsContainer() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="glass lg:col-span-2">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="text-lg">Scan Velocity</CardTitle>
            <CardDescription>Real-time scans per hour across all active campaigns</CardDescription>
          </div>
          <Badge variant="outline" className="h-8 border-emerald-500/20 bg-emerald-500/10 text-emerald-500">
            <Clock className="w-3 h-3 mr-1" />
            Peak Time: 16:45
          </Badge>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#10b981" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="#10b981" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" vertical={false} />
              <XAxis dataKey="time" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
                itemStyle={{ color: '#10b981' }}
              />
              <Area type="monotone" dataKey="scans" stroke="#10b981" fillOpacity={1} fill="url(#colorScans)" strokeWidth={2} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">Device Distribution</CardTitle>
          <CardDescription>OS breakdown of scanning devices</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={deviceData}
                innerRadius={60}
                outerRadius={100}
                paddingAngle={5}
                dataKey="value"
              >
                {deviceData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              />
              <Legend verticalAlign="bottom" height={36}/>
            </PieChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="glass">
        <CardHeader>
          <CardTitle className="text-lg">Top Locations</CardTitle>
          <CardDescription>City-level scanning hotspots</CardDescription>
        </CardHeader>
        <CardContent className="h-[300px]">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={geoData} layout="vertical" margin={{ left: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff10" horizontal={false} />
              <XAxis type="number" hide />
              <YAxis dataKey="city" type="category" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
              <Tooltip 
                cursor={{ fill: '#ffffff05' }}
                contentStyle={{ backgroundColor: '#0f172a', border: '1px solid #1e293b', borderRadius: '12px' }}
              />
              <Bar dataKey="scans" fill="#10b981" radius={[0, 4, 4, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
