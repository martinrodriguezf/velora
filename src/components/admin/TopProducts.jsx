import catalogue from '@/data/catalogue.json';
import Link from 'next/link';

export default function TopProducts() {
  // Simulamos extraer los "Top" tomando los primeros 4 elementos para la demo
  const topSellers = catalogue.slice(0, 4);

  return (
    <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', height: '100%' }}>
      <h3 style={{ fontSize: '1.1rem', marginBottom: '1.5rem', fontFamily: 'var(--font-serif)' }}>Top Productos</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {topSellers.map((product, idx) => (
          <Link href={`/admin/products/${product.id}`} key={product.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem', textDecoration: 'none', color: 'inherit' }}>
            <span style={{ fontSize: '1.2rem', fontWeight: 'bold', color: '#ccc', width: '20px' }}>{idx + 1}</span>
            <img src={product.image_link} alt={product.title} style={{ width: '45px', height: '60px', objectFit: 'cover', borderRadius: '4px', backgroundColor: '#f0f0f0' }} />
            <div style={{ flex: 1 }}>
              <h4 style={{ fontSize: '0.9rem', marginBottom: '0.2rem', textTransform: 'capitalize' }}>{product.title}</h4>
              <p style={{ fontSize: '0.8rem', color: '#666' }}>{product.category}</p>
            </div>
            <div style={{ fontWeight: 'bold', fontSize: '0.9rem' }}>
               ${product.price.toFixed(0)}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
