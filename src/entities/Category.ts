import { v4 as uuidv4 } from 'uuid'

export class Category {
  private constructor(
    public readonly id: string,
    public name: string,
    public readonly createdAt: string,
    public updatedAt: string
  ) {}

  // Factory method — regras de negócio na criação
  static create(name: string): Category {
    if (!name || name.trim().length < 3) {
      throw new Error('O nome da categoria deve ter no mínimo 3 caracteres.')
    }
    const now = new Date().toISOString()
    return new Category(uuidv4(), name.trim(), now, now)
  }

  // Reconstrói a entity a partir do banco
  static restore(id: string, name: string, createdAt: string, updatedAt: string): Category {
    return new Category(id, name, createdAt, updatedAt)
  }

  // Regra de negócio para renomear
  rename(newName: string): void {
    if (!newName || newName.trim().length < 3) {
      throw new Error('O novo nome deve ter no mínimo 3 caracteres.')
    }
    this.name = newName.trim()
    this.updatedAt = new Date().toISOString()
  }
}
