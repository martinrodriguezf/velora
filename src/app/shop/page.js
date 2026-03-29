'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import catalogueData from '@/data/catalogue.json';
import categoriesData from '@/data/categories.json';
import styles from './page.module.css';
import { useCurrency } from '@/context/CurrencyContext';

export default function Shop() {
  const { formatPrice } = useCurrency();
  const [activeCategory, setActiveCategory] = useState('all');
  
  // Only show Active products
  const activeCatalogue = catalogueData.filter(p => p.status !== 'archived');
  
  // Filter by category
  const filteredProducts = activeCategory === 'all' 
    ? activeCatalogue 
    : activeCatalogue.filter(p => p.category === activeCategory);

  return (
    <div className={`container ${styles.shopPage}`}>
      <div className={styles.shopHeader}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '3rem' }}>La Colección</h1>
        <p>Piezas curadas diseñadas para elevar la elegancia de todos los días.</p>
      </div>
      
      <div className={styles.shopLayout}>
        {/* Dynamic Sidebar Filters */}
        <aside className={styles.filters}>
          <div className={styles.filterGroup}>
            <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>Categoría</h4>
            <ul style={{ listStyle: 'none', padding: 0 }}>
              <li style={{ marginBottom: '0.8rem' }}>
                <button 
                    onClick={() => setActiveCategory('all')} 
                    style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: activeCategory === 'all' ? '#000' : '#666', fontWeight: activeCategory === 'all' ? 700 : 400, fontSize: '0.9rem' }}
                >Todo</button>
              </li>
              {categoriesData.map(cat => (
                <li key={cat.id} style={{ marginBottom: '0.8rem' }}>
                    <button 
                        onClick={() => setActiveCategory(cat.id)} 
                        style={{ background: 'none', border: 'none', padding: 0, cursor: 'pointer', color: activeCategory === cat.id ? '#000' : '#666', fontWeight: activeCategory === cat.id ? 700 : 400, fontSize: '0.9rem', textTransform: 'capitalize' }}
                    >{cat.name}</button>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.filterGroup}>
            <h4 style={{ textTransform: 'uppercase', fontSize: '0.8rem', letterSpacing: '1px', marginBottom: '1.5rem' }}>Talle</h4>
            <div className={styles.sizeGrid}>
              <span>XS</span><span>S</span><span>M</span><span>L</span>
            </div>
          </div>
        </aside>

        {/* Product Grid */}
        <main className={styles.productGrid}>
          <div className={styles.toolbar}>
            <span style={{ fontSize: '0.85rem', opacity: 0.6 }}>Mostrando {filteredProducts.length} Productos</span>
            <select className={styles.sortSelect} style={{ border: 'none', background: 'none', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer' }}>
              <option>Ordenar por: Novedades</option>
              <option>Precio: Menor a Mayor</option>
              <option>Precio: Mayor a Menor</option>
            </select>
          </div>
          <div className="grid-2">
            {filteredProducts.map(product => (
              <ProductCard key={product.id} product={product} formatPrice={formatPrice} />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
              <div style={{ textAlign: 'center', padding: '5rem 0', gridColumn: 'span 2' }}>
                  <p style={{ color: '#666' }}>No hay productos disponibles en esta categoría actualmente.</p>
              </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProductCard({ product, formatPrice }) {
    return (
        <Link href={`/product/${product.id}`} className={styles.productCard}>
            <div className={styles.imageWrapper}>
                <img src={product.image_link} alt={product.title} className={styles.productImage} />
                {product.additional_image_links && product.additional_image_links[0] && (
                    <img src={product.additional_image_links[0]} alt="" className={styles.productImageHover} />
                )}
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
    );
}
