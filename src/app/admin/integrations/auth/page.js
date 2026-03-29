import Link from 'next/link';

export const metadata = {
  title: 'Integraciones: Auth | Velora Admin',
};

export default function AuthIntegrations() {
  return (
    <div>
      <Link href="/admin/integrations" style={{ color: '#0d47a1', textDecoration: 'none', marginBottom: '1rem', display: 'inline-block' }}>&larr; Volver a App Store</Link>
      <div style={{marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Autenticación Social (SSO)</h1>
        <p style={{color: '#666'}}>Permite a tus clientes iniciar sesión evitando claves y mejorando conversión.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'minmax(300px, 400px)', gap: '1.5rem' }}>
         <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#fbe9e7', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#d84315' }}>G</div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Google Auth</h3>
               </div>
               <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#e8f5e9', color: '#2e7d32', borderRadius: '12px', fontWeight: 500 }}>Activa</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Login automático con cuenta de Google. Reduce abandono 15%.</p>
            <button style={{ padding: '0.6rem', border: '1px solid var(--color-border)', background: '#f5f5f5', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>OAuth Settings</button>
         </div>

         <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#111', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#fff' }}></div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Apple Sign-In</h3>
               </div>
               <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#f5f5f5', color: '#888', borderRadius: '12px', fontWeight: 500 }}>No conectada</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Obligatorio para publicarse en la App Store en el futuro.</p>
            <button style={{ padding: '0.6rem', border: 'none', background: 'var(--color-foreground)', color: 'var(--color-background)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Conectar App</button>
         </div>

         <div style={{ background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)', display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
               <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <div style={{ width: '40px', height: '40px', background: '#e8eaf6', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.2rem', color: '#3f51b5' }}>M</div>
                  <h3 style={{ fontSize: '1.1rem', margin: 0 }}>Meta (Insta/FB)</h3>
               </div>
               <span style={{ fontSize: '0.8rem', padding: '0.2rem 0.6rem', background: '#f5f5f5', color: '#888', borderRadius: '12px', fontWeight: 500 }}>Desconectada (Revocada)</span>
            </div>
            <p style={{ color: '#666', fontSize: '0.9rem', margin: 0 }}>Permite crear cuentas importando fotos directamente de Instagram.</p>
            <button style={{ padding: '0.6rem', border: 'none', background: 'var(--color-foreground)', color: 'var(--color-background)', borderRadius: '4px', cursor: 'pointer', fontWeight: 500 }}>Re-conectar</button>
         </div>
      </div>
    </div>
  );
}
