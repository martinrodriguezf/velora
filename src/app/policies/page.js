export const metadata = {
  title: 'Políticas y Soporte | Velora',
};

export default function Policies() {
  return (
    <div className="container" style={{ padding: '4rem 1.5rem', maxWidth: '800px', margin: '0 auto', minHeight: '60vh' }}>
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', fontFamily: 'var(--font-serif)' }}>Soporte & Políticas</h1>
      
      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Preguntas Frecuentes (FAQ)</h2>
        <p style={{ opacity: 0.8, lineHeight: '1.6', marginBottom: '1rem' }}><strong>¿De dónde provienen los materiales?</strong><br/>Todo nuestro lino orgánico y algodón certificado proviene de granjas trazables que garantizan condiciones éticas y consumo reducido de agua.</p>
        <p style={{ opacity: 0.8, lineHeight: '1.6' }}><strong>¿Hacen reposiciones (restocks)?</strong><br/>Nuestras producciones (Small Batches) son limitadas. Ocasionalmente reponemos piezas fundacionales o bestsellers, pero la mayoría de las colecciones son únicas y no vuelven.</p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Política de Envíos</h2>
        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>Los pedidos estandar se procesan entre 1-2 días hábiles. El envío gratuito se activa automáticamente en el checkout para compras que superen ciertos límites (promoción mensual). Los envíos express toman entre 24-48 horas laborables según tu región.</p>
      </section>

      <section style={{ marginBottom: '3rem' }}>
        <h2 style={{ fontSize: '1.5rem', marginBottom: '1rem', borderBottom: '1px solid var(--color-border)', paddingBottom: '0.5rem' }}>Cambios y Devoluciones</h2>
        <p style={{ opacity: 0.8, lineHeight: '1.6' }}>Queremos que ames tu pieza Velora. Si no es un "Sí absoluto", aceptamos devoluciones dentro de los 15 días posteriores a la recepción. La prenda debe estar sin uso, con las etiquetas intactas y en su empaque original sin plástico.</p>
      </section>
    </div>
  );
}
