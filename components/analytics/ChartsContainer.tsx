
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

export default function ChartsContainer({ showOnlyDevice, showOnlyLocations }: { showOnlyDevice?: boolean; showOnlyLocations?: boolean }) {
  if (showOnlyDevice) {
    return (
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={deviceData}
              innerRadius={70}
              outerRadius={100}
              paddingAngle={4}
              dataKey="value"
              stroke="none"
            >
              {[
                { name: 'iOS', value: 65, color: '#cc785c' },
                { name: 'Android', value: 35, color: '#141413' },
                { name: 'Desktop', value: 10, color: '#6c6a64' }
              ].map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{ backgroundColor: '#faf9f5', border: '1px solid #e6dfd8', borderRadius: '8px' }}
            />
            <Legend iconType="circle" verticalAlign="bottom" height={36} wrapperStyle={{ fontSize: '12px' }} />
          </PieChart>
        </ResponsiveContainer>
      </div>
    );
  }

  if (showOnlyLocations) {
    return (
      <div className="h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={geoData} layout="vertical" margin={{ left: 20 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#e6dfd8" horizontal={false} />
            <XAxis type="number" hide />
            <YAxis dataKey="city" type="category" stroke="#6c6a64" fontSize={11} tickLine={false} axisLine={false} />
            <Tooltip 
              cursor={{ fill: '#f5f0e8' }}
              contentStyle={{ backgroundColor: '#faf9f5', border: '1px solid #e6dfd8', borderRadius: '8px' }}
            />
            <Bar dataKey="scans" fill="#cc785c" radius={[0, 4, 4, 0]} barSize={24} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="bg-canvas border-hairline rounded-lg shadow-sm overflow-hidden">
        <CardHeader className="flex flex-row items-center justify-between border-b border-hairline bg-surface-soft/50 py-4">
          <div>
            <CardTitle className="text-base font-serif text-ink tracking-tight">Scan Velocity Mapping</CardTitle>
          </div>
          <span className="text-[10px] text-active-teal font-bold uppercase tracking-widest bg-active-teal/10 px-2 py-0.5 rounded">Real-time Pulse</span>
        </CardHeader>
        <CardContent className="h-[350px] pt-8">
          <ResponsiveContainer width="100%" height="100%">
            <AreaChart data={timelineData}>
              <defs>
                <linearGradient id="colorScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#cc785c" stopOpacity={0.2}/>
                  <stop offset="95%" stopColor="#cc785c" stopOpacity={0}/>
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="#e6dfd8" vertical={false} />
              <XAxis dataKey="time" stroke="#6c6a64" fontSize={11} tickLine={false} axisLine={false} dy={10} />
              <YAxis stroke="#6c6a64" fontSize={11} tickLine={false} axisLine={false} dx={-10} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#faf9f5', border: '1px solid #e6dfd8', borderRadius: '8px', boxShadow: '0 4px 12px rgba(20,20,19,0.05)' }}
                itemStyle={{ color: '#cc785c', fontWeight: 500 }}
              />
              <Area type="monotone" dataKey="scans" stroke="#cc785c" fillOpacity={1} fill="url(#colorScans)" strokeWidth={2.5} />
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
}
