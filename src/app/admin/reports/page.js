import Link from 'next/link';
import mockCarts from '@/data/mock_abandoned_carts.json';
import catalogue from '@/data/catalogue.json';
import users from '@/data/users.json';
import styles from '../products/page.module.css'; 
import RecoverCartButton from '@/components/admin/RecoverCartButton';
import CategoryPieChart from '@/components/admin/CategoryPieChart';
import RetentionBarChart from '@/components/admin/RetentionBarChart';
import RegistrationsChart from '@/components/admin/RegistrationsChart';

export const metadata = {
  title: 'Reportes y Analíticas | Admin',
};

export default function Reports() {
  return (
    <div>
      <div style={{marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Reportes y Rendimiento</h1>
        <p>Centro global de salud del e-commerce.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
         <RegistrationsChart total={users.length} />
         <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <h3 style={{fontSize: '0.9rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Valorización Inventario</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)'}}>
               ${catalogue.reduce((acc, curr) => curr.availability.includes('in') ? acc + (curr.price * 15) : acc, 0).toLocaleString()}
            </p>
            <p style={{fontSize: '0.75rem', color: '#888'}}>Stock estimado (15 uni/artículo promedio)</p>
         </div>
         <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ffcccc', backgroundColor: '#fffcfc', position: 'relative'}}>
            <Link href="/admin/reports/abandoned-carts" style={{position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '0.8rem', color: '#d32f2f', textDecoration: 'none', fontWeight: 500, padding: '0.2rem 0.6rem', border: '1px solid #ffcdd2', borderRadius: '12px', background: '#ffebee'}}>
              Ver Tabla &rarr;
            </Link>
            <h3 style={{fontSize: '0.9rem', color: '#d32f2f', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Pérdida por Abandono</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)', color: '#d32f2f'}}>$8,400.00</p>
         </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
         <CategoryPieChart />
         <RetentionBarChart />
      </div>

    </div>
  );
}
