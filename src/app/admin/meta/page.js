export const metadata = {
  title: 'Meta Commerce API | Admin',
};

export default function MetaIntegration() {
  return (
    <div>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Instagram & Facebook Shopping</h1>
        <p>Conecta Velora directamente al catálogo de Meta para vender en redes sociales.</p>
      </div>

      <div style={{background: 'white', padding: '3rem', borderRadius: '6px', border: '1px solid var(--color-border)', maxWidth: '800px'}}>
        <h3 style={{marginBottom: '1rem'}}>Sincronización de Catálogo</h3>
        <p style={{marginBottom: '2rem', lineHeight: '1.6'}}>
          Hemos creado una ruta nativa que traduce automáticamente tu inventario (todo lo que cargues en la pestaña "Productos") a un archivo CSV estructurado según los exigentes requisitos de Facebook Commerce Manager. 
        </p>
        
        <div style={{background: '#f7f5f2', padding: '1.5rem', borderRadius: '4px', marginBottom: '2rem', border: '1px solid #e3dfd3'}}>
          <h4 style={{marginBottom: '0.5rem', fontSize: '0.9rem', textTransform: 'uppercase', color: '#666'}}>Tu Enlace de Sincronización (Data Feed URL):</h4>
          <code style={{fontSize: '1.1rem', wordBreak: 'break-all'}}>
            https://tu-dominio-final.com/api/feed
          </code>
        </div>

        <h4 style={{marginBottom: '1rem'}}>¿Cómo utilizarlo?</h4>
        <ol style={{paddingLeft: '1.5rem', lineHeight: '1.8'}}>
          <li>Inicia sesión en tu Facebook Business Manager.</li>
          <li>Dirígete a <strong>Commerce Manager</strong> (Gestor de Ventas).</li>
          <li>Crea un Catálogo nuevo tipo "Comercio Electrónico / Ropa".</li>
          <li>En el método de subida, selecciona <strong>Data Feed (Lista de Datos programada)</strong>.</li>
          <li>Copia y pega la URL de arriba. Meta descargará automáticamente este CSV todos los días, manteniendo los precios y el stock de Instagram sincronizados mágicamente con tu panel de Velora.</li>
        </ol>
      </div>
    </div>
  );
}
