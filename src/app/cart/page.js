'use client';

import Link from 'next/link';
import styles from './page.module.css';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function Cart() {
  const { cart, updateQuantity, removeItem, cartTotal } = useCart();
  const { formatPrice } = useCurrency();

  return (
    <div className={`container ${styles.cartPage}`}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '2rem' }}>Tu Carrito</h1>
      
      {cart.length === 0 ? (
        <div style={{ textAlign: 'center', padding: '5rem 0' }}>
            <p style={{ color: '#666', fontSize: '1.1rem', marginBottom: '2rem' }}>No tienes productos en tu carrito aún.</p>
            <Link href="/shop" className="btn-primary" style={{ display: 'inline-block' }}>Explorar Colección</Link>
        </div>
      ) : (
        <div className={styles.cartLayout}>
            <div className={styles.cartItems}>
            {cart.map(item => (
                <div key={`${item.id}-${item.size}`} className={styles.cartItem}>
                <Link href={`/product/${item.id}`}>
                    <img src={item.image} alt={item.title} className={styles.itemImage} />
                </Link>
                <div className={styles.itemDetails}>
                    <div className={styles.itemHeader}>
                    <h3>{item.title}</h3>
                    <span style={{ fontWeight: 600 }}>{formatPrice(item.price * item.quantity)}</span>
                    </div>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.2rem 0' }}>Color: {item.color}</p>
                    <p style={{ fontSize: '0.9rem', color: '#666', margin: '0.2rem 0' }}>Talle: {item.size}</p>
                    <div className={styles.itemActions}>
                    <div className={styles.quantity} style={{ display: 'flex', alignItems: 'center', border: '1px solid #eee', borderRadius: '4px' }}>
                        <button onClick={() => updateQuantity(item.id, item.size, -1)} style={{ padding: '0.3rem 0.8rem', border: 'none', background: 'none' }}>-</button>
                        <span style={{ padding: '0 0.5rem', fontSize: '0.9rem' }}>{item.quantity}</span>
                        <button onClick={() => updateQuantity(item.id, item.size, 1)} style={{ padding: '0.3rem 0.8rem', border: 'none', background: 'none' }}>+</button>
                    </div>
                    <button className={styles.removeBtn} onClick={() => removeItem(item.id, item.size)}>Eliminar</button>
                    </div>
                </div>
                </div>
            ))}
            </div>

            <div className={styles.cartSummary}>
            <h3>Resumen de Compra</h3>
            <div className={styles.summaryRow}>
                <span>Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
            </div>
            <div className={styles.summaryRow}>
                <span>Envío</span>
                <span style={{ fontStyle: 'italic', fontSize: '0.85rem' }}>Calculado en el checkout</span>
            </div>
            <div className={`${styles.summaryRow} ${styles.totalRow}`}>
                <span>Total Estimado</span>
                <span style={{ fontWeight: 700, fontSize: '1.3rem' }}>{formatPrice(cartTotal)}</span>
            </div>
            <Link href="/checkout" className="btn-primary" style={{ textAlign: 'center', display: 'block' }}>
                Ir al Checkout Seguro
            </Link>
            <p className={styles.secureText}>🔒 Checkout 100% Protegido</p>
            </div>
        </div>
      )}
    </div>
  );
}
