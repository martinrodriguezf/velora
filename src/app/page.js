import Link from 'next/link';
import styles from './page.module.css';
import catalogue from '@/data/catalogue.json';
import storefront from '@/data/storefront.json';

import FeaturedGrid from '@/components/home/FeaturedGrid';

export default function Home() {
  // Only show Active products
  const activeCatalogue = catalogue.filter(p => p.status !== 'archived');

  // Obtain highlighted products based on CMS selection
  const featuredProducts = storefront.featured_products 
    ? activeCatalogue.filter(p => storefront.featured_products.includes(p.id))
    : activeCatalogue.slice(0, 4);

  return (
    <div className={styles.home}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroContent}>
          <h1>{storefront.hero.title}</h1>
          <p>{storefront.hero.subtitle}</p>
          <Link href="/shop" className="btn-primary" style={{ maxWidth: '250px' }}>
            Explorar la Colección
          </Link>
        </div>
        <div className={styles.heroImageContainer}>
           <img 
            src={storefront.hero.image}
            alt="Women in elegant minimalist clothing"
            className={styles.heroImage}
           />
        </div>
      </section>

      {/* Featured Products */}
      <section className={`container ${styles.featuredSection}`}>
        <div className={styles.sectionHeader}>
          <h2>Novedades</h2>
          <Link href="/shop" className={styles.linkUnderlined}>Ver Todo</Link>
        </div>
        
        <FeaturedGrid products={featuredProducts} />
      </section>

      {/* Brand Value Section */}
      <section className={styles.valueSection}>
        <div className="container grid-2">
          <div className={styles.valueImage}>
            <img src={storefront.values.image} alt="Quality fabrics" style={{objectPosition: 'top'}} />
          </div>
          <div className={styles.valueContent}>
            <h2>{storefront.values.title}</h2>
            {storefront.values.items.map((item, i) => (
              <div key={i} className={styles.valueItem}>
                <h4>{item.title}</h4>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
