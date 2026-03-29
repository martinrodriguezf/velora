import catalogue from '@/data/catalogue.json';
import styles from './page.module.css';
import Link from 'next/link';

export const metadata = {
  title: 'Inventario | Admin',
};

export default function ProductsList() {
  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Inventario</h1>
          <p>Gestioná todos tus productos desde aquí.</p>
        </div>
        <Link href="/admin/products/new" className="btn-primary" style={{width: 'auto', padding: '0.75rem 1.5rem'}}>
          + Nuevo Producto
        </Link>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>ID</th>
              <th>Producto</th>
              <th>Precio</th>
              <th>Categoría</th>
              <th>Stock</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {catalogue.map(product => (
              <tr key={product.id}>
                <td>{product.id}</td>
                <td className={styles.tdProduct}>
                  <img src={product.image_link} alt={product.title} />
                  {product.title}
                </td>
                <td>${product.price.toFixed(2)}</td>
                <td style={{textTransform: 'capitalize'}}>{product.category}</td>
                <td><span className={styles.status}>{product.availability}</span></td>
                <td>
                  <Link href={`/admin/products/${product.id}`} className={styles.actionBtn}>Editar</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
