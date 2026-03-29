import catalogue from '@/data/catalogue.json';
import { getCategories } from '@/actions/categoryActions';
import { saveProduct, archiveProduct } from '@/actions/productActions';
import styles from './page.module.css';
import Link from 'next/link';
import TableEditor from '@/components/admin/TableEditor';
import ImageCarouselEditor from '@/components/admin/ImageCarouselEditor';

export default async function ProductFormPage({ params }) {
  const { action } = await params;
  const isEdit = action !== 'new';
  const categories = await getCategories();
  
  let product = null;
  if (isEdit) {
    product = catalogue.find(p => p.id === action); // action holds the ID when editing
  }

  return (
    <div className={styles.container}>
      <Link href="/admin/products" style={{textDecoration: 'underline', marginBottom: '2rem', display: 'inline-block', fontSize: '0.9rem'}}>
        &larr; Volver al inventario
      </Link>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem' }}>
        <h1 style={{fontFamily: 'var(--font-serif)', fontSize: '2.5rem', margin: 0}}>
            {isEdit ? 'Editar Producto' : 'Nuevo Producto'}
        </h1>
        
        {isEdit && (
            <form action={async () => {
                'use server';
                await archiveProduct(product.id);
            }}>
                <button type="submit" className={styles.archiveBtn}>
                    Archivar Producto (Ocultar)
                </button>
            </form>
        )}
      </div>

      <div className={styles.formContainer}>
        <form action={saveProduct} className={styles.formGrid}>
          <input type="hidden" name="_isEdit" value={isEdit ? 'true' : 'false'} />
          
          <div className={styles.inputGroup}>
            <label>ID del Producto</label>
            <input type="text" name="id" className={styles.input} defaultValue={product?.id || `VLR-${Math.floor(1000 + Math.random() * 9000)}`} readOnly={isEdit} required />
          </div>
          
          <div className={styles.inputGroup}>
            <label>Título</label>
            <input type="text" name="title" className={styles.input} defaultValue={product?.title} required />
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label>Descripción corta</label>
            <textarea name="description" className={styles.textarea} defaultValue={product?.description} required></textarea>
          </div>

          <div className={styles.inputGroup}>
            <label>Precio de Venta (USD)</label>
            <input type="number" step="0.01" name="price" className={styles.input} defaultValue={product?.price} required />
          </div>

          <div className={styles.inputGroup} style={{ background: '#f9f9f9', padding: '0.5rem', borderRadius: '4px' }}>
            <label style={{ color: '#666' }}>Precio de Comparación (Tachado)</label>
            <input type="number" step="0.01" name="compare_at_price" className={styles.input} defaultValue={product?.compare_at_price} placeholder="Ej: 150.00" />
          </div>

          <div className={styles.inputGroup}>
            <label>Categoría Dinámica</label>
            <select name="category" className={styles.select} defaultValue={product?.category || ''}>
              <option value="" disabled>Selecciona una categoría</option>
              {categories.map(cat => (
                  <option key={cat.id} value={cat.id}>{cat.name}</option>
              ))}
            </select>
          </div>

          <div className={styles.inputGroup}>
            <label>Color</label>
            <input type="text" name="color" className={styles.input} defaultValue={product?.color} />
          </div>

          <div className={styles.inputGroup}>
            <label>Disponibilidad Stock</label>
            <select name="availability" className={styles.select} defaultValue={product?.availability || 'in stock'}>
               <option value="in stock">En Stock</option>
               <option value="out of stock">Sin Stock</option>
            </select>
          </div>
          
          <div className={styles.inputGroup}>
            <label>Estado en Tienda</label>
            <select name="status" className={styles.select} defaultValue={product?.status || 'active'}>
               <option value="active">Activo (Visible)</option>
               <option value="archived">Archivado (Oculto)</option>
            </select>
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label>Imagen Portada (Hero URL)</label>
            <input type="text" name="image_link" className={styles.input} defaultValue={product?.image_link} required />
          </div>

          {/* New Image Carousel Editor */}
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
             <ImageCarouselEditor initialImages={product?.additional_image_links} name="additional_image_links" />
          </div>

          <div className={styles.inputGroup}>
            <label>Talles Disponibles (Muestreo)</label>
            <input type="text" name="sizes" className={styles.input} defaultValue={product?.sizes?.join(', ') || 'S, M, L'} />
          </div>

          <div className={styles.inputGroup}>
            <label>Etiquetas (SALE, NEW, etc)</label>
            <input type="text" name="badges" className={styles.input} defaultValue={product?.badges?.join(', ')} />
          </div>

          {/* New Table Editor for Size Guide */}
          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
             <TableEditor initialData={product?.size_guide} name="size_guide" />
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label>Promoción Destacada (Texto)</label>
            <input type="text" name="promo_text" className={styles.input} defaultValue={product?.promo_text} />
          </div>

          <div className={`${styles.inputGroup} ${styles.fullWidth}`}>
            <label>Materiales y Composición</label>
            <input type="text" name="composition" className={styles.input} defaultValue={product?.composition} />
          </div>
          
          <div className={`${styles.actions} ${styles.fullWidth}`}>
             <Link href="/admin/products" className="btn-secondary" style={{padding: '0.8rem 2rem', border: '1px solid #ccc', color: 'black', textDecoration: 'none'}}>Cancelar</Link>
             <button type="submit" className="btn-primary" style={{width: 'auto'}}>Guardar Cambios</button>
          </div>

        </form>
      </div>
    </div>
  );
}
