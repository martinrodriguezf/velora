import catalogue from '@/data/catalogue.json';
import Link from 'next/link';

export default function StockAlerts() {
  const outOfStock = catalogue.filter(p => p.availability.toLowerCase().includes('out'));

  if (outOfStock.length === 0) return null;

  return (
    <div style={{ background: '#fffcfc', padding: '1.5rem', borderRadius: '8px', border: '1px solid #ffcccc', gridColumn: '1 / -1' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem', color: '#d32f2f' }}>
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path>
          <line x1="12" y1="9" x2="12" y2="13"></line>
          <line x1="12" y1="17" x2="12.01" y2="17"></line>
        </svg>
        <h3 style={{ fontSize: '1.1rem', fontFamily: 'var(--font-serif)', margin: 0 }}>Alertas de Inventario Crítico</h3>
      </div>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
        {outOfStock.map(product => (
          <div key={product.id} style={{ display: 'flex', justifyContent: 'space-between', padding: '0.75rem', background: 'white', borderRadius: '4px', border: '1px solid #ffebd6' }}>
             <div style={{display: 'flex', gap: '1rem', alignItems: 'center'}}>
                <span style={{fontWeight: 500, color: '#333'}}>{product.id}</span>
                <span>{product.title}</span>
             </div>
             <div style={{display: 'flex', gap: '1rem'}}>
                <span style={{ color: '#d32f2f', fontWeight: 'bold', fontSize: '0.85rem', textTransform: 'uppercase', padding: '0.2rem 0.5rem', background: '#ffebee', borderRadius: '4px' }}>Agotado</span>
                <Link href={`/admin/products/${product.id}`} style={{color: '#0056b3', fontSize: '0.9rem', textDecoration: 'underline'}}>Reponer Stock</Link>
             </div>
          </div>
        ))}
      </div>
    </div>
  );
}
