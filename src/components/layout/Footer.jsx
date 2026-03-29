import Link from 'next/link';
import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={`container ${styles.footerGrid}`}>
        <div className={styles.brandCol}>
          <h3 className={styles.logo}>VELORA</h3>
          <p className={styles.desc}>Esenciales atemporales para la minimalista moderna. Diseñados para simplificar tu armario.</p>
        </div>
        <div className={styles.linksCol}>
          <h4>Soporte</h4>
          <Link href="/policies">FAQ</Link>
          <Link href="/policies">Envíos</Link>
          <Link href="/policies">Devoluciones</Link>
        </div>
        <div className={styles.linksCol}>
          <h4>Empresa</h4>
          <Link href="/about">Nosotros</Link>
          <Link href="/contact">Contacto</Link>
          <a href="https://instagram.com">Instagram</a>
        </div>
      </div>
      <div className={styles.bottom}>
        <p>&copy; {new Date().getFullYear()} Velora. Todos los derechos reservados.</p>
      </div>
    </footer>
  );
}
