export const metadata = {
  title: 'Nosotros | Velora',
};

export default function About() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3.5rem', marginBottom: '2rem', textAlign: 'center', fontFamily: 'var(--font-serif)' }}>Nuestra Filosofía</h1>
      
      <div style={{ fontSize: '1.2rem', lineHeight: '1.8', opacity: 0.8, color: 'var(--color-foreground)' }}>
        <p style={{ marginBottom: '1.5rem' }}>
          Bienvenida a Velora. Nacimos con un propósito claro: redefinir la relación que las mujeres tienen con su vestuario. Creemos firmemente en el poder del diseño minimalista y en la creación de colecciones atemporales.
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          En una industria dominada por la moda rápida (Fast Fashion), nos posicionamos como una alternativa para la consumidora consciente. Trabajamos exclusívamente con tejidos certificados, algodones orgánicos, linos puros y alternativas veganas como el cupro (la seda ecológica).
        </p>
        <p style={{ marginBottom: '1.5rem' }}>
          Nuestras colecciones se fabrican en producciones de pequeños lotes (Small Batch). Esto garantiza un control de calidad extraordinario en cada costura y elimina por completo la sobreproducción de stock innecesario.
        </p>
        <p style={{ marginBottom: '3rem' }}>
          Velora no es solo ropa; es el arte de vestir con intención, reduciendo el ruido visual de tu armario para que tu propia identidad siempre sea el centro de atención.
        </p>
      </div>
      
      <div style={{ textAlign: 'center' }}>
        <img 
          src="/images/velora_blazer.png"
          alt="Studio Team"
          style={{ width: '100%', height: '500px', objectFit: 'cover', backgroundColor: '#E8E8E8' }}
        />
      </div>
    </div>
  );
}
