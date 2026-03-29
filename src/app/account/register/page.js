'use client';

import Link from 'next/link';
import { registerUser } from '@/actions/authActions';

export default function RegisterPage() {
  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Crear Cuenta</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Únete a Velora para un checkout más rápido y sorpresas exclusivas.
      </p>

      <form action={registerUser} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
          <div>
            <label htmlFor="firstName" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Nombre</label>
            <input type="text" id="firstName" name="firstName" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>
          <div>
            <label htmlFor="lastName" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Apellido</label>
            <input type="text" id="lastName" name="lastName" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          </div>
        </div>

        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Correo Electrónico</label>
          <input type="email" id="email" name="email" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
        </div>
        
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contraseña</label>
          <input type="password" id="password" name="password" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
        </div>

        <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.5rem', marginTop: '0.5rem' }}>
          <input type="checkbox" id="newsletter" style={{ marginTop: '0.25rem' }} />
          <label htmlFor="newsletter" style={{ fontSize: '0.85rem', color: '#666', lineHeight: 1.4 }}>
            Quiero recibir información sobre nuevas colecciones, acceso anticipado y 10% OFF.
          </label>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
          Registrarse
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ color: '#666', marginBottom: '1rem' }}>¿Ya tienes cuenta?</p>
        <Link href="/account/login" style={{ fontWeight: 600, color: '#000' }}>Inicia Sesión</Link>
      </div>
    </div>
  );
}
