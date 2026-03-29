'use client';

import { useState, useEffect } from 'react';
import storefrontData from '@/data/storefront.json';

export default function LeadMagnetModal({ onClose }) {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [onClose]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email) return;
    
    // Simulate capturing email and sending coupon
    setSubmitted(true);
  };

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0, bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.5)',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      zIndex: 9999,
      padding: '1rem'
    }}>
      <div style={{
        backgroundColor: '#fff',
        padding: '2.5rem',
        borderRadius: '8px',
        maxWidth: '450px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 10px 25px rgba(0,0,0,0.2)',
        textAlign: 'center'
      }}>
        <button 
          onClick={onClose}
          style={{
            position: 'absolute',
            top: '1rem', right: '1rem',
            background: 'none',
            border: 'none',
            fontSize: '1.5rem',
            cursor: 'pointer',
            color: '#666'
          }}
        >
          &times;
        </button>

        {!submitted ? (
          <>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '1rem' }}>{storefrontData.marketing?.popup_title || "Desbloqueá un 10% OFF"}</h2>
            <p style={{ color: '#666', marginBottom: '2rem', lineHeight: '1.5' }}>
              {storefrontData.marketing?.popup_desc || "Sumate a nuestra comunidad minimalista y recibí acceso anticipado a nuevas colecciones junto con tu descuento de bienvenida."}
            </p>

            <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              <input 
                type="email" 
                placeholder="Tu correo electrónico" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                style={{
                  padding: '0.85rem',
                  border: '1px solid var(--color-border)',
                  borderRadius: '4px',
                  fontSize: '1rem',
                  width: '100%'
                }}
              />
              <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                Quiero mi descuento
              </button>
            </form>
            <p style={{ fontSize: '0.75rem', color: '#999', marginTop: '1rem' }}>
              Al registrarte, aceptas recibir correos promocionales. Podés desuscribirte en cualquier momento.
            </p>
          </>
        ) : (
          <div style={{ padding: '2rem 0' }}>
            <div style={{ fontSize: '4rem', marginBottom: '1rem' }}>🎉</div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.75rem', marginBottom: '1rem' }}>¡Bienvenida a Velora!</h2>
            <p style={{ color: '#666', marginBottom: '2rem' }}>
              Tu código promocional es:
            </p>
            <div style={{ 
              background: '#f3f4f6', 
              padding: '1rem', 
              fontSize: '1.5rem', 
              fontWeight: 'bold', 
              letterSpacing: '2px', 
              borderRadius: '4px',
              border: '1px dashed #ccc',
              marginBottom: '2rem',
              userSelect: 'all'
            }}>
              BIENVENIDA10
            </div>
            <button onClick={onClose} className="btn-primary" style={{ width: '100%' }}>
              Continuar comprando
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
