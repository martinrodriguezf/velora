'use client';

import { useState } from 'react';
import LeadMagnetModal from './LeadMagnetModal';
import storefrontData from '@/data/storefront.json';

export default function TopBanner() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible || storefrontData.marketing?.active === false) return null;

  return (
    <>
      <div style={{
        backgroundColor: '#000',
        color: '#fff',
        textAlign: 'center',
        padding: '0.5rem',
        fontSize: '0.85rem',
        fontWeight: '500',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '0.5rem',
        position: 'relative'
      }}>
        <span>{storefrontData.marketing?.banner_text || "✨ 10% OFF en tu primera compra al registrarte"}</span>
        <button 
          onClick={() => setIsModalOpen(true)}
          style={{
            background: 'none',
            border: '1px solid #fff',
            color: '#fff',
            padding: '2px 8px',
            fontSize: '0.75rem',
            cursor: 'pointer',
            borderRadius: '4px',
            textTransform: 'uppercase'
          }}
        >
          Obtener Código
        </button>
        <button 
          onClick={() => setIsVisible(false)}
          style={{
            position: 'absolute',
            right: '1rem',
            background: 'none',
            border: 'none',
            color: '#aaa',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
          aria-label="Cerrar banner"
        >
          &times;
        </button>
      </div>

      {isModalOpen && <LeadMagnetModal onClose={() => setIsModalOpen(false)} />}
    </>
  );
}
