'use client';

import { useState } from 'react';
import Link from 'next/link';
import { loginUser } from '@/actions/authActions';

export default function LoginPage() {
  const [error, setError] = useState(null);

  async function handleSubmit(formData) {
    const res = await loginUser(formData);
    if (res?.error) setError(res.error);
  }

  return (
    <div style={{ maxWidth: '400px', margin: '4rem auto', padding: '0 1rem' }}>
      <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '1rem', textAlign: 'center' }}>Ingresar</h1>
      <p style={{ textAlign: 'center', color: '#666', marginBottom: '2rem' }}>
        Accede a tu cuenta para ver tus órdenes y guardar tus favoritos.
      </p>

      {error && (
        <div style={{ padding: '0.75rem', marginBottom: '1.5rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', textAlign: 'center' }}>
          {error}
        </div>
      )}

      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Correo Electrónico</label>
          <input type="email" id="email" name="email" required placeholder="tu@email.com" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
        </div>
        
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500 }}>Contraseña</label>
          <input type="password" id="password" name="password" required placeholder="••••••••" style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} />
          <div style={{ textAlign: 'right', marginTop: '0.5rem' }}>
            <Link href="#" style={{ fontSize: '0.85rem', color: '#666' }}>¿Olvidaste tu contraseña?</Link>
          </div>
        </div>

        <button type="submit" className="btn-primary" style={{ marginTop: '0.5rem', width: '100%' }}>
          Iniciar Sesión
        </button>
      </form>

      <div style={{ textAlign: 'center', marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid var(--color-border)' }}>
        <p style={{ color: '#666', marginBottom: '1rem' }}>¿No tienes cuenta?</p>
        <Link href="/account/register" style={{ fontWeight: 600, color: '#000' }}>Crear Cuenta</Link>
      </div>
    </div>
  );
}
