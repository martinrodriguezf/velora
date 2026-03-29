"use client";

import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

export default function SalesChart() {
  // Datos simulados de los últimos 7 días con variaciones realistas
  const data = [
    { day: 'Lun', sales: 450, prevWeek: 310 },
    { day: 'Mar', sales: 820, prevWeek: 400 },
    { day: 'Mie', sales: 310, prevWeek: 300 },
    { day: 'Jue', sales: 600, prevWeek: 550 },
    { day: 'Vie', sales: 900, prevWeek: 850 },
    { day: 'Sab', sales: 1200, prevWeek: 1500 },
    { day: 'Dom', sales: 1050, prevWeek: 950 },
  ];

  const CustomTooltip = ({ active, payload, label }) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ background: 'white', padding: '1rem', border: '1px solid #ddd', borderRadius: '4px', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}>
          <p style={{ margin: '0 0 0.5rem 0', fontWeight: 'bold' }}>{label}</p>
          <p style={{ margin: 0, color: '#333' }}>Ventas: <strong>${payload[0].value}</strong></p>
          {payload[1] && <p style={{ margin: 0, color: '#999', fontSize: '0.85rem' }}>Semana Anterior: ${payload[1].value}</p>}
        </div>
      );
    }
    return null;
  };

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '0.5rem', fontFamily: 'var(--font-serif)' }}>Flujo de Facturación Dinámico</h3>
      <p style={{ color: '#666', fontSize: '0.85rem', marginBottom: '2rem' }}>Evolución interactiva de últimos 7 días frente a semana pasada.</p>

      <div style={{ flex: 1, width: '100%', minHeight: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{
              top: 10, right: 10, left: 0, bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="var(--color-foreground)" stopOpacity={0.4}/>
                <stop offset="95%" stopColor="var(--color-foreground)" stopOpacity={0}/>
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="day" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} tickFormatter={(value) => `$${value}`} />
            <Tooltip content={<CustomTooltip />} />
            <Area type="monotone" dataKey="sales" stroke="var(--color-foreground)" strokeWidth={3} fillOpacity={1} fill="url(#colorSales)" activeDot={{ r: 6 }} />
            <Area type="monotone" dataKey="prevWeek" stroke="#ccc" strokeDasharray="5 5" fill="none" />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
