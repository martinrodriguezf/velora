'use client';

import { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import styles from '@/app/product/[id]/page.module.css';
import SizeGuideModal from './SizeGuideModal';

export default function ProductInfo({ product }) {
  const [selectedSize, setSelectedSize] = useState(null);
  const [error, setError] = useState('');
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const { addItem } = useCart();
  const { formatPrice } = useCurrency();

  const handleAdd = () => {
    if (!selectedSize) {
      setError('Por favor selecciona un talle');
      return;
    }
    setError('');
    addItem(product, selectedSize);
  };

  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <p className={styles.price} style={{ margin: 0, fontWeight: 700, fontSize: '1.5rem' }}>
                {formatPrice(product.price)}
            </p>
            {product.compare_at_price && (
                <p style={{ 
                    margin: 0, 
                    textDecoration: 'line-through', 
                    color: '#999', 
                    fontSize: '1.1rem' 
                }}>
                    {formatPrice(product.compare_at_price)}
                </p>
            )}
        </div>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
            {product.badges && product.badges.map(badge => (
                <span key={badge} style={{ fontSize: '0.65rem', textTransform: 'uppercase', background: badge.includes('SALE') ? '#000' : '#f0f0f0', color: badge.includes('SALE') ? '#fff' : '#000', padding: '0.2rem 0.6rem', borderRadius: '2px', fontWeight: 700, letterSpacing: '0.5px' }}>{badge}</span>
            ))}
        </div>
      </div>
      
      <p className={styles.description}>{product.description}</p>

      {/* Color */}
      <div className={styles.selectorGroup}>
        <span className={styles.label}>Color: <strong>{product.color}</strong></span>
        <div className={styles.swatchGrid}>
          <button className={`${styles.swatch} ${styles.swatchActive}`} style={{backgroundColor: '#e3dfd3'}}></button>
        </div>
      </div>

      {/* Sizes */}
      <div className={styles.selectorGroup}>
        <div className={styles.sizeHeader}>
          <span className={styles.label}>Talle {selectedSize && <strong>: {selectedSize}</strong>}</span>
          <button className={styles.guideBtn} onClick={() => setIsSizeGuideOpen(true)}>Guía de Talles</button>
        </div>
        <div className={styles.sizeGrid}>
          {product.sizes && product.sizes.map(size => (
            <button 
                key={size} 
                className={`${styles.sizeBtn} ${selectedSize === size ? styles.sizeBtnActive : ''}`}
                onClick={() => { setSelectedSize(size); setError(''); }}
            >
                {size}
            </button>
          ))}
        </div>
        {error && (
            <p style={{ color: '#c53030', fontSize: '0.8rem', marginTop: '0.5rem', animation: 'fadeIn 0.3s' }}>
                {error}
            </p>
        )}
      </div>

      {/* Action */}
      <button 
        className="btn-primary" 
        style={{ width: '100%', marginBottom: '1rem', padding: '1.2rem', fontSize: '0.9rem', letterSpacing: '1px' }}
        onClick={handleAdd}
      >
        Sumar al Carrito
      </button>
      
      {/* Promo Box */}
      <div style={{
          border: '1px solid #000',
          padding: '1rem',
          textAlign: 'center',
          marginTop: '1.5rem',
          marginBottom: '1.5rem',
          textTransform: 'uppercase',
          fontSize: '0.8rem',
          fontWeight: 700,
          letterSpacing: '1.5px',
          animation: 'pulse 2s infinite'
      }}>
        {product.promo_text || 'Promoción disponible por tiempo limitado'}
        <style>{`
            @keyframes pulse {
                0% { opacity: 1; }
                50% { opacity: 0.7; }
                100% { opacity: 1; }
            }
        `}</style>
      </div>

      {/* Trust Blocks */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem', fontSize: '0.85rem', color: '#444' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span>🚚</span> Envíos a todo Uruguay y USA
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span>💳</span> Hasta 12 cuotas sin interés
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.8rem' }}>
              <span>✨</span> Entrega garantizada en 24/48hs
          </div>
      </div>

      {/* Size Guide Modal Overlay */}
      {isSizeGuideOpen && (
          <SizeGuideModal 
            data={product.size_guide} 
            onClose={() => setIsSizeGuideOpen(false)} 
          />
      )}
    </>
  );
}
