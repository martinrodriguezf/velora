"use client";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend } from 'recharts';
import Link from 'next/link';

export default function CategoryPieChart() {
  const data = [
    { name: 'Sastrería', value: 4500 },
    { name: 'Pantalones', value: 2500 },
    { name: 'Remeras', value: 1500 },
    { name: 'Abrigos', value: 3200 },
  ];
  const COLORS = ['#111111', '#555555', '#888888', '#cccccc'];

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', height: '100%', display: 'flex', flexDirection: 'column' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
         <div>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.2rem', fontFamily: 'var(--font-serif)' }}>Ventas por Categoría</h3>
            <p style={{ color: '#666', fontSize: '0.85rem', margin: 0 }}>Distribución de ingresos</p>
         </div>
         <Link href="/admin/reports/categories" style={{ color: '#0d47a1', fontSize: '0.85rem', textDecoration: 'none', fontWeight: 500 }}>Ver Detalle &rarr;</Link>
      </div>
      
      <div style={{ flex: 1, minHeight: '220px' }}>
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={data}
              innerRadius={60}
              outerRadius={80}
              paddingAngle={5}
              dataKey="value"
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip formatter={(value) => `$${value}`} />
            <Legend verticalAlign="bottom" height={36} iconType="circle" wrapperStyle={{ fontSize: '0.85rem' }}/>
          </PieChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
