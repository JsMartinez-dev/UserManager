// src/components/UserCard/UserCard.jsx
import styles from './UserCard.module.css';

/**
 * Tarjeta que muestra los datos de un usuario.
 * @param {{ user: { id, name, email, phone, createdAt } }} props
 */
export default function UserCard({ user }) {
  const initials = user.name
    .split(' ')
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase())
    .join('');

  const date = new Date(user.createdAt).toLocaleDateString('es-CO', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <article className={styles.card}>
      <div className={styles.avatar}>{initials}</div>
      <div className={styles.info}>
        <p className={styles.name}>{user.name}</p>
        <p className={styles.email}>{user.email}</p>
        {user.phone && <p className={styles.phone}>{user.phone}</p>}
      </div>
      <div className={styles.meta}>
        <span className={styles.id}>#{user.id}</span>
        <span className={styles.date}>{date}</span>
      </div>
    </article>
  );
}
