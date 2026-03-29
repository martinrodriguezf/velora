'use client';

import { useState } from 'react';
import Link from 'next/link';
import { updateUserProfile } from '@/actions/authActions';

const mockOrderDetails = {
  'VL-59281': [
    { id: 1, name: 'Pantalón Lino Oasis', price: 7500.00, qty: 1, image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?auto=format&fit=crop&q=80&w=200' },
    { id: 2, name: 'Top Seda Minimal', price: 5000.00, qty: 1, image: 'https://images.unsplash.com/photo-1551163943-3f6a855d1153?auto=format&fit=crop&q=80&w=200' }
  ],
  'VL-41092': [
    { id: 3, name: 'Vestido Midi Arena', price: 8900.00, qty: 1, image: 'https://images.unsplash.com/photo-1496747611176-843222e1e57c?auto=format&fit=crop&q=80&w=200' }
  ]
};

export default function AccountDashboardClient({ user, orders, logoutAction }) {
  const [expandedOrderId, setExpandedOrderId] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState({ type: '', message: '' });

  const toggleOrder = (orderId) => {
    setExpandedOrderId(expandedOrderId === orderId ? null : orderId);
  };

  const handleUpdate = async (formData) => {
    setStatus({ type: 'loading', message: 'Guardando cambios...' });
    const result = await updateUserProfile(formData);
    if (result.success) {
      setStatus({ type: 'success', message: result.message });
      setTimeout(() => {
          setIsEditing(false);
          setStatus({ type: '', message: '' });
      }, 1500);
    } else {
      setStatus({ type: 'error', message: result.error });
    }
  };

  return (
    <div className="container" style={{ padding: '4rem 1rem', minHeight: '60vh' }}>
      <style>{`
        @keyframes slideDown {
          from { opacity: 0; transform: translateY(-10px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .form-group { margin-bottom: 1rem; }
        .form-group label { display: block; font-size: 0.8rem; font-weight: 600; color: #666; margin-bottom: 0.3rem; }
        .form-input { 
            width: 100%; 
            padding: 0.6rem; 
            border: 1px solid #ddd; 
            border-radius: 4px; 
            font-size: 0.9rem; 
            font-family: var(--font-sans);
        }
        .form-input:focus { border-color: #000; outline: none; }
      `}</style>
      
      <div style={{
        maxWidth: '1000px',
        margin: '0 auto',
        display: 'flex',
        flexDirection: 'column',
        gap: '3rem'
      }}>
        
        {/* Header Section */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', borderBottom: '1px solid #eaeaea', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem', marginBottom: '0.5rem' }}>Hola, {user.name}</h1>
            <p style={{ color: '#666' }}>{user.email}</p>
          </div>
          <form action={logoutAction}>
            <button 
              type="submit"
              className="btn-primary"
              style={{
                background: 'transparent',
                border: '1px solid #ccc',
                padding: '0.5rem 1rem',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.85rem',
                fontWeight: 500,
                color: '#666'
              }}
            >
              Cerrar Sesión
            </button>
          </form>
        </div>

        {/* Dashboard Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) 350px', gap: '3rem' }}>
          
          {/* Main Content: Orders */}
          <div>
            <h2 style={{ fontFamily: 'var(--font-serif)', fontSize: '1.5rem', marginBottom: '1.5rem' }}>Historial de Compra</h2>
            
            {orders.length > 0 ? (
              <div style={{ border: '1px solid #eaeaea', borderRadius: '8px', overflow: 'hidden' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '0.9rem' }}>
                  <thead style={{ background: '#f9f9f9', borderBottom: '1px solid #eaeaea' }}>
                    <tr>
                      <th style={{ padding: '1rem', fontWeight: 600, color: '#444' }}># Orden</th>
                      <th style={{ padding: '1rem', fontWeight: 600, color: '#444' }}>Fecha</th>
                      <th style={{ padding: '1rem', fontWeight: 600, color: '#444' }}>Estado</th>
                      <th style={{ padding: '1rem', fontWeight: 600, color: '#444', textAlign: 'right' }}>Total</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map((order) => {
                      const isExpanded = expandedOrderId === order.id;
                      const details = mockOrderDetails[order.id] || [];
                      
                      return (
                        <caption key={order.id} style={{ display: 'contents' }}>
                          <tr 
                            onClick={() => toggleOrder(order.id)}
                            style={{ 
                              borderBottom: isExpanded ? 'none' : '1px solid #eaeaea',
                              cursor: 'pointer',
                              background: isExpanded ? '#fcfcfc' : 'transparent',
                              transition: 'background 0.2s'
                            }}
                          >
                            <td style={{ padding: '1rem', fontWeight: 500 }}>
                              <span style={{ marginRight: '0.5rem', opacity: 0.3 }}>{isExpanded ? '▼' : '▶'}</span>
                              {order.id}
                            </td>
                            <td style={{ padding: '1rem', color: '#666' }}>{order.date}</td>
                            <td style={{ padding: '1rem' }}>
                              <span style={{ 
                                background: order.status === 'Entregado' ? '#dcfce7' : '#fef9c3', 
                                color: order.status === 'Entregado' ? '#166534' : '#854d0e',
                                padding: '0.25rem 0.5rem',
                                borderRadius: '4px',
                                fontSize: '0.8rem',
                                fontWeight: 500
                              }}>
                                {order.status}
                              </span>
                            </td>
                            <td style={{ padding: '1rem', textAlign: 'right', fontWeight: 500 }}>
                              ${order.total.toFixed(2)}
                            </td>
                          </tr>
                          
                          {isExpanded && (
                            <tr style={{ background: '#fcfcfc', borderBottom: '1px solid #eaeaea' }}>
                              <td colSpan="4" style={{ padding: '0 1rem 1.5rem 1.5rem' }}>
                                <div style={{ 
                                  padding: '1.5rem', 
                                  background: '#fff', 
                                  borderRadius: '6px', 
                                  border: '1px solid #f0f0f0',
                                  animation: 'slideDown 0.3s ease-out'
                                }}>
                                  <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', letterSpacing: '1px', color: '#888', marginBottom: '1rem' }}>Detalle de Compra</h4>
                                  <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                                    {details.map(item => (
                                      <div key={item.id} style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                                        <img src={item.image} alt={item.name} style={{ width: '45px', height: '60px', objectFit: 'cover', borderRadius: '4px' }} />
                                        <div style={{ flex: 1 }}>
                                          <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                                          <div style={{ fontSize: '0.8rem', color: '#666' }}>Cantidad: {item.qty}</div>
                                        </div>
                                        <div style={{ fontWeight: 500 }}>${item.price.toFixed(2)}</div>
                                      </div>
                                    ))}
                                  </div>
                                  <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px dashed #eaeaea', display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem' }}>
                                    <span style={{ color: '#666' }}>Método de Envío: Entrega Estándar</span>
                                    <strong>Subtotal: ${order.total.toFixed(2)}</strong>
                                  </div>
                                </div>
                              </td>
                            </tr>
                          )}
                        </caption>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            ) : (
              <div style={{ background: '#f9f9f9', padding: '3rem', textAlign: 'center', borderRadius: '8px', border: '1px solid #eaeaea' }}>
                <p style={{ color: '#666', marginBottom: '1rem' }}>Aún no has realizado ninguna compra.</p>
                <Link href="/shop" className="btn-primary" style={{ display: 'inline-block' }}>Explorar Colección</Link>
              </div>
            )}
          </div>

          {/* Sidebar Area: Settings or Addresses */}
          <div>
            <div style={{ background: '#fcfcfc', border: '1px solid #eaeaea', borderRadius: '8px', padding: '1.5rem' }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                Mis Datos
                {!isEditing && (
                    <button onClick={() => setIsEditing(true)} style={{ background: 'none', border: 'none', color: '#000', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.8rem' }}>Editar</button>
                )}
              </h3>

              {isEditing ? (
                <form action={handleUpdate}>
                  <input type="hidden" name="currentEmail" value={user.email} />
                  
                  <div className="form-group">
                    <label>Nombre</label>
                    <input className="form-input" type="text" name="name" defaultValue={user.name} required />
                  </div>
                  
                  <div className="form-group">
                    <label>Apellido</label>
                    <input className="form-input" type="text" name="lastName" defaultValue={user.lastName} required />
                  </div>

                  <div className="form-group">
                    <label>Email</label>
                    <input className="form-input" type="email" name="email" defaultValue={user.email} required />
                  </div>

                  <div className="form-group">
                    <label>Dirección de Envío</label>
                    <textarea 
                        className="form-input" 
                        name="address" 
                        defaultValue={user.address} 
                        rows="3" 
                        required
                        style={{ resize: 'none' }}
                    ></textarea>
                  </div>

                  <div style={{ borderTop: '1px solid #eaeaea', marginTop: '1.5rem', paddingTop: '1.5rem' }}>
                    <div className="form-group">
                        <label>Nueva Contraseña (opcional)</label>
                        <input className="form-input" type="password" name="newPassword" placeholder="Dejar en blanco para mantener" />
                    </div>

                    <div className="form-group" style={{ background: '#fff5f5', padding: '0.8rem', borderRadius: '4px', border: '1px solid #feb2b2' }}>
                        <label style={{ color: '#c53030' }}>Contraseña Actual (Requerido)</label>
                        <input className="form-input" type="password" name="currentPassword" required placeholder="Confirma tu identidad" />
                    </div>
                  </div>

                  {status.message && (
                      <div style={{ 
                          fontSize: '0.85rem', 
                          padding: '0.5rem', 
                          marginTop: '1rem',
                          borderRadius: '4px',
                          background: status.type === 'error' ? '#fff5f5' : (status.type === 'success' ? '#f0fff4' : '#f7fafc'),
                          color: status.type === 'error' ? '#c53030' : (status.type === 'success' ? '#2f855a' : '#2d3748'),
                          textAlign: 'center'
                      }}>
                        {status.message}
                      </div>
                  )}

                  <div style={{ display: 'flex', gap: '1rem', marginTop: '1.5rem' }}>
                    <button type="submit" className="btn-primary" style={{ flex: 1 }}>Guardar</button>
                    <button type="button" onClick={() => setIsEditing(false)} style={{ flex: 1, background: '#fff', border: '1px solid #ccc', cursor: 'pointer', borderRadius: '4px' }}>Cancelar</button>
                  </div>
                </form>
              ) : (
                <>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', marginBottom: '0.5rem' }}><strong>Nombre:</strong> {user.name} {user.lastName}</p>
                  <p style={{ margin: 0, fontSize: '0.9rem', color: '#444', marginBottom: '1.5rem' }}><strong>Email:</strong> {user.email}</p>
                  
                  <h3 style={{ fontSize: '1rem', fontWeight: 600, marginBottom: '1rem', borderBottom: '1px solid #eaeaea', paddingBottom: '0.5rem' }}>
                    Dirección Predeterminada
                  </h3>
                  <p style={{ margin: 0, fontSize: '0.85rem', color: '#666', lineHeight: 1.5, whiteSpace: 'pre-line' }}>
                    {user.address}
                  </p>
                  <button onClick={() => setIsEditing(true)} style={{ marginTop: '1rem', background: 'none', border: 'none', color: '#000', textDecoration: 'underline', cursor: 'pointer', fontSize: '0.85rem', padding: 0 }}>
                    Editar Perfil
                  </button>
                </>
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}
