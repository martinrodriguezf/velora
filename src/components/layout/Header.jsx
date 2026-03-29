'use client';

import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';
import catalogue from '@/data/catalogue.json';
import { useCart } from '@/context/CartContext';
import { useCurrency } from '@/context/CurrencyContext';

export default function Header({ initialUser }) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [user, setUser] = useState(initialUser);
  
  const searchRef = useRef(null);
  const { cartCount, setIsCartOpen } = useCart();
  const { currency, setCurrency } = useCurrency();

  // Sync user state with props from server layout
  useEffect(() => {
    setUser(initialUser);
  }, [initialUser]);

  useEffect(() => {
    if (searchQuery.trim().length > 1) {
      const results = catalogue.filter(product => 
        product.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
        product.category.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setSearchResults(results.slice(0, 5));
    } else {
      setSearchResults([]);
    }
  }, [searchQuery]);

  // Click outside to close search
  useEffect(() => {
    function handleClickOutside(event) {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [searchRef]);

  // Close search on escape
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsSearchOpen(false);
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  return (
    <header className={styles.header} style={{ position: 'relative', zIndex: 50, background: '#fff' }}>
      <div className={`container ${styles.headerInner}`}>
        <nav className={styles.navLeft}>
          <Link href="/new-arrivals" className={styles.navLink}>Novedades</Link>
          <Link href="/shop" className={styles.navLink}>Colección</Link>
          <Link href="/about" className={styles.navLink}>Nosotros</Link>
        </nav>

        <div className={styles.logo}>
          <Link href="/">VELORA</Link>
        </div>

        <nav className={styles.navRight}>
          <button className={styles.iconBtn} onClick={() => { setIsSearchOpen(!isSearchOpen); setSearchQuery(''); }}>Buscar</button>
          
          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <select 
                value={currency} 
                onChange={(e) => setCurrency(e.target.value)}
                style={{
                    background: 'none',
                    border: 'none',
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    textTransform: 'uppercase',
                    fontFamily: 'var(--font-sans)',
                    outline: 'none',
                    opacity: 0.6,
                    padding: '0 0.5rem'
                }}
            >
                <option value="USD">USD</option>
                <option value="UYU">UYU</option>
            </select>
          </div>

          {user ? (
            <Link href="/account" className={styles.iconBtn} style={{textDecoration: 'none', fontWeight: 600, textTransform: 'uppercase'}}>Hola, {user.name}</Link>
          ) : (
            <Link href="/account/login" className={styles.iconBtn} style={{textDecoration: 'none'}}>Mi Cuenta</Link>
          )}
          
          <button 
            className={styles.iconBtn} 
            onClick={() => setIsCartOpen(true)}
            style={{ fontWeight: cartCount > 0 ? 600 : 400 }}
          >
            Carrito ({cartCount})
          </button>
        </nav>
      </div>

      {/* DROPDOWN INLINE SEARCH */}
      {isSearchOpen && (
        <div ref={searchRef} style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          background: '#fff',
          borderBottom: '1px solid #eaeaea',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.05)',
          padding: '1.5rem',
          zIndex: 40,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center'
        }}>
          <div style={{ width: '100%', maxWidth: '800px', display: 'flex', gap: '1rem', alignItems: 'center' }}>
            <span style={{ fontSize: '1.5rem', color: '#ccc' }}>🔍</span>
            <input 
              type="text" 
              placeholder="Buscar piezas, categorías, colores..." 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              autoFocus
              style={{
                width: '100%',
                border: 'none',
                fontSize: '1.2rem',
                padding: '0.5rem 0',
                outline: 'none',
                fontFamily: 'var(--font-sans)',
                background: 'transparent'
              }}
            />
            <button onClick={() => setIsSearchOpen(false)} style={{ background: 'none', border: 'none', fontSize: '1.5rem', cursor: 'pointer', color: '#999' }}>&times;</button>
          </div>

          {searchQuery.length > 0 && searchResults.length === 0 && (
            <div style={{ width: '100%', maxWidth: '800px', paddingTop: '1.5rem', color: '#666' }}>
              No encontramos resultados para "{searchQuery}"
            </div>
          )}

          {searchResults.length > 0 && (
            <div style={{ width: '100%', maxWidth: '800px', paddingTop: '1.5rem', marginTop: '1rem', borderTop: '1px solid #f0f0f0' }}>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '1.5rem' }}>
                {searchResults.map(product => (
                  <Link 
                    href={product.link} 
                    key={product.id}
                    onClick={() => setIsSearchOpen(false)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      textDecoration: 'none',
                      color: '#000',
                      transition: 'opacity 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.opacity = '0.7'}
                    onMouseLeave={(e) => e.currentTarget.style.opacity = '1'}
                  >
                    <img src={product.image_link} alt={product.title} style={{ width: '50px', height: '65px', objectFit: 'cover', borderRadius: '4px' }} />
                    <div style={{ flex: 1 }}>
                      <h3 style={{ fontSize: '0.9rem', fontWeight: 600, marginBottom: '0.2rem', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{product.title}</h3>
                      <div style={{ fontSize: '0.85rem', color: '#666' }}>
                        ${product.price ? product.price.toFixed(2) : '0.00'}
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </header>
  );
}
