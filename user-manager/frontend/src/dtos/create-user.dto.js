export class CreateUserDto {
  constructor(name, email, phone = null) {
    this.name  = name?.trim() ?? '';
    this.email = email?.trim().toLowerCase() ?? '';
    this.phone = phone?.trim() || null;
  }

  validate() {
    const errors = {};
    if (!this.name || this.name.length < 2)
      errors.name = 'El nombre debe tener al menos 2 caracteres.';
    if (!this.email)
      errors.email = 'El correo electrónico es requerido.';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.email))
      errors.email = 'Ingresa un correo electrónico válido.';
    if (this.phone && !/^\+?[\d\s\-()]{7,20}$/.test(this.phone))
      errors.phone = 'Ingresa un teléfono válido.';
    return { valid: Object.keys(errors).length === 0, errors };
  }

  toPayload() {
    return { name: this.name, email: this.email, phone: this.phone };
  }
}
