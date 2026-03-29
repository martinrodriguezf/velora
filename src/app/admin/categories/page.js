import { getCategories, saveCategory, deleteCategory } from '@/actions/categoryActions';
import styles from './page.module.css';
import Link from 'next/link';

export default async function CategoriesAdmin() {
  const categories = await getCategories();

  return (
    <div className={styles.container}>
      <header className={styles.header}>
        <h1 style={{ fontFamily: 'var(--font-serif)', fontSize: '2.5rem' }}>Gestión de Categorías</h1>
        <p>Define las categorías de ropa (Blazers, Pantalones, etc.) que aparecerán en la tienda.</p>
      </header>
      
      <div className={styles.grid}>
        {/* New Category Form */}
        <section className={styles.card}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Nueva Categoría</h2>
          <form action={saveCategory} className={styles.form}>
            <div className={styles.inputGroup}>
              <label>Nombre de la Categoría</label>
              <input type="text" name="name" placeholder="Ej: Accesorios" className={styles.input} required />
            </div>
            <div className={styles.inputGroup}>
              <label>ID (Sugerido)</label>
              <input type="text" name="id" placeholder="ej-accesorios" className={styles.input} required />
            </div>
            <button type="submit" className="btn-primary" style={{ marginTop: '1rem' }}>Crear Categoría</button>
          </form>
        </section>

        {/* Categories List */}
        <section className={styles.card}>
          <h2 style={{ fontSize: '1.2rem', marginBottom: '1.5rem' }}>Categorías Existentes</h2>
          <div className={styles.list}>
            {categories.map((cat) => (
              <div key={cat.id} className={styles.item}>
                <div>
                  <div style={{ fontWeight: 600 }}>{cat.name}</div>
                  <div style={{ fontSize: '0.8rem', color: '#666' }}>ID: {cat.id}</div>
                </div>
                <div className={styles.actions}>
                  <form action={async () => {
                    'use server';
                    await deleteCategory(cat.id);
                  }}>
                    <button type="submit" className={styles.deleteBtn}>Eliminar</button>
                  </form>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <div style={{ marginTop: '3rem' }}>
        <Link href="/admin" style={{ textDecoration: 'underline' }}>&larr; Volver al Dashboard</Link>
      </div>
    </div>
  );
}
