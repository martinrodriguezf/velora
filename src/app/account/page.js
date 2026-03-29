import { redirect } from 'next/navigation';
import { getUserSession, logoutUser } from '@/actions/authActions';
import AccountDashboardClient from '@/components/account/AccountDashboardClient';

export const metadata = {
  title: 'Mi Cuenta | Velora',
};

// Mock orders for the MVP visual design
const mockOrders = [
  {
    id: 'VL-59281',
    date: '24 Mar 2026',
    status: 'En camino',
    total: 12500.00,
    items: 2
  },
  {
    id: 'VL-41092',
    date: '10 Feb 2026',
    status: 'Entregado',
    total: 8900.00,
    items: 1
  }
];

export default async function AccountPage() {
  const user = await getUserSession();
  
  if (!user) {
    redirect('/account/login');
  }

  return (
    <AccountDashboardClient 
      user={user} 
      orders={mockOrders} 
      logoutAction={logoutUser} 
    />
  );
}
