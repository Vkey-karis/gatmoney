
import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend
} from 'recharts';

const data = [
  { month: 'Start', traditional: 0, gat: 0 },
  { month: 'Month 1', traditional: 200, gat: 800 },
  { month: 'Month 2', traditional: 450, gat: 1800 },
  { month: 'Month 3', traditional: 700, gat: 3200 },
  { month: 'Month 4', traditional: 950, gat: 5000 },
  { month: 'Month 5', traditional: 1200, gat: 7500 },
  { month: 'Month 6', traditional: 1500, gat: 12000 },
];

const EarningsChart: React.FC = () => {
  const isDark = document.documentElement.classList.contains('dark');
  
  return (
    <div className="w-full h-[300px] bg-white dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700 shadow-xl transition-colors">
      <h3 className="text-slate-900 dark:text-white font-black mb-6 text-center uppercase tracking-tighter text-lg">Earning Potential: Traditional vs. GAT</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke={isDark ? "#334155" : "#e2e8f0"} vertical={false} />
          <XAxis 
            dataKey="month" 
            stroke={isDark ? "#94a3b8" : "#64748b"} 
            tick={{fontSize: 10, fontWeight: 800}} 
            axisLine={false}
            tickLine={false}
          />
          <YAxis 
            stroke={isDark ? "#94a3b8" : "#64748b"} 
            tick={{fontSize: 10, fontWeight: 800}} 
            tickFormatter={(val) => `$${val}`} 
            axisLine={false}
            tickLine={false}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: isDark ? '#1e293b' : '#ffffff', 
              borderColor: isDark ? '#475569' : '#e2e8f0', 
              color: isDark ? '#f1f5f9' : '#0f172a',
              borderRadius: '12px',
              borderWidth: '2px',
              fontWeight: 'bold',
              boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)'
            }}
            itemStyle={{ color: isDark ? '#e2e8f0' : '#1e293b', fontWeight: 'bold' }}
          />
          <Legend wrapperStyle={{ paddingTop: '20px', fontWeight: '800', fontSize: '10px', textTransform: 'uppercase' }} />
          <Line type="monotone" dataKey="traditional" stroke={isDark ? "#475569" : "#94a3b8"} strokeWidth={3} name="Traditional" dot={false} strokeDasharray="5 5" />
          <Line type="monotone" dataKey="gat" stroke="#10b981" strokeWidth={4} name="GAT Strategy" activeDot={{ r: 8, strokeWidth: 0 }} dot={{ r: 4, strokeWidth: 0 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default EarningsChart;