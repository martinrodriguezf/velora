export const metadata = {
  title: 'Contacto | Velora',
};

export default function Contact() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '600px', margin: '0 auto', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '1rem', fontFamily: 'var(--font-serif)', textAlign: 'center' }}>Hablemos.</h1>
      <p style={{ textAlign: 'center', opacity: 0.8, marginBottom: '3rem' }}>Nuestro equipo de estilismo y soporte está disponible de lunes a viernes.</p>
      
      <form style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Nombre completo</label>
          <input type="text" placeholder="Tu nombre" style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Email</label>
          <input type="email" placeholder="tu@email.com" style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)', borderRadius: '4px' }} />
        </div>
        <div>
          <label style={{ display: 'block', marginBottom: '0.5rem', fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Mensaje</label>
          <textarea rows="6" placeholder="¿En qué podemos ayudarte?" style={{ width: '100%', padding: '1rem', border: '1px solid var(--color-border)', fontFamily: 'var(--font-sans)', resize: 'vertical', borderRadius: '4px' }}></textarea>
        </div>
        <button type="button" className="btn-primary">
          Enviar Mensaje
        </button>
      </form>
    </div>
  );
}
