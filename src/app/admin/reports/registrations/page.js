import Link from 'next/link';
import users from '@/data/users.json';
import styles from '../../products/page.module.css';
import ReportToolbar from '@/components/admin/ReportToolbar';

export const metadata = {
  title: 'Reporte de Registros | Velora Admin',
};

export default function RegistrationsReportDetail() {
  const sortedUsers = [...users].sort((a, b) => new Date(b.joinedAt) - new Date(a.joinedAt));

  return (
    <div>
      <Link href="/admin/reports" style={{ color: '#0d47a1', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Volver a Reportes Globales</Link>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Reporte Profundo: Nuevos Registros</h1>
        <p style={{color: '#666'}}>Medición de impacto de campañas de adquisición de leads.</p>
      </div>
      
      <ReportToolbar />

      <h2 style={{fontFamily: 'var(--font-serif)', marginBottom: '1rem', fontSize: '1.2rem'}}>Últimos Registros Históricos</h2>
      <div className={styles.tableContainer}>
         <table className={styles.table}>
           <thead>
             <tr>
               <th>Fecha de Alta</th>
               <th>Cliente Perteneciente</th>
               <th>Email Verificado</th>
               <th>Estado de Marketing</th>
             </tr>
           </thead>
           <tbody>
              {sortedUsers.map(u => (
                <tr key={u.id}>
                  <td style={{fontWeight: 500}}>{new Date(u.joinedAt).toLocaleDateString()}</td>
                  <td>{u.name} <br/><span style={{fontSize:'0.75rem', color:'#888', textTransform:'uppercase'}}>{u.role}</span></td>
                  <td><span style={{color: '#0d47a1'}}>{u.email}</span></td>
                  <td>
                    {u.status === 'Suscripto' ? (
                       <span style={{padding: '0.2rem 0.5rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', fontSize: '0.8rem', fontWeight: 500}}>Activo (Opt-in)</span>
                    ) : (
                       <span style={{padding: '0.2rem 0.5rem', background: '#f5f5f5', color: '#888', borderRadius: '4px', fontSize: '0.8rem'}}>Opt-out</span>
                    )}
                  </td>
                </tr>
              ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}
