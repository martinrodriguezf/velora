"use client"

export default function RecoverCartButton({ email }) {
  const handleRecover = () => {
    // Aquí en producción se llama a un Server Action que contacta a SendGrid o Resend.
    alert(`SIMULADOR SMTP:\nUn correo de recuperación de carrito (con cupón adjunto) ha sido enviado exitosamente a la casilla: ${email}`);
  }
  return <button onClick={handleRecover} className="btn-secondary" style={{padding: '0.4rem 0.8rem', fontSize: '0.8rem', borderRadius: '4px', cursor: 'pointer', border: '1px solid var(--color-border)', backgroundColor: 'transparent'}}>Disparar Email</button>
}
