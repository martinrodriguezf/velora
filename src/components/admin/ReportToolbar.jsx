"use client";

export default function ReportToolbar({ onSearch }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', background: 'white', padding: '1rem 1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', marginBottom: '2rem' }}>
       <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
         <select style={{ padding: '0.6rem 1rem', borderRadius: '4px', border: '1px solid #ccc', background: '#fcfcfc', fontFamily: 'inherit', fontSize: '0.9rem', cursor: 'pointer', outline: 'none' }}>
           <option>Últimos 30 días</option>
           <option>Este mes</option>
           <option>Mes pasado</option>
           <option>Histórico completo</option>
         </select>
         <div style={{ position: 'relative' }}>
            <span style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#888', pointerEvents: 'none' }}>
               <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            </span>
            <input 
              type="text" 
              placeholder="Filtrar reporte..." 
              onChange={e => onSearch && onSearch(e.target.value)}
              style={{ padding: '0.6rem 1rem 0.6rem 2.2rem', borderRadius: '4px', border: '1px solid #ccc', width: '250px', fontFamily: 'inherit', fontSize: '0.9rem', outline: 'none' }} 
            />
         </div>
       </div>
       <div>
         <button onClick={() => alert('La exportación de reportes CSV estará habilitada en Producción.')} style={{ padding: '0.6rem 1.2rem', background: '#f5f5f5', border: '1px solid #ddd', borderRadius: '4px', cursor: 'pointer', fontFamily: 'inherit', fontSize: '0.9rem', fontWeight: 500, display: 'flex', alignItems: 'center', gap: '0.5rem', color: '#333' }}>
           <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>
           Exportar Reporte
         </button>
       </div>
    </div>
  )
}
