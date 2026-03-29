'use client';

import { useState } from 'react';

export default function ImageCarouselEditor({ initialImages, name }) {
  const [images, setImages] = useState(initialImages || []);

  const addImage = () => {
    setImages([...images, '']);
  };

  const updateImage = (i, val) => {
    const newImages = [...images];
    newImages[i] = val;
    setImages(newImages);
  };

  const removeImage = (i) => {
    setImages(images.filter((_, idx) => idx !== i));
  };

  const moveItem = (from, to) => {
    const updated = [...images];
    const [removed] = updated.splice(from, 1);
    updated.splice(to, 0, removed);
    setImages(updated);
  };

  return (
    <div style={{ border: '1px solid #eaeaea', padding: '1.5rem', background: '#fff', borderRadius: '4px' }}>
      {/* Passing data as JSON to the Server Action */}
      <input type="hidden" name={name} value={JSON.stringify(images)} />
      
      <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.2rem', alignItems: 'center' }}>
        <h4 style={{ margin: 0, fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#666' }}>Galería de Imágenes (Carrusel)</h4>
        <button type="button" onClick={addImage} className="btn-secondary" style={{ fontSize: '0.7rem', padding: '4px 10px' }}>+ Añadir Foto</button>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.8rem' }}>
        {images.map((img, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.8rem', alignItems: 'center', background: '#fcfcfc', padding: '0.8rem', border: '1px solid #f0f0f0', borderRadius: '4px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                <button type="button" onClick={() => i > 0 && moveItem(i, i - 1)} disabled={i === 0} style={{ opacity: i === 0 ? 0.2 : 1, border: 'none', background: 'none', cursor: 'pointer' }}>▲</button>
                <button type="button" onClick={() => i < images.length - 1 && moveItem(i, i + 1)} disabled={i === images.length - 1} style={{ opacity: i === images.length - 1 ? 0.2 : 1, border: 'none', background: 'none', cursor: 'pointer' }}>▼</button>
            </div>
            
            <div style={{ width: '50px', height: '65px', background: '#eee', flexShrink: 0, borderRadius: '4px', overflow: 'hidden' }}>
                {img ? <img src={img} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /> : <div style={{ width: '100%', height: '100%', background: '#eee' }}></div>}
            </div>

            <input 
              type="text" 
              value={img} 
              onChange={(e) => updateImage(i, e.target.value)}
              placeholder="URL de la imagen (Ej: https://...)"
              style={{ flex: 1, padding: '0.6rem', border: '1px solid #ddd', fontSize: '0.8rem', fontFamily: 'var(--font-sans)', minWidth: 0 }}
            />
            
            <button 
                type="button" 
                onClick={() => removeImage(i)} 
                title="Eliminar foto"
                style={{ color: '#c53030', border: 'none', background: 'none', cursor: 'pointer', fontSize: '1.2rem', padding: '0 0.5rem' }}
            >&times;</button>
          </div>
        ))}

        {images.length === 0 && (
          <div style={{ textAlign: 'center', padding: '1.5rem', border: '1.5px dashed #eee', borderRadius: '4px', color: '#999', fontSize: '0.8rem' }}>
            Sin imágenes adicionales. Haz clic en "Añadir Foto" para completar tu carrusel.
          </div>
        )}
      </div>
    </div>
  );
}
