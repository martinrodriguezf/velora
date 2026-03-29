import SidebarNav from '@/components/admin/SidebarNav';
import styles from './adminLayout.module.css';

export const metadata = {
  title: 'Admin Dashboard | Velora',
};

import { cookies } from 'next/headers';

export default async function AdminLayout({ children }) {
  const cookieStore = await cookies();
  const adminSession = cookieStore.get('admin_session');

  if (!adminSession) {
    return (
      <div style={{ minHeight: '100vh', background: '#f5f5f5', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        {children}
      </div>
    );
  }

  return (
    <div className={styles.adminLayout}>
      <aside className={styles.sidebar}>
        <h2 className={styles.sidebarTitle}>Admin Panel</h2>
        <SidebarNav />
      </aside>
      <main className={styles.mainContent}>
        {children}
      </main>
    </div>
  );
}
