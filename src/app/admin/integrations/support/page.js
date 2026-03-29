import Link from 'next/link';

export const metadata = {
  title: 'Soporte y AI | Velora Admin',
};

export default function SupportIntegrations() {
  return (
    <div>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <div style={{display: 'flex', alignItems: 'center', gap: '1rem', marginBottom: '1rem'}}>
           <Link href="/admin/integrations" style={{ textDecoration: 'none', color: '#666' }}>← Volver</Link>
        </div>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Soporte y Chatbots</h1>
        <p style={{color: '#666'}}>Automatiza la atención al cliente y retiene ventas simulando respuestas instantáneas.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: '1.5rem' }}>
         <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>📱</span>
                <div>
                   <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0 }}>WhatsApp Business</h3>
                   <span style={{ fontSize: '0.8rem', color: '#10b981', background: '#d1fae5', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginTop: '0.5rem' }}>Conectado (Simulado)</span>
                </div>
              </div>
            </div>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              Botón flotante en toda la tienda que dirige directamente al WhatsApp de atención al cliente.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
               <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                 <label style={{ fontSize: '0.85rem', fontWeight: 'bold' }}>Número de Contacto</label>
                 <input type="text" value="+54 9 11 1234-5678" disabled style={{ padding: '0.75rem', border: '1px solid #ccc', borderRadius: '4px', background: '#f9f9f9' }} />
               </div>
               <button className="btn-primary" style={{ opacity: 0.7, cursor: 'not-allowed' }}>Desconectar WhatsApp</button>
            </div>
         </div>

         <div style={{ background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '2.5rem' }}>🤖</span>
                <div>
                   <h3 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.25rem', margin: 0 }}>Asistente AI Velora</h3>
                   <span style={{ fontSize: '0.8rem', color: '#6b7280', background: '#f3f4f6', padding: '0.2rem 0.5rem', borderRadius: '4px', display: 'inline-block', marginTop: '0.5rem' }}>Activo (Demo Front-end)</span>
                </div>
              </div>
              <div style={{ background: '#000', borderRadius: '30px', width: '50px', height: '26px', padding: '3px', cursor: 'pointer', display: 'flex', justifyContent: 'flex-end', alignItems: 'center', transition: 'all 0.3s' }}>
                 <div style={{ background: '#fff', width: '20px', height: '20px', borderRadius: '50%' }}></div>
              </div>
            </div>
            <p style={{ color: '#666', fontSize: '0.95rem', lineHeight: '1.5', marginBottom: '1.5rem' }}>
              Agente Virtual entrenado con tus políticas de devolución y base de conocimientos de FAQ.
            </p>
            
            <div style={{ background: '#f3f4f6', padding: '1rem', borderRadius: '6px', fontSize: '0.85rem' }}>
               <strong>Respuesta Default de Bienvenida configurada:</strong>
               <p style={{ fontStyle: 'italic', marginTop: '0.5rem', color: '#444' }}>"¡Hola! Soy el asistente virtual de Velora. ¿En qué te ayudo? Puedo informarte sobre nuestros envíos sin costo (compras mayores a $150) o responder dudas sobre talles."</p>
            </div>
         </div>
      </div>
    </div>
  );
}
