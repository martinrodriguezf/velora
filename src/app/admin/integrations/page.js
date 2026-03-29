import Link from 'next/link';

export const metadata = {
  title: 'App Store de Servicios | Velora Admin',
};

export default function IntegrationsRoot() {
  return (
    <div>
      <div style={{marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>App Store & Conexiones</h1>
        <p style={{color: '#666'}}>Expandí las capacidades de tu tienda conectando con servicios líderes de la industria.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '1.5rem' }}>
         <Link href="/admin/integrations/payments" style={{ textDecoration: 'none', color: 'inherit' }}>
           <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💳</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Pasarelas de Pago</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>Conectá Stripe, Mercado Pago o PayPal para comenzar a recibir cobros internacionales o locales automáticos.</p>
           </div>
         </Link>

         <Link href="/admin/integrations/auth" style={{ textDecoration: 'none', color: 'inherit' }}>
           <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>🔐</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Autenticación Social (SSO)</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>Permite a tus clientes registrarse en 1 click usando sus cuentas de Google, Apple o Instagram (Meta).</p>
           </div>
         </Link>

         <Link href="/admin/integrations/mailing" style={{ textDecoration: 'none', color: 'inherit' }}>
           <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>📧</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Plataformas de Mailing</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>Sincronizá Resend, Klaviyo o Mailchimp para disparar campañas y automatizar carritos abandonados.</p>
           </div>
         </Link>

         <Link href="/admin/integrations/support" style={{ textDecoration: 'none', color: 'inherit' }}>
           <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)', cursor: 'pointer', transition: 'transform 0.2s, box-shadow 0.2s', boxShadow: '0 2px 8px rgba(0,0,0,0.05)' }}>
              <div style={{ fontSize: '2rem', marginBottom: '1rem' }}>💬</div>
              <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', marginBottom: '0.5rem' }}>Soporte y Chatbots</h3>
              <p style={{ color: '#666', fontSize: '0.9rem', lineHeight: '1.4' }}>Conectá WhatsApp Business y Asistentes Virtuales IA para responder dudas en tiempo real y escalar tus ventas.</p>
           </div>
         </Link>
      </div>
    </div>
  );
}
