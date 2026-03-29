import Link from 'next/link';
import catalogue from '@/data/catalogue.json';
import styles from '../../products/page.module.css';
import ReportToolbar from '@/components/admin/ReportToolbar';

export const metadata = {
  title: 'Reporte de Categorías | Velora Admin',
};

export default function CategoriesReportDetail() {
  // Agrupación dinámica real en base al catálogo (mock analítico)
  const categoryStats = catalogue.reduce((acc, current) => {
     const cat = current.category || 'Sin Categoría';
     if (!acc[cat]) {
       acc[cat] = { quantity: 0, potentialRevenue: 0 };
     }
     acc[cat].quantity += 1;
     acc[cat].potentialRevenue += current.price;
     return acc;
  }, {});

  const categoriesArray = Object.keys(categoryStats).map(key => ({
     name: key,
     quantity: categoryStats[key].quantity,
     revenue: categoryStats[key].potentialRevenue * 5 // Simulando ventas X 5
  })).sort((a,b) => b.revenue - a.revenue);

  return (
    <div>
      <Link href="/admin/reports" style={{ color: '#0d47a1', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Volver a Reportes Globales</Link>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Reporte Profundo: Categorías</h1>
        <p style={{color: '#666'}}>Desglose de liquidez y volumen de ventas según segmento de indumentaria.</p>
      </div>

      <ReportToolbar />
      
      <div className={styles.tableContainer}>
         <table className={styles.table}>
           <thead>
             <tr>
               <th>Categoría</th>
               <th>Variedad de Ítems (SKUs)</th>
               <th>Ingreso Proyectado (Simulado)</th>
               <th>Estado</th>
             </tr>
           </thead>
           <tbody>
              {categoriesArray.map(c => (
                <tr key={c.name}>
                  <td style={{fontWeight: 'bold', textTransform: 'capitalize'}}>{c.name}</td>
                  <td>{c.quantity} productos en catálogo</td>
                  <td style={{fontWeight: 'bold', color: '#4caf50'}}>${c.revenue.toLocaleString()} USD</td>
                  <td><span style={{padding: '0.2rem 0.5rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '4px', fontSize: '0.8rem'}}>Rentable</span></td>
                </tr>
              ))}
           </tbody>
         </table>
      </div>
    </div>
  );
}
