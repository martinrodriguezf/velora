'use client';

export default function SizeGuideModal({ data, onClose }) {
  if (!data || !data.headers) return null;

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      right: 0,
      bottom: 0,
      backgroundColor: 'rgba(0,0,0,0.6)',
      backdropFilter: 'blur(3px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 5000,
      padding: '1.5rem'
    }} onClick={onClose}>
      <div style={{
        backgroundColor: '#fff',
        padding: '3rem 2.5rem',
        maxWidth: '700px',
        width: '100%',
        position: 'relative',
        boxShadow: '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        animation: 'modalSlideUp 0.35s cubic-bezier(0.16, 1, 0.3, 1)'
      }} onClick={e => e.stopPropagation()}>
        <style>{`
            @keyframes modalSlideUp {
                from { opacity: 0; transform: translateY(30px); }
                to { opacity: 1; transform: translateY(0); }
            }
            .sg-table { width: 100%; border-collapse: collapse; margin: 2rem 0; border: 1px solid #f0f0f0; }
            .sg-table th { background: #f9f9f9; padding: 15px 10px; font-size: 0.7rem; text-transform: uppercase; border: 1px solid #f0f0f0; color: #666; letter-spacing: 1px; }
            .sg-table td { padding: 15px 10px; font-size: 0.9rem; text-align: center; border: 1px solid #f0f0f0; color: #111; }
            .sg-table tr:hover td { background-color: #fdfdfd; }
        `}</style>
        
        <button 
          onClick={onClose}
          aria-label="Cerrar guía de talles"
          style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', background: 'none', border: 'none', fontSize: '2rem', cursor: 'pointer', color: '#999', lineHeight: 1 }}
        >&times;</button>
        
        <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.8rem', marginBottom: '0.8rem', letterSpacing: '0.5px' }}>Guía de Medidas</h2>
        <p style={{ fontSize: '0.9rem', color: '#666', borderBottom: '1px solid #eee', paddingBottom: '1rem' }}>
            Encuentra tu calce perfecto. Las medidas indicadas en la tabla corresponden a la prenda extendida o al contorno sugerido en centímetros.
        </p>
        
        <div style={{ overflowX: 'auto' }}>
            <table className="sg-table">
            <thead>
                <tr>
                {data.headers.map((h, i) => <th key={i}>{h}</th>)}
                </tr>
            </thead>
            <tbody>
                {data.rows.map((row, ri) => (
                <tr key={ri}>
                    {row.map((cell, ci) => <td key={ci}>{cell}</td>)}
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem', marginTop: '1rem' }}>
            <div style={{ fontSize: '0.75rem', color: '#888', lineHeight: '1.6' }}>
                <strong>¿Cómo medir?</strong><br />
                Usa una cinta métrica flexible. Mide el pecho en la parte más ancha y la cintura en la parte más estrecha.
            </div>
            <div style={{ fontSize: '0.75rem', color: '#888', lineHeight: '1.6' }}>
                <strong>Dudas sobre el calce</strong><br />
                Si tus medidas están entre dos talles, elige el menor para un calce entallado o el mayor para un look más relajado.
            </div>
        </div>
      </div>
    </div>
  );
}
