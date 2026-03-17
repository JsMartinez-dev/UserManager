// src/components/UserForm/UserForm.jsx
import { useState } from 'react';
import styles from './UserForm.module.css';

const EMPTY = { name: '', email: '', phone: '' };

/**
 * Formulario para crear un nuevo usuario.
 * @param {{ onSubmit: (data: object) => Promise<{ success, fieldErrors?, message? }> }} props
 */
export default function UserForm({ onSubmit }) {
  const [fields,      setFields]      = useState(EMPTY);
  const [fieldErrors, setFieldErrors] = useState({});
  const [apiError,    setApiError]    = useState('');
  const [success,     setSuccess]     = useState(false);
  const [submitting,  setSubmitting]  = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields((prev) => ({ ...prev, [name]: value }));
    setFieldErrors((prev) => ({ ...prev, [name]: '' }));
    setApiError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setSuccess(false);
    setApiError('');

    const result = await onSubmit(fields);

    if (result.success) {
      setFields(EMPTY);
      setFieldErrors({});
      setSuccess(true);
    } else if (result.fieldErrors) {
      setFieldErrors(result.fieldErrors);
    } else {
      setApiError(result.message || 'Ocurrió un error inesperado.');
    }

    setSubmitting(false);
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} noValidate>
      <h2 className={styles.title}>
        <span className={styles.tag}>{'{ '}</span>
        Nuevo usuario
        <span className={styles.tag}>{' }'}</span>
      </h2>

      {/* NAME */}
      <div className={styles.field}>
        <label htmlFor="name" className={styles.label}>Nombre completo</label>
        <input
          id="name"
          name="name"
          type="text"
          placeholder="Ej: Ana Martínez"
          value={fields.name}
          onChange={handleChange}
          className={`${styles.input} ${fieldErrors.name ? styles.inputError : ''}`}
          autoComplete="off"
        />
        {fieldErrors.name && <span className={styles.errorMsg}>{fieldErrors.name}</span>}
      </div>

      {/* EMAIL */}
      <div className={styles.field}>
        <label htmlFor="email" className={styles.label}>Correo electrónico</label>
        <input
          id="email"
          name="email"
          type="email"
          placeholder="ana@ejemplo.com"
          value={fields.email}
          onChange={handleChange}
          className={`${styles.input} ${fieldErrors.email ? styles.inputError : ''}`}
          autoComplete="off"
        />
        {fieldErrors.email && <span className={styles.errorMsg}>{fieldErrors.email}</span>}
      </div>

      {/* PHONE */}
      <div className={styles.field}>
        <label htmlFor="phone" className={styles.label}>
          Teléfono <span className={styles.optional}>(opcional)</span>
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          placeholder="+57 300 000 0000"
          value={fields.phone}
          onChange={handleChange}
          className={`${styles.input} ${fieldErrors.phone ? styles.inputError : ''}`}
          autoComplete="off"
        />
        {fieldErrors.phone && <span className={styles.errorMsg}>{fieldErrors.phone}</span>}
      </div>

      {/* Feedback global */}
      {apiError && <p className={styles.apiError}>{apiError}</p>}
      {success  && <p className={styles.successMsg}>✓ Usuario creado exitosamente</p>}

      <button type="submit" className={styles.btn} disabled={submitting}>
        {submitting ? 'Guardando...' : '+ Agregar usuario'}
      </button>
    </form>
  );
}
