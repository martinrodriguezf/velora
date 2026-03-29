import Link from 'next/link';
import staff from '@/data/staff.json';
import styles from '../../products/page.module.css';

export const metadata = {
  title: 'Gestión de Equipo | Velora Admin',
};

export default function TeamManagement() {
  const getBadgeColor = (role) => {
    switch (role) {
      case 'Super Admin': return { bg: '#e8eaf6', text: '#1a237e' };
      case 'Editor de Catálogo': return { bg: '#e3f2fd', text: '#0d47a1' };
      case 'Soporte y Ventas': return { bg: '#f1f8e9', text: '#33691e' };
      case 'Growth / Marketing': return { bg: '#fff3e0', text: '#e65100' };
      case 'Redes Sociales': return { bg: '#f3e5f5', text: '#4a148c' };
      default: return { bg: '#f5f5f5', text: '#666' };
    }
  };

  return (
    <div>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem' }}>Seguridad y Equipo</h1>
          <p style={{ color: '#666' }}>Gestioná los accesos y roles de tu equipo de trabajo.</p>
        </div>
        <button style={{ padding: '0.8rem 1.5rem', background: 'var(--color-foreground)', color: 'var(--color-background)', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 600 }}>
          + Invitar Miembro
        </button>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Miembro</th>
              <th>Rol / Permisos</th>
              <th>Estado</th>
              <th>Último Acceso</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {staff.map((member) => {
              const colors = getBadgeColor(member.role);
              return (
                <tr key={member.id}>
                  <td>
                    <div style={{ fontWeight: 600 }}>{member.name}</div>
                    <div style={{ fontSize: '0.85rem', color: '#888' }}>{member.email}</div>
                  </td>
                  <td>
                    <span style={{ 
                      padding: '0.2rem 0.6rem', 
                      background: colors.bg, 
                      color: colors.text, 
                      borderRadius: '12px', 
                      fontSize: '0.75rem', 
                      fontWeight: 600,
                      textTransform: 'uppercase'
                    }}>
                      {member.role}
                    </span>
                  </td>
                  <td>
                    <span style={{ 
                      display: 'inline-block', 
                      width: '8px', 
                      height: '8px', 
                      borderRadius: '50%', 
                      background: member.status === 'Active' ? '#4caf50' : '#bdbdbd',
                      marginRight: '0.5rem'
                    }}></span>
                    {member.status}
                  </td>
                  <td style={{ color: '#666', fontSize: '0.9rem' }}>
                    {new Date(member.lastLogin).toLocaleString()}
                  </td>
                  <td>
                    <button style={{ background: 'none', border: 'none', color: '#d32f2f', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 500 }}>Revocar</button>
                    <span style={{ margin: '0 0.5rem', color: '#ddd' }}>|</span>
                    <button style={{ background: 'none', border: 'none', color: '#555', cursor: 'pointer', fontSize: '0.9rem' }}>Editar</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '3rem', padding: '2rem', background: '#f9f9f9', borderRadius: '8px', border: '1px dashed #ccc' }}>
        <h3 style={{ fontFamily: 'var(--font-serif)', marginBottom: '1rem' }}>Resumen de Permisos por Rol</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem' }}>
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#1a237e' }}>Super Admin</h4>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>Acceso total a la configuración, reportes, pagos y equipo.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#0d47a1' }}>Editor de Catálogo</h4>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>Solo puede gestionar productos, stock y categorías.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#4a148c' }}>Redes Sociales</h4>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>Acceso a catálogo y feeds de integración para Social Commerce.</p>
          </div>
          <div>
            <h4 style={{ fontSize: '0.9rem', textTransform: 'uppercase', color: '#e65100' }}>Marketing</h4>
            <p style={{ fontSize: '0.85rem', color: '#666' }}>Gestión de cupones, campañas y lectura de reportes.</p>
          </div>
        </div>
      </div>
    </div>
  );
}
