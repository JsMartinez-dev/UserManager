// src/App.jsx
// Componente raíz: orquesta el formulario y la lista de usuarios

import { useUsers } from './hooks/useUsers';
import UserForm   from './components/UserForm/UserForm';
import UserList   from './components/UserList/UserList';
import styles     from './App.module.css';

export default function App() {
  const { users, loading, error, addUser, reload } = useUsers();

  return (
    <div className={styles.app}>
      {/* ── Header ── */}
      <header className={styles.header}>
        <div>
          <p className={styles.eyebrow}>// sistema de gestión</p>
          <h1 className={styles.title}>User<span className={styles.accent}>Manager</span></h1>
        </div>
        <div className={styles.stats}>
          <span className={styles.badge}>{users.length} usuarios</span>
        </div>
      </header>

      {/* ── Layout principal ── */}
      <main className={styles.layout}>
        {/* Columna izquierda: formulario */}
        <aside className={styles.sidebar}>
          <UserForm onSubmit={addUser} />
        </aside>

        {/* Columna derecha: lista */}
        <section className={styles.content}>
          <div className={styles.listHeader}>
            <h2 className={styles.listTitle}>Usuarios registrados</h2>
            <button className={styles.refreshBtn} onClick={reload} title="Recargar">
              ↺
            </button>
          </div>
          <UserList
            users={users}
            loading={loading}
            error={error}
            onReload={reload}
          />
        </section>
      </main>

      {/* ── Footer ── */}
      <footer className={styles.footer}>
        Node.js · React · PostgreSQL — arquitectura en capas
      </footer>
    </div>
  );
}
