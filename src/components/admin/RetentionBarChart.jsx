"use client";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend, CartesianGrid } from 'recharts';
import Link from 'next/link';

export default function RetentionBarChart() {
  const data = [
    { name: 'Ene', Nuevos: 4000, Recurrentes: 2400 },
    { name: 'Feb', Nuevos: 3000, Recurrentes: 2800 },
    { name: 'Mar', Nuevos: 5000, Recurrentes: 3200 },
    { name: 'Abr', Nuevos: 2780, Recurrentes: 4500 },
  ];

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
         <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', fontFamily: 'var(--font-serif)' }}>Retención de Clientes</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Nuevos vs Recurrentes</p>
         </div>
         <Link href="/admin/reports/retention" style={{ color: '#0d47a1', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>Ver Detalle &rarr;</Link>
      </div>

      <div style={{ flex: 1, minHeight: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data} margin={{ top: 10, right: 0, left: -20, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#eee" />
            <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} dy={10} />
            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 12, fill: '#666' }} />
            <Tooltip cursor={{fill: '#f5f5f5'}} />
            <Legend verticalAlign="bottom" wrapperStyle={{ fontSize: '0.85rem', paddingTop: '10px' }} />
            <Bar dataKey="Nuevos" stackId="a" fill="#111" radius={[0, 0, 4, 4]} />
            <Bar dataKey="Recurrentes" stackId="a" fill="#b0b0b0" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
