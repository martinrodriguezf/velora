import users from '@/data/users.json';
import styles from '../products/page.module.css';

export const metadata = {
  title: 'CRM Clientes | Admin',
};

export default function UsersCRM() {
  return (
    <div>
      <div style={{marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Base de Clientes (CRM)</h1>
        <p>Gestión del capital humano, fidelización y control de staff.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.5rem', marginBottom: '3rem' }}>
         <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <h3 style={{fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Total Suscriptores</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)'}}>{users.filter(u => u.status === 'Suscripto').length}</p>
         </div>
         <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <h3 style={{fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Clientes VIP</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)'}}>{users.filter(u => u.role.includes('VIP')).length}</p>
         </div>
         <div style={{background: 'white', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
            <h3 style={{fontSize: '0.85rem', color: '#666', textTransform: 'uppercase', marginBottom: '0.5rem'}}>Staff & Admins</h3>
            <p style={{fontSize: '2rem', fontWeight: 'bold', fontFamily: 'var(--font-serif)'}}>{users.filter(u => u.role.includes('Admin')).length}</p>
         </div>
      </div>

      <div className={styles.tableContainer}>
        <div style={{padding: '1.5rem', display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--color-border)'}}>
           <h3 style={{fontFamily: 'var(--font-serif)'}}>Listado Global</h3>
           <input type="text" placeholder="Buscar por nombre o correo..." style={{padding: '0.5rem', borderRadius: '4px', border: '1px solid #ccc', minWidth: '250px'}} />
        </div>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Avatar</th>
              <th>Nombre y Contacto</th>
              <th>Rol</th>
              <th>Newsletter</th>
              <th>Estado / Compras</th>
            </tr>
          </thead>
          <tbody>
            {users.map(user => (
              <tr key={user.id}>
                <td style={{color: '#888', fontSize: '0.85rem'}}>{user.id}</td>
                <td>
                   <div style={{width: '35px', height: '35px', borderRadius: '50%', backgroundColor: user.role === 'Administrador' ? '#222' : '#f0f0f0', color: user.role === 'Administrador' ? 'white' : '#555', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.85rem'}}>
                     {user.name.charAt(0)}
                   </div>
                </td>
                <td>
                   <div style={{fontWeight: 500}}>{user.name}</div>
                   <div style={{fontSize: '0.85rem', color: '#666'}}>{user.email}</div>
                </td>
                <td>
                   {user.role === 'Administrador' ? (
                     <span style={{background: '#e3f2fd', color: '#0d47a1', padding: '0.2rem 0.6rem', borderRadius: '12px', fontSize: '0.8rem', fontWeight: 500}}>{user.role}</span>
                   ) : (
                     <span style={{color: '#444', fontSize: '0.9rem'}}>{user.role}</span>
                   )}
                </td>
                <td>
                   {user.status === 'Suscripto' 
                    ? <span style={{color: '#4caf50', display: 'flex', alignItems: 'center', gap: '4px'}}><div style={{width: 8, height: 8, borderRadius: '50%', background: '#4caf50'}}></div> Activo</span>
                    : <span style={{color: '#888'}}>Opt-out</span>}
                </td>
                <td style={{fontWeight: 500, color: '#333'}}>
                  {user.purchases} órdenes completadas
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
