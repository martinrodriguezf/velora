import './globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Analytics from '@/components/Analytics';
import TopBanner from '@/components/layout/TopBanner';
import { getUserSession } from '@/actions/authActions';
import { CartProvider } from '@/context/CartContext';
import { CurrencyProvider } from '@/context/CurrencyContext';
import CartDrawer from '@/components/cart/CartDrawer';

export const metadata = {
  title: 'Velora | Premium Women Clothing',
  description: 'Clean Lines. Conscious Living. Shop the new modern minimalist collection.',
};

export default async function RootLayout({ children }) {
  const user = await getUserSession();

  return (
    <html lang="en">
      <body>
        <CurrencyProvider>
            <CartProvider>
                <TopBanner />
                <Analytics />
                <Header initialUser={user} />
                <main>{children}</main>
                <CartDrawer />
                <Footer />
            </CartProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
