'use client';

import { useState } from 'react';
import { updateStorefront } from '@/actions/storefrontActions';
import storefrontData from '@/data/storefront.json';
import catalogue from '@/data/catalogue.json';

export default function StorefrontAdminPage() {
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [selectedProducts, setSelectedProducts] = useState(storefrontData.featured_products || []);

  const handleProductToggle = (id) => {
    if (selectedProducts.includes(id)) {
      setSelectedProducts(selectedProducts.filter(p => p !== id));
    } else {
      if (selectedProducts.length < 4) {
        setSelectedProducts([...selectedProducts, id]);
      } else {
        alert("Diseño protegido: Solo puedes seleccionar un máximo de 4 productos para mantener la grilla perfecta.");
      }
    }
  };

  async function handleSubmit(formData) {
    // Inject the selected products manually to avoid form control issues
    formData.delete('featuredProducts');
    selectedProducts.forEach(id => formData.append('featuredProducts', id));

    setLoading(true);
    setMessage(null);
    const result = await updateStorefront(formData);
    
    if (result.success) {
      setMessage({ type: 'success', text: result.message });
    } else {
      setMessage({ type: 'error', text: result.error });
    }
    setLoading(false);
    
    setTimeout(() => setMessage(null), 3000);
  }

  return (
    <div>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Gestión de Storefront</h1>
        <p style={{color: '#666'}}>Controla el contenido visible en la portada, banners de marketing y curation de productos.</p>
      </div>

      {message && (
        <div style={{
          padding: '1rem', 
          marginBottom: '2rem', 
          borderRadius: '4px',
          backgroundColor: message.type === 'success' ? '#d1fae5' : '#fee2e2',
          color: message.type === 'success' ? '#065f46' : '#991b1b',
          border: `1px solid ${message.type === 'success' ? '#34d399' : '#f87171'}`
        }}>
          {message.text}
        </div>
      )}

      <form action={handleSubmit} style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)', maxWidth: '900px' }}>
        
        {/* MARKETING HOOK */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>📢</span> Crecimiento & Marketing Hook
        </h3>
        
        <div style={{ marginBottom: '1.5rem', display: 'flex', alignItems: 'center', gap: '1rem' }}>
          <label style={{ display: 'flex', alignItems: 'center', cursor: 'pointer', fontWeight: '500' }}>
            <input 
              type="checkbox" 
              name="marketingActive" 
              defaultChecked={storefrontData.marketing?.active}
              style={{ width: '1.2rem', height: '1.2rem', marginRight: '0.5rem' }} 
            />
            Activar barra negra de retención (Top Banner / Pop-up)
          </label>
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="bannerText" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Texto de la Barra Superior</label>
          <input type="text" id="bannerText" name="bannerText" defaultValue={storefrontData.marketing?.banner_text} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2.5rem' }}>
          <div>
            <label htmlFor="popupTitle" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Título del Pop-up (Captura de Email)</label>
            <input type="text" id="popupTitle" name="popupTitle" defaultValue={storefrontData.marketing?.popup_title} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>
          <div>
            <label htmlFor="popupDesc" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Descripción del Pop-up</label>
            <input type="text" id="popupDesc" name="popupDesc" defaultValue={storefrontData.marketing?.popup_desc} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>
        </div>

        {/* FEATURED PRODUCTS */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🛍️</span> Selección de Novedades (Home Grid)
        </h3>
        <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '1rem' }}>Selecciona hasta 4 productos para destacar en la portada de tu tienda.</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '1rem', marginBottom: '2.5rem' }}>
          {catalogue.map(product => {
            const isSelected = selectedProducts.includes(product.id);
            return (
              <div 
                key={product.id} 
                onClick={() => handleProductToggle(product.id)}
                style={{ 
                  border: `2px solid ${isSelected ? '#000' : '#eaeaea'}`, 
                  borderRadius: '6px', 
                  padding: '0.5rem', 
                  cursor: 'pointer',
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.75rem',
                  transition: 'all 0.2s',
                  background: isSelected ? '#f9f9f9' : 'white'
                }}
              >
                <img src={product.image_link} alt={product.title} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '4px' }} />
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontSize: '0.85rem', fontWeight: '600', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</div>
                  <div style={{ fontSize: '0.75rem', color: '#666' }}>${product.price}</div>
                </div>
                <div style={{ 
                  width: '18px', height: '18px', 
                  borderRadius: '50%', 
                  border: `2px solid ${isSelected ? '#000' : '#ccc'}`,
                  background: isSelected ? '#000' : 'transparent',
                  display: 'flex', justifyContent: 'center', alignItems: 'center'
                }}>
                  {isSelected && <span style={{ color: '#fff', fontSize: '10px' }}>✓</span>}
                </div>
              </div>
            );
          })}
        </div>

        {/* HERO */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>🖼️</span> Portada Principal (Hero)
        </h3>
        
        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="heroTitle" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Título Principal</label>
          <input type="text" id="heroTitle" name="heroTitle" defaultValue={storefrontData.hero.title} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
        </div>

        <div style={{ marginBottom: '1.5rem' }}>
          <label htmlFor="heroSubtitle" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Subtítulo / Bajada</label>
          <textarea id="heroSubtitle" name="heroSubtitle" defaultValue={storefrontData.hero.subtitle} rows={3} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px', resize: 'vertical' }} />
        </div>

        <div style={{ marginBottom: '2.5rem' }}>
          <label htmlFor="heroImage" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>URL de Imagen del Hero</label>
          <input type="text" id="heroImage" name="heroImage" defaultValue={storefrontData.hero.image} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
        </div>

        {/* VALUES */}
        <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span>✨</span> Sección de Valores & Identidad
        </h3>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem', marginBottom: '2rem' }}>
          <div>
            <label htmlFor="valuesTitle" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>Título de Sección</label>
            <input type="text" id="valuesTitle" name="valuesTitle" defaultValue={storefrontData.values.title} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>
          <div>
            <label htmlFor="valuesImage" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: '500' }}>URL de Imagen Decorativa</label>
            <input type="text" id="valuesImage" name="valuesImage" defaultValue={storefrontData.values.image} required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>
        </div>

        <p style={{ fontSize: '0.9rem', fontWeight: '600', marginBottom: '1rem' }}>Los 3 Pilares Fundamentales:</p>
        
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', marginBottom: '2.5rem' }}>
          {storefrontData.values.items.map((item, index) => (
            <div key={index} style={{ background: '#f9f9f9', padding: '1rem', borderRadius: '6px', border: '1px solid #eaeaea' }}>
              <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', fontWeight: '600' }}>Pilar {index + 1}</label>
              <input type="text" name={`itemTitle${index}`} defaultValue={item.title} required placeholder="Título" style={{ width: '100%', padding: '0.5rem', marginBottom: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', fontSize: '0.9rem' }} />
              <textarea name={`itemDesc${index}`} defaultValue={item.description} required placeholder="Descripción..." rows={3} style={{ width: '100%', padding: '0.5rem', border: '1px solid #ccc', borderRadius: '4px', resize: 'vertical', fontSize: '0.85rem' }} />
            </div>
          ))}
        </div>

        <div style={{ borderTop: '1px solid #eaeaea', paddingTop: '1.5rem', display: 'flex', justifyContent: 'flex-end' }}>
          <button type="submit" disabled={loading} className="btn-primary" style={{ minWidth: '200px', opacity: loading ? 0.7 : 1 }}>
            {loading ? 'Guardando...' : 'Guardar Cambios Locales'}
          </button>
        </div>
      </form>
    </div>
  );
}
