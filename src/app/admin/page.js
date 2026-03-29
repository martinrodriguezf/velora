import catalogue from '@/data/catalogue.json';
import styles from './page.module.css';
import Link from 'next/link';
import SalesChart from '@/components/admin/SalesChart';
import TopProducts from '@/components/admin/TopProducts';
import StockAlerts from '@/components/admin/StockAlerts';

export default function AdminDashboard() {
  return (
    <div>
      <div className={styles.adminHeader}>
        <h1>Analíticas de Velora</h1>
        <p>Centro de comando y rendimiento de ventas.</p>
      </div>

      <StockAlerts />

      {/* Indicadores Principales */}
      <div className={styles.statsGrid}>
        <div className={styles.statCard}>
           <h3>Facturación Bruta (Hoy)</h3>
           <p>$1,450.00</p>
           <span style={{color: '#4caf50', fontSize: '0.85rem'}}>&#8593; 12% vs ayer</span>
        </div>
        <div className={styles.statCard}>
           <h3>Ticket Promedio (AOV)</h3>
           <p>$185.00</p>
           <span style={{color: '#4caf50', fontSize: '0.85rem'}}>&#8593; 5% vs ayer</span>
        </div>
        <div className={styles.statCard}>
           <h3>Tasa de Conversión</h3>
           <p>2.8%</p>
           <span style={{color: '#d32f2f', fontSize: '0.85rem'}}>&#8595; 0.2% vs ayer</span>
        </div>
        <div className={styles.statCard}>
           <h3>Total Productos</h3>
           <p>{catalogue.length}</p>
           <span style={{color: '#666', fontSize: '0.85rem'}}>Activos en catálogo</span>
        </div>
      </div>

      {/* Gráficos y Rankings */}
      <div className={styles.dashboardGrid}>
        <div className={styles.chartWrapper}>
          <SalesChart />
        </div>
        <div className={styles.leaderboardWrapper}>
          <TopProducts />
        </div>
      </div>

      <div style={{marginTop: '3rem', display: 'flex', gap: '1rem', flexWrap: 'wrap'}}>
        <Link href="/admin/products" className="btn-primary">Gestionar Inventario</Link>
        <Link href="/admin/categories" className="btn-secondary" style={{padding: '1rem 2rem', border: '1px solid var(--color-border)', textDecoration: 'none', color: 'black'}}>Ver Categorías</Link>
        <Link href="/admin/orders" className="btn-secondary" style={{padding: '1rem 2rem', border: '1px solid var(--color-border)', textDecoration: 'none', color: 'black'}}>Ver Órdenes</Link>
      </div>
    </div>
  );
}
