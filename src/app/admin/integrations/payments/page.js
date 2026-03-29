import Link from 'next/link';

export const metadata = {
  title: 'Integraciones: Pagos | Velora Admin',
};

export default function PaymentsIntegrations() {
  return (
    <div>
      <Link href="/admin/integrations" style={{ color: '#0d47a1', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Volver a App Store</Link>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Pasarelas de Pago</h1>
        <p style={{color: '#666'}}>Configurá las plataformas financieras para procesar transacciones.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px)', gap: '1.5rem' }}>
         {/* Tarjeta Conectada */}
         <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#e3f2fd', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#1565c0' }}>S</div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Stripe (Global)</h3>
               </div>
               <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '12px', fontWeight: 500 }}>Activa</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Procesa pagos internacionales con tarjeta de crédito/débito en USD y Euros.</p>
            <button style={{ padding: '0.6rem', border: '1px solid var(--color-border)', background: '#f5f5f5', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Configurar Credenciales</button>
         </div>

         {/* Tarjeta Desconectada */}
         <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#e1f5fe', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', fontWeight: 'bold', color: '#0277bd' }}>MP</div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Mercado Pago</h3>
               </div>
               <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#f5f5f5', color: '#888', borderRadius: '12px', fontWeight: 500 }}>No conectada</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Permite a clientes de LATAM pagar en moneda local y cuotas.</p>
            <button style={{ padding: '0.6rem', border: 'none', background: 'var(--color-foreground)', color: 'var(--color-background)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Conectar App</button>
         </div>
      </div>
    </div>
  );
}
