import Link from 'next/link';

export const metadata = {
  title: 'Integraciones: Mailing | Velora Admin',
};

export default function MailingIntegrations() {
  return (
    <div>
      <Link href="/admin/integrations" style={{ color: '#0d47a1', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Volver a App Store</Link>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Plataformas de Mailing</h1>
        <p style={{color: '#666'}}>Controlá las plataformas encargadas de automatizar flujos y newsletters.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px)', gap: '1.5rem' }}>
         <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#fff9c4', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#fbc02d' }}>MC</div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Mailchimp</h3>
               </div>
               <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '12px', fontWeight: 500 }}>Activa</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Sincronizando 124 leads actualmente. Flujo de Abandono de Carrito ON.</p>
            <button style={{ padding: '0.6rem', border: '1px solid var(--color-border)', background: '#f5f5f5', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Manejar Audiencias</button>
         </div>

         <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#f5f5f5', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#111' }}>R</div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Resend</h3>
               </div>
               <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#f5f5f5', color: '#888', borderRadius: '12px', fontWeight: 500 }}>No conectada</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Envío avanzado de emails transaccionales basados en React.</p>
            <button style={{ padding: '0.6rem', border: 'none', background: 'var(--color-foreground)', color: 'var(--color-background)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Conectar API Key</button>
         </div>
      </div>
    </div>
  );
}
