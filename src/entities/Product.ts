import { v4 as uuidv4 } from 'uuid'

export class Product {
  private constructor(
    public readonly id: string,
    public name: string,
    public price: number,
    public stock: number,
    public categoryId: string,
    public readonly createdAt: string,
    public updatedAt: string
  ) {}

  static create(name: string, price: number, stock: number, categoryId: string): Product {
    if (!name || name.trim().length < 3) {
      throw new Error('O nome do produto deve ter no mínimo 3 caracteres.')
    }
    if (price <= 0) {
      throw new Error('O preço deve ser positivo.')
    }
    if (stock < 0) {
      throw new Error('O estoque não pode ser negativo.')
    }
    const now = new Date().toISOString()
    return new Product(uuidv4(), name.trim(), price, stock, categoryId, now, now)
  }

  static restore(
    id: string, name: string, price: number, stock: number,
    categoryId: string, createdAt: string, updatedAt: string
  ): Product {
    return new Product(id, name, price, stock, categoryId, createdAt, updatedAt)
  }

  update(name?: string, price?: number, stock?: number, categoryId?: string): void {
    if (name !== undefined) {
      if (name.trim().length < 3) throw new Error('Nome deve ter no mínimo 3 caracteres.')
      this.name = name.trim()
    }
    if (price !== undefined) {
      if (price <= 0) throw new Error('O preço deve ser positivo.')
      this.price = price
    }
    if (stock !== undefined) {
      if (stock < 0) throw new Error('O estoque não pode ser negativo.')
      this.stock = stock
    }
    if (categoryId !== undefined) this.categoryId = categoryId
    this.updatedAt = new Date().toISOString()
  }
}
