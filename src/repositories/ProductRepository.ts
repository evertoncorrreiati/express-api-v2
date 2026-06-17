import { db } from '../database/db'
import { Product } from '../entities/Product'

export class ProductRepository {
  createProduct(product: Product): Product {
    db.products.push({
      id: product.id, name: product.name, price: product.price,
      stock: product.stock, category_id: product.categoryId,
      created_at: product.createdAt, updated_at: product.updatedAt,
    })
    return product
  }

  getAllProducts(page: number, size: number): { data: Product[]; total: number } {
    const total = db.products.length
    const start = (page - 1) * size
    const rows = db.products.slice(start, start + size)
    return {
      data: rows.map(r => Product.restore(r.id, r.name, r.price, r.stock, r.category_id, r.created_at, r.updated_at)),
      total,
    }
  }

  getProductById(id: string): Product | null {
    const row = db.products.find(p => p.id === id)
    if (!row) return null
    return Product.restore(row.id, row.name, row.price, row.stock, row.category_id, row.created_at, row.updated_at)
  }

  updateProduct(product: Product): Product {
    const index = db.products.findIndex(p => p.id === product.id)
    if (index !== -1) {
      db.products[index] = {
        id: product.id, name: product.name, price: product.price,
        stock: product.stock, category_id: product.categoryId,
        created_at: product.createdAt, updated_at: product.updatedAt,
      }
    }
    return product
  }

  deleteProduct(id: string): void {
    db.products = db.products.filter(p => p.id !== id)
  }
}