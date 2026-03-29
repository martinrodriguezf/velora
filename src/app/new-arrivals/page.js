import Link from 'next/link';
import catalogue from '@/data/catalogue.json';
import shopStyles from '../shop/page.module.css';

export const metadata = {
  title: 'Novedades | Velora',
};

export default function NewArrivals() {
  // Filtrar solo los que tengan el badge "Nuevo"
  const newProducts = catalogue.filter(p => 
    p.badges && p.badges.includes('Nuevo')
  );

  return (
    <div className={`container ${shopStyles.shopPage}`}>
      <div className={shopStyles.shopHeader} style={{marginBottom: '3rem'}}>
        <h1>Novedades</h1>
        <p>Las últimas piezas de nuestra colección de estudio. Edición limitada.</p>
      </div>
      
      <div className={shopStyles.shopLayout} style={{gridTemplateColumns: '1fr'}}>
        <main className={shopStyles.productGrid}>
          <div className="grid-4">
            {(newProducts.length > 0 ? newProducts : catalogue).map(product => (
              <Link href={`/product/${product.id}`} key={product.id} className={shopStyles.productCard}>
                <div className={shopStyles.imageWrapper}>
                  <img src={product.image_link} alt={product.title} className={shopStyles.productImage} />
                  {product.additional_image_links[0] && (
                    <img src={product.additional_image_links[0]} alt="" className={shopStyles.productImageHover} />
                  )}
                  {product.badges && product.badges.map(b => (
                    <span key={b} className={shopStyles.badge}>{b}</span>
                  ))}
                  
                  <div className={shopStyles.quickAdd}>
                    <span>Añadir Rápido:</span>
                    <div className={shopStyles.quickSizes}>
                      {product.sizes.map(size => <button key={size}>{size}</button>)}
                    </div>
                  </div>
                </div>
                <div className={shopStyles.productInfo}>
                  <h3>{product.title}</h3>
                  <p className={shopStyles.price}>${product.price.toFixed(2)} USD</p>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
