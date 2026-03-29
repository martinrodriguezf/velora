"use client";
import { LineChart, Line, ResponsiveContainer, Tooltip } from 'recharts';
import Link from 'next/link';

export default function RegistrationsChart({ total }) {
  const data = [
    { day: 'Semana 1', value: 10 },
    { day: 'Semana 2', value: 30 },
    { day: 'Semana 3', value: 25 },
    { day: 'Semana 4', value: 55 },
  ];

  return (
    <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', position: 'relative'}}>
       <Link href="/admin/reports/registrations" style={{position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '0.8rem', color: '#0d47a1', textDecoration: 'none', fontWeight: 500, padding: '0.2rem 0.6rem', border: '1px solid #bbdefb', borderRadius: '12px', background: '#e3f2fd'}}>
         Ver Reporte &rarr;
       </Link>
       <h3 style={{fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Nuevos Registros</h3>
       <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)', marginBottom: '1rem'}}>
          {total} 
          <span style={{fontSize: '0.9rem', color: '#4caf50', fontWeight: 'normal', marginLeft: '0.5rem'}}>+15% mensual</span>
       </p>
       
       <div style={{height: '60px', width: '100%'}}>
         <ResponsiveContainer width="100%" height="100%">
           <LineChart data={data}>
              <Tooltip formatter={(val) => [val, 'Usuarios']} labelStyle={{display:'none'}} cursor={{ stroke: '#eee', strokeWidth: 1 }} />
              <Line type="monotone" dataKey="value" stroke="var(--color-foreground)" strokeWidth={3} dot={{r:3}} activeDot={{r:5}} />
           </LineChart>
         </ResponsiveContainer>
      </div>
    </div>
  );
}
