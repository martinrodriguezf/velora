"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { logoutAdmin } from '@/actions/authActions';

export default function SidebarNav() {
  const pathname = usePathname();
  const isReportsActive = pathname.startsWith('/admin/reports');
  const isIntegrationsActive = pathname.startsWith('/admin/integrations');
  const isSettingsActive = pathname.startsWith('/admin/settings');

  const linkStyle = (path) => ({
    display: 'block',
    padding: '0.75rem 1rem',
    textDecoration: 'none',
    color: pathname === path || (path !== '/admin/reports' && path !== '/admin/integrations' && path !== '/admin/settings' && pathname.startsWith(path)) ? 'var(--color-foreground)' : '#555',
    fontWeight: pathname === path ? 600 : 500,
    background: pathname === path ? '#f5f5f5' : 'transparent',
    borderRadius: '6px',
    transition: 'all 0.2s',
  });

  const submenuStyle = (path) => ({
    display: 'block',
    padding: '0.4rem 1rem 0.4rem 2.5rem',
    textDecoration: 'none',
    color: pathname === path ? 'var(--color-foreground)' : '#888',
    fontWeight: pathname === path ? 500 : 400,
    fontSize: '0.86rem',
    borderLeft: pathname === path ? '2px solid var(--color-foreground)' : '2px solid transparent',
  });

  return (
    <nav style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
      <Link href="/admin" style={linkStyle('/admin')}>Dashboard</Link>
      <Link href="/admin/products" style={linkStyle('/admin/products')}>Inventario</Link>
      <Link href="/admin/categories" style={linkStyle('/admin/categories')}>Categorías</Link>
      <Link href="/admin/orders" style={linkStyle('/admin/orders')}>Órdenes</Link>
      <Link href="/admin/storefront" style={linkStyle('/admin/storefront')}>Storefront (CMS)</Link>
      <hr style={{margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--color-border)'}} />
      
      <Link href="/admin/reports" style={linkStyle('/admin/reports')}>Reportes & Crecimiento</Link>
      {isReportsActive && (
         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '-0.3rem', marginBottom: '0.3rem' }}>
            <Link href="/admin/reports/categories" style={submenuStyle('/admin/reports/categories')}>↳ Desglose Categorías</Link>
            <Link href="/admin/reports/retention" style={submenuStyle('/admin/reports/retention')}>↳ Cohortes Retención</Link>
            <Link href="/admin/reports/registrations" style={submenuStyle('/admin/reports/registrations')}>↳ Evolución Registros</Link>
            <Link href="/admin/reports/abandoned-carts" style={submenuStyle('/admin/reports/abandoned-carts')}>↳ Carritos Abandonados</Link>
         </div>
      )}

      <Link href="/admin/marketing" style={linkStyle('/admin/marketing')}>Marketing & Cupones</Link>
      <Link href="/admin/users" style={linkStyle('/admin/users')}>CRM & Clientes</Link>
      <hr style={{margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--color-border)'}} />

      <Link href="/admin/integrations" style={linkStyle('/admin/integrations')}>App Store & Conexiones</Link>
      {isIntegrationsActive && (
         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '-0.3rem', marginBottom: '0.3rem' }}>
            <Link href="/admin/integrations/payments" style={submenuStyle('/admin/integrations/payments')}>↳ Medios de Pago</Link>
            <Link href="/admin/integrations/auth" style={submenuStyle('/admin/integrations/auth')}>↳ Social Auth & SSO</Link>
            <Link href="/admin/integrations/mailing" style={submenuStyle('/admin/integrations/mailing')}>↳ Autorepondedores (Mailing)</Link>
            <Link href="/admin/integrations/support" style={submenuStyle('/admin/integrations/support')}>↳ Soporte y Chatbots</Link>
         </div>
      )}

      <Link href="/admin/settings/team" style={linkStyle('/admin/settings/team')}>⚙️ Seguridad y Equipo</Link>
      {isSettingsActive && (
         <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem', marginTop: '-0.3rem', marginBottom: '0.3rem' }}>
            <Link href="/admin/settings/team" style={submenuStyle('/admin/settings/team')}>↳ Gestión de Equipo</Link>
         </div>
      )}

      <hr style={{margin: '0.5rem 0', border: 'none', borderTop: '1px solid var(--color-border)'}} />
      <button 
        onClick={() => logoutAdmin()} 
        style={{ ...linkStyle(''), color: '#ef4444', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', width: '100%' }}
      >
        Cerrar Sesión
      </button>
    </nav>
  );
}
