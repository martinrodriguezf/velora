'use client';

import Link from 'next/link';
import { useCurrency } from '@/context/CurrencyContext';
import styles from '@/app/page.module.css';

export default function FeaturedGrid({ products }) {
  const { formatPrice } = useCurrency();

  return (
    <div className="grid-4">
      {products.map(product => (
        <Link href={`/product/${product.id}`} key={product.id} className={styles.productCard}>
          <div className={styles.imageWrapper}>
            <img src={product.image_link} alt={product.title} className={styles.productImage} />
            {product.badges && product.badges.map(b => (
              <span key={b} className={styles.badge} style={{ background: b.includes('SALE') ? '#000' : '#fff', color: b.includes('SALE') ? '#fff' : '#000' }}>{b}</span>
            ))}
          </div>
          <div className={styles.productInfo}>
            <h3 style={{ fontSize: '1rem', fontWeight: 500, marginBottom: '0.4rem' }}>{product.title}</h3>
            <div style={{ display: 'flex', gap: '0.8rem', alignItems: 'center' }}>
                <p className={styles.price} style={{ margin: 0, fontWeight: 700 }}>{formatPrice(product.price)}</p>
                {product.compare_at_price && (
                    <p style={{ margin: 0, textDecoration: 'line-through', color: '#999', fontSize: '0.85rem' }}>
                        {formatPrice(product.compare_at_price)}
                    </p>
                )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}
