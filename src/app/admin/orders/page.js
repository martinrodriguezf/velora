import mockOrders from '@/data/mock_orders.json';
import styles from '../products/page.module.css'; // Reutilizamos estilos de tabla

export const metadata = {
  title: 'Órdenes | Admin',
};

export default function OrdersList() {
  return (
    <div>
      <div className={styles.header}>
        <div>
          <h1>Gestión de Órdenes</h1>
          <p>Pedidos recientes de tus clientas.</p>
        </div>
      </div>

      <div className={styles.tableContainer}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Pedido</th>
              <th>Clienta</th>
              <th>Fecha</th>
              <th>Total</th>
              <th>Estado</th>
            </tr>
          </thead>
          <tbody>
            {mockOrders.map(order => (
              <tr key={order.id}>
                <td style={{fontWeight: 'bold'}}>{order.id}</td>
                <td>{order.customer}</td>
                <td style={{color: '#666'}}>{order.date}</td>
                <td>${order.total.toFixed(2)} USD</td>
                <td>
                  <span className={styles.status} style={{
                    backgroundColor: order.status === 'delivered' ? '#e9ebd8' : order.status === 'pending' ? '#fff3cd' : '#cce5ff',
                    color: order.status === 'delivered' ? '#4a5c43' : order.status === 'pending' ? '#856404' : '#004085'
                  }}>
                    {order.status === 'delivered' ? 'Entregado' : order.status === 'pending' ? 'Pendiente' : 'Enviado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
