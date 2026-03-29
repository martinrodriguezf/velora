import coupons from '@/data/coupons.json';
import { createCoupon, deleteCoupon } from '@/actions/couponActions';
import styles from '../products/page.module.css';

export const metadata = {
  title: 'Marketing | Admin',
};

export default function Marketing() {
  return (
    <div>
      <div style={{marginBottom: '3rem', paddingBottom: '1rem', borderBottom: '1px solid var(--color-border)'}}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2rem', marginBottom: '0.5rem'}}>Marketing & Promociones</h1>
        <p>Potenciá tus ventas a través de incentivos y retargeting.</p>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '2rem' }}>
        {/* Formulario de Creación de Cupón */}
        <div style={{background: 'white', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)', height: 'fit-content'}}>
           <h3 style={{marginBottom: '1.5rem'}}>Crear Nuevo Cupón</h3>
           <form action={createCoupon} style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
             <div>
               <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500}}>Código (ej. VERANO20)</label>
               <input type="text" name="code" required style={{width: '100%', padding: '0.8rem', border: '1px solid var(--color-border)', borderRadius: '4px'}} placeholder="Ingresa código..." />
             </div>
             <div>
               <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500}}>Descuento (%)</label>
               <input type="number" name="discountPercent" required min="1" max="99" style={{width: '100%', padding: '0.8rem', border: '1px solid var(--color-border)', borderRadius: '4px'}} placeholder="15" />
             </div>
             <div>
               <label style={{display: 'block', fontSize: '0.85rem', marginBottom: '0.4rem', fontWeight: 500}}>Fecha de Expiración</label>
               <input type="date" name="expiresAt" required style={{width: '100%', padding: '0.8rem', border: '1px solid var(--color-border)', borderRadius: '4px'}} />
             </div>
             <button type="submit" className="btn-primary" style={{marginTop: '1rem'}}>Generar Cupón</button>
           </form>
        </div>

        {/* Lista de Cupones Activos */}
        <div>
           <h3 style={{marginBottom: '1.5rem'}}>Cupones Activos en Base de Datos</h3>
           <div className={styles.tableContainer} style={{marginBottom: '2rem'}}>
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>Código</th>
                  <th>Dcto.</th>
                  <th>Vencimiento</th>
                  <th>Acciones</th>
                </tr>
              </thead>
              <tbody>
                {coupons.length === 0 && <tr><td colSpan="4" style={{textAlign: 'center', color: '#888'}}>No hay cupones activos.</td></tr>}
                {coupons.map(coupon => {
                  const isExpired = new Date(coupon.expiresAt) < new Date();
                  return (
                  <tr key={coupon.code}>
                    <td style={{fontWeight: 'bold', letterSpacing: '1px', color: isExpired ? '#ccc' : '#333'}}> {coupon.code}</td>
                    <td>{coupon.discountPercent}%</td>
                    <td>
                       {coupon.expiresAt} 
                       {isExpired && <span style={{marginLeft: '0.5rem', color: '#d32f2f', fontSize: '0.8rem'}}>(Vencido)</span>}
                    </td>
                    <td>
                      <form action={deleteCoupon}>
                         <input type="hidden" name="code" value={coupon.code} />
                         <button type="submit" style={{background: 'none', border: 'none', color: '#d32f2f', textDecoration: 'underline', cursor: 'pointer'}}>Eliminar</button>
                      </form>
                    </td>
                  </tr>
                )})}
              </tbody>
            </table>
          </div>

          <div style={{background: '#f7f5f2', padding: '1.5rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
             <p style={{fontSize: '0.9rem', color: '#666', lineHeight: '1.6'}}>
                <strong>Nota de Integración:</strong> Cualquier cupón listado aquí ya es válido en el Checkout público de Velora de forma automática (siempre que la fecha actual sea anterior al vencimiento).
             </p>
          </div>
        </div>

      </div>
    </div>
  );
}
