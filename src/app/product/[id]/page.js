import catalogue from '@/data/catalogue.json';
import styles from './page.module.css';
import { notFound } from 'next/navigation';
import ProductGallery from '@/components/product/ProductGallery';
import ProductInfo from '@/components/product/ProductInfo';

export async function generateMetadata({ params }) {
  const { id } = await params;
  const product = catalogue.find(p => p.id.toLowerCase() === id.toLowerCase());
  if (!product) return { title: 'Not Found | Velora' };
  return { title: `${product.title} | Velora` };
}

export default async function ProductDetail({ params }) {
  const { id } = await params;
  const product = catalogue.find(p => p.id.toLowerCase() === id.toLowerCase());

  if (!product) {
    notFound();
  }

  // All images
  const allImages = [product.image_link, ...(product.additional_image_links || [])];
  // Remove duplicates if any
  const uniqueImages = [...new Set(allImages)];

  return (
    <div className={`container ${styles.productPage}`}>
      <div className={styles.productGrid}>
        
        {/* Images Column */}
        <div className={styles.galleryWrapper}>
          <ProductGallery images={uniqueImages} />
        </div>

        {/* Info Column */}
        <div className={styles.infoColumn}>
          <div className={styles.stickyInfo}>
            {/* Breadcrumbs */}
            <nav className={styles.breadcrumbs}>
              Tienda / {product.category.toUpperCase()} / {product.title}
            </nav>
            
            <h1 className={styles.title}>{product.title}</h1>
            
            {/* Interactive Product Info & Add to Cart */}
            <ProductInfo product={product} />

            <button className={styles.whatsappBtn}>
              Consultar vía WhatsApp
            </button>

            {/* Details Accordion Mockup */}
            <div className={styles.accordionContainer}>
              <div className={styles.accordionGroup}>
                <h4>Talle y Calce</h4>
                <div className={styles.accordionContent}>
                  <p>{product.fit || 'Corte estandar.'}</p>
                  <p><strong>Info de modelo:</strong> {product.model_info || 'La modelo mide 1.74m.'}</p>
                </div>
              </div>
              <div className={styles.accordionGroup}>
                <h4>Composición y Cuidados</h4>
                <div className={styles.accordionContent}>
                  <p>{product.composition || '100% materiales nobles.'}</p>
                  <p>Lavado en seco o a mano con agua fría. No usar secadora.</p>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}
