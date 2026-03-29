import Link from 'next/link';
import users from '@/data/users.json';
import styles from '../../products/page.module.css';
import ReportToolbar from '@/components/admin/ReportToolbar';

export const metadata = {
  title: 'Reporte de Retención | Velora Admin',
};

export default function RetentionReportDetail() {
  // Filtrando usuarios que compraron más de 1 vez.
  const recurrentUsers = users.filter(u => u.purchases > 1);
  const newUsers = users.filter(u => u.purchases <= 1);

  return (
    <div>
      <Link href="/admin/reports" style={{ color: '#0d47a1', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Volver a Reportes Globales</Link>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Reporte Profundo: Retención</h1>
        <p style={{color: '#666'}}>Análisis de fidelidad y valor a largo plazo (LTV) de clientas recurrentes.</p>
      </div>
      
      <ReportToolbar />

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
         <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <h3 style={{fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Tasa de Retención</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)', color: '#0d47a1'}}>
              {Math.round((recurrentUsers.length / users.length) * 100)}%
            </p>
         </div>
         <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <h3 style={{fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Órdenes Promedio (Recurrentes)</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)'}}>
              {(recurrentUsers.reduce((acc, u) => acc + u.purchases, 0) / (recurrentUsers.length || 1)).toFixed(1)} compras/cliente
            </p>
         </div>
      </div>

      <h2 style={{fontFamily: 'var(--font-serif)', marginBottom: '1rem', fontSize: '1.2rem'}}>Las Mejores Clientas (Top LTV)</h2>
      <div className={styles.tableContainer}>
         <table className={styles.table}>
           <thead>
             <tr>
               <th>Cliente</th>
               <th>Órdenes Acumuladas</th>
               <th>Estado CRM</th>
             </tr>
           </thead>
           <tbody>
              {recurrentUsers.sort((a,b) => b.purchases - a.purchases).map(c => (
                <tr key={c.id}>
                  <td style={{fontWeight: 500}}>{c.name} <br/><span style={{fontSize: '0.8rem', color: '#888', fontWeight: 'normal'}}>{c.email}</span></td>
                  <td style={{fontWeight: 'bold', color: '#4caf50', fontSize: '1.1rem'}}>{c.purchases} compras</td>
                  <td><span style={{padding: '0.2rem 0.5rem', background: '#ffebee', color: '#d32f2f', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500}}>{c.role}</span></td>
                </tr>
              ))}
              {recurrentUsers.length === 0 && <tr><td colSpan="3" style={{textAlign:'center', color: '#888'}}>Aún no hay suficientes datos históricos.</td></tr>}
           </tbody>
         </table>
      </div>
    </div>
  );
}
