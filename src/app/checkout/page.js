import Link from 'next/link';
import styles from './page.module.css';
import CheckoutSummary from './CheckoutSummary';

export const metadata = {
  title: 'Secure Checkout | Velora',
};

export default function Checkout() {
  return (
    <div className={`container ${styles.checkoutPage}`}>
      <div className={styles.checkoutLayout}>
        {/* Form Column */}
        <div className={styles.formColumn}>
          <div className={styles.header}>
             <h1>VELORA</h1>
             <nav>Carrito {'>'} <strong>Información</strong> {'>'} Envío {'>'} Pago</nav>
          </div>

          <form className={styles.form}>
            <section className={styles.section}>
              <h2>Contacto</h2>
              <input type="email" placeholder="Email o teléfono celular" className={styles.input} />
              <div className={styles.checkboxGroup}>
                <input type="checkbox" id="news" />
                <label htmlFor="news">Enviarme novedades y ofertas</label>
              </div>
            </section>

            <section className={styles.section}>
              <h2>Entrega</h2>
              <div className={styles.selectWrapper}>
                <select className={styles.input}>
                  <option>Argentina</option>
                  <option>Uruguay</option>
                  <option>España</option>
                </select>
              </div>
              <div className={styles.row}>
                <input type="text" placeholder="Nombre" className={styles.input} />
                <input type="text" placeholder="Apellido" className={styles.input} />
              </div>
              <input type="text" placeholder="Dirección" className={styles.input} />
              <input type="text" placeholder="Departamento, timbre, etc. (opcional)" className={styles.input} />
              <div className={styles.row}>
                <input type="text" placeholder="Ciudad" className={styles.input} />
                <input type="text" placeholder="Provincia" className={styles.input} />
                <input type="text" placeholder="Código Postal" className={styles.input} />
              </div>
            </section>

            <div className={styles.actions}>
              <Link href="/cart" className={styles.backLink}>Volver al carrito</Link>
              <button type="button" className="btn-primary" style={{width: 'auto'}}>Continuar a Envíos</button>
            </div>
          </form>
        </div>

        <CheckoutSummary initialTotal={205.00} />
      </div>
    </div>
  );
}
