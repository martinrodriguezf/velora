"use client";

import { useState } from 'react';
import { verifyCouponCode } from '@/actions/verifyCoupon';

export default function CheckoutSummary({ initialTotal }) {
   const [couponCode, setCouponCode] = useState('');
   const [discount, setDiscount] = useState(0);
   const [error, setError] = useState('');
   const [successMsg, setSuccessMsg] = useState('');
   
   const handleApply = async () => {
      setError('');
      setSuccessMsg('');
      if (!couponCode) return;
      
      const result = await verifyCouponCode(couponCode);
      if (result.error) {
        setError(result.error);
        setDiscount(0);
      } else {
        setDiscount(result.discountPercent);
        setSuccessMsg(`¡Cupón de ${result.discountPercent}% aplicado exitosamente!`);
        setError('');
      }
   };
   
   const discountAmount = initialTotal * (discount / 100);
   const totalAfterDiscount = initialTotal - discountAmount;

   return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '1.5rem', background: '#fdfcfb', padding: '2rem', borderRadius: '8px', border: '1px solid var(--color-border)'}}>
      
      {/* Static Mock Items For MVP Context */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '1rem'}}>
         <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}><span style={{fontWeight: 500}}>The Oversized Linen Blazer</span><span style={{color: '#666'}}>$120.00</span></div>
         <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '0.9rem'}}><span style={{fontWeight: 500}}>Pleated Trouser</span><span style={{color: '#666'}}>$85.00</span></div>
      </div>
      
      {/* Coupon Engine */}
      <div style={{borderBottom: '1px solid var(--color-border)', paddingBottom: '1.5rem'}}>
         <div style={{display: 'flex', gap: '0.5rem'}}>
           <input 
             type="text" 
             value={couponCode} 
             onChange={e => setCouponCode(e.target.value)} 
             placeholder="Código de descuento"
             style={{flex: 1, padding: '0.8rem', border: '1px solid #ccc', borderRadius: '4px', textTransform: 'uppercase'}} 
           />
           <button type="button" onClick={handleApply} style={{padding: '0 1.5rem', background: 'var(--color-foreground)', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 500}}>Aplicar</button>
         </div>
         {error && <p style={{color: '#d32f2f', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500}}>{error}</p>}
         {successMsg && <p style={{color: '#4caf50', fontSize: '0.85rem', marginTop: '0.5rem', fontWeight: 500}}>{successMsg}</p>}
      </div>
      
      {/* Totals Engine */}
      <div style={{display: 'flex', flexDirection: 'column', gap: '0.5rem'}}>
         <div style={{display: 'flex', justifyContent: 'space-between', color: '#666'}}>
            <span>Subtotal</span>
            <span>${initialTotal.toFixed(2)} USD</span>
         </div>
         <div style={{display: 'flex', justifyContent: 'space-between', color: '#666'}}>
            <span>Envío Estándar</span>
            <span>Calculado en prox pago</span>
         </div>
         {discount > 0 && (
            <div style={{display: 'flex', justifyContent: 'space-between', color: '#4caf50', fontWeight: 'bold'}}>
               <span style={{display: 'flex', alignItems: 'center', gap: '0.5rem'}}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M20.59 13.41l-7.17 7.17a2 2 0 0 1-2.83 0L2 12V2h10l8.59 8.59a2 2 0 0 1 0 2.82z"></path><line x1="7" y1="7" x2="7.01" y2="7"></line></svg>
                  Descuento ({discount}%)
               </span>
               <span>-${discountAmount.toFixed(2)} USD</span>
            </div>
         )}
         <div style={{display: 'flex', justifyContent: 'space-between', fontSize: '1.5rem', fontWeight: 'bold', margin: '1rem 0 0 0', fontFamily: 'var(--font-serif)', color: 'var(--color-foreground)'}}>
            <span>Total</span>
            <span>${totalAfterDiscount.toFixed(2)} USD</span>
         </div>
      </div>
    </div>
   );
}
