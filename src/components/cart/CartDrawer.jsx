'use client';

import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';
import Link from 'next/link';

export default function CartDrawer() {
  const { cart, isCartOpen, setIsCartOpen, updateQuantity, removeItem, cartTotal } = useCart();
  const { formatPrice } = useCurrency();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Semi-transparent Overlay */}
      <div 
        onClick={() => setIsCartOpen(false)}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          backdropFilter: 'blur(2px)',
          zIndex: 999,
          animation: 'fadeIn 0.3s ease'
        }}
      />
      
      {/* Side Drawer Body */}
      <div style={{
          position: 'fixed',
          top: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          maxWidth: '420px',
          backgroundColor: '#fff',
          zIndex: 1000,
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
          animation: 'slideIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }}>
        <style>{`
          @keyframes slideIn { from { transform: translateX(100%); } to { transform: translateX(0); } }
          @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
          .drawer-header { padding: 1.5rem; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid #f0f0f0; }
          .drawer-body { flex: 1; overflow-y: auto; padding: 1.5rem; }
          .drawer-footer { padding: 2rem 1.5rem; border-top: 1px solid #f0f0f0; background: #fafafa; }
          .cart-item { display: flex; gap: 1.2rem; margin-bottom: 2rem; }
          .cart-item-img { width: 80px; height: 110px; object-fit: cover; border-radius: 4px; background: #eee; }
          .cart-item-info { flex: 1; display: flex; flexDirection: column; justifyContent: space-between; }
          .qty-controls { display: flex; align-items: center; gap: 0.8rem; border: 1px solid #eee; padding: 0.2rem 0.5rem; border-radius: 4px; width: fit-content; }
          .qty-btn { background: none; border: none; padding: 0 5px; cursor: pointer; font-size: 1.1rem; color: #666; }
          .qty-btn:hover { color: #000; }
          .remove-link { border: none; background: none; color: #999; text-decoration: underline; fontSize: 0.75rem; cursor: pointer; padding: 0; margin-top: 0.5rem; width: fit-content; }
          .remove-link:hover { color: #cc0000; }
        `}</style>

        <div className="drawer-header">
          <h2 style={{ fontSize: '1.25rem', fontFamily: 'var(--font-serif)', margin: 0, letterSpacing: '0.5px' }}>Tu Bolsa de Compras</h2>
          <button 
            onClick={() => setIsCartOpen(false)}
            aria-label="Cerrar carrito"
            style={{ background: 'none', border: 'none', fontSize: '1.8rem', cursor: 'pointer', lineHeight: 1, color: '#666' }}
          >&times;</button>
        </div>

        <div className="drawer-body">
          {cart.length === 0 ? (
            <div style={{ textAlign: 'center', marginTop: '5rem' }}>
              <div style={{ fontSize: '3rem', marginBottom: '1.5rem', opacity: 0.2 }}>🧺</div>
              <p style={{ color: '#666', marginBottom: '2rem' }}>Tu bolsa está vacía actualmente.</p>
              <button 
                onClick={() => setIsCartOpen(false)}
                style={{ background: 'none', border: '1px solid #000', padding: '0.8rem 1.5rem', textTransform: 'uppercase', fontSize: '0.75rem', letterSpacing: '1px', cursor: 'pointer' }}
              >Empezar a comprar</button>
            </div>
          ) : (
            cart.map((item) => (
              <div key={`${item.id}-${item.size}`} className="cart-item">
                <Link href={`/product/${item.id}`} onClick={() => setIsCartOpen(false)}>
                    <img src={item.image} alt={item.title} className="cart-item-img" />
                </Link>
                <div className="cart-item-info">
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.95rem', marginBottom: '0.3rem', color: '#111' }}>{item.title}</div>
                    <div style={{ fontSize: '0.85rem', color: '#666', marginBottom: '0.8rem' }}>Color: {item.color} | Talle: {item.size}</div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{formatPrice(item.price)}</div>
                  </div>
                  
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                    <div className="qty-controls">
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, -1)} aria-label="Reducir">−</button>
                      <span style={{ fontSize: '0.9rem', minWidth: '20px', textAlign: 'center' }}>{item.quantity}</span>
                      <button className="qty-btn" onClick={() => updateQuantity(item.id, item.size, 1)} aria-label="Aumentar">+</button>
                    </div>
                    <button className="remove-link" onClick={() => removeItem(item.id, item.size)}>Eliminar</button>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>

        {cart.length > 0 && (
          <div className="drawer-footer">
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', fontSize: '1.15rem', fontWeight: 600, borderTop: '1px solid #eee', paddingTop: '1.5rem' }}>
              <span>Total Estimado</span>
              <span>{formatPrice(cartTotal)}</span>
            </div>
            
            <Link 
              href="/checkout" 
              onClick={() => setIsCartOpen(false)}
              className="btn-primary" 
              style={{ display: 'block', textAlign: 'center', textDecoration: 'none', marginBottom: '1rem', padding: '1.2rem' }}
            >
              Finalizar Pedido Seguro
            </Link>
            
            <Link 
              href="/cart" 
              onClick={() => setIsCartOpen(false)}
              style={{ display: 'block', textAlign: 'center', textDecoration: 'none', color: '#000', fontSize: '0.85rem', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '1px' }}
            >
              Ver Carrito Detallado
            </Link>
          </div>
        )}
      </div>
    </>
  );
}
