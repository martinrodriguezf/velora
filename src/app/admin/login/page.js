'use client';

import { useState } from 'react';
import { loginAdmin } from '@/actions/authActions';

export default function AdminLogin() {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(formData) {
    setLoading(true);
    setError(null);
    const res = await loginAdmin(formData);
    if (res?.error) setError(res.error);
    setLoading(false);
  }

  return (
    <div style={{
      width: '100%',
      maxWidth: '420px',
      background: 'white',
      padding: '3rem 2rem',
      borderRadius: '8px',
      boxShadow: '0 10px 25px rgba(0,0,0,0.05)',
      border: '1px solid #eaeaea'
    }}>
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', letterSpacing: '1px', marginBottom: '0.5rem' }}>VELORA</h1>
        <p style={{ color: '#666', fontSize: '0.9rem', textTransform: 'uppercase', letterSpacing: '2px' }}>Admin Portal</p>
      </div>

      {error && (
        <div style={{ padding: '0.75rem', marginBottom: '1.5rem', background: '#fee2e2', color: '#991b1b', borderRadius: '4px', textAlign: 'center', fontSize: '0.9rem' }}>
          {error}
        </div>
      )}

      {/* Helper text for user to know the MVP credentials */}
      <div style={{ padding: '0.75rem', marginBottom: '1.5rem', background: '#f3f4f6', color: '#4b5563', borderRadius: '4px', fontSize: '0.8rem', textAlign: 'center' }}>
        <strong>Demo Login:</strong><br/>
        Email: admin@velora.com<br/>
        Pass: admin123
      </div>

      <form action={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        <div>
          <label htmlFor="email" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Correo Corporativo</label>
          <input type="email" id="email" name="email" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} defaultValue="admin@velora.com" />
        </div>
        
        <div>
          <label htmlFor="password" style={{ display: 'block', marginBottom: '0.5rem', fontWeight: 500, fontSize: '0.9rem' }}>Contraseña de Seguridad</label>
          <input type="password" id="password" name="password" required style={{ width: '100%', padding: '0.75rem', border: '1px solid var(--color-border)', borderRadius: '4px' }} defaultValue="admin123" />
        </div>

        <button type="submit" disabled={loading} className="btn-primary" style={{ marginTop: '1rem', width: '100%', padding: '1rem', opacity: loading ? 0.7 : 1 }}>
          {loading ? 'Verificando...' : 'Acceder al Panel'}
        </button>
      </form>
    </div>
  );
}
