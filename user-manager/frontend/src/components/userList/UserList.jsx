// src/components/UserList/UserList.jsx
import UserCard from '../UserCard/UserCard';
import styles from './UserList.module.css';

/**
 * Lista de usuarios con estados de carga, error y vacío.
 * @param {{ users: object[], loading: boolean, error: string|null, onReload: () => void }} props
 */
export default function UserList({ users, loading, error, onReload }) {
  if (loading) {
    return (
      <div className={styles.state}>
        <span className={styles.spinner} />
        <p>Cargando usuarios…</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className={styles.state}>
        <p className={styles.errorMsg}>{error}</p>
        <button className={styles.reloadBtn} onClick={onReload}>Reintentar</button>
      </div>
    );
  }

  if (users.length === 0) {
    return (
      <div className={styles.state}>
        <p className={styles.empty}>No hay usuarios aún. ¡Agrega el primero!</p>
      </div>
    );
  }

  return (
    <section className={styles.list}>
      {users.map((user) => (
        <UserCard key={user.id} user={user} />
      ))}
    </section>
  );
}
