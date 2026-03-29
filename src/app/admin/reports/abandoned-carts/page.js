import Link from 'next/link';
import mockCarts from '@/data/mock_abandoned_carts.json';
import styles from '../../products/page.module.css';
import ReportToolbar from '@/components/admin/ReportToolbar';
import RecoverCartButton from '@/components/admin/RecoverCartButton';

export const metadata = {
  title: 'Carritos Abandonados | Velora Admin',
};

export default function AbandonedCartsReport() {
  return (
    <div>
      <Link href="/admin/reports" style={{ color: '#0d47a1', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Volver a Reportes Globales</Link>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Reporte Profundo: Carritos Abandonados</h1>
        <p style={{color: '#666'}}>Análisis de abandono en la capa de pago y herramientas de retargeting activo.</p>
      </div>
      
      <ReportToolbar />

      <h2 style={{fontFamily: 'var(--font-serif)', marginBottom: '1rem', fontSize: '1.2rem'}}>Leads y Oportunidades de Recuperación</h2>
      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente Potencial (Email)</th>
              <th>Fecha Abandono</th>
              <th>Total Carrito (USD)</th>
              <th>Acción de Recuperación</th>
            </tr>
          </thead>
          <tbody>
             {mockCarts.map(cart => (
                <tr key={cart.id}>
                  <td style={{fontWeight: 500}}>{cart.userEmail} <br/><span style={{fontSize:'0.75rem', color:'#888'}}>{cart.id}</span></td>
                  <td style={{color: '#888'}}>{cart.abandonedAt}</td>
                  <td style={{fontWeight: 'bold', color: '#d32f2f'}}>${cart.value.toFixed(2)}</td>
                  <td>
                     <RecoverCartButton email={cart.userEmail} />
                  </td>
                </tr>
             ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
