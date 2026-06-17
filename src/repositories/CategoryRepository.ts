import { db, CategoryRow } from '../database/db'
import { Category } from '../entities/Category'

export class CategoryRepository {
  createCategory(category: Category): Category {
    db.categories.push({
      id: category.id, name: category.name,
      created_at: category.createdAt, updated_at: category.updatedAt,
    })
    return category
  }

  getAllCategories(page: number, size: number): { data: Category[]; total: number } {
    const total = db.categories.length
    const start = (page - 1) * size
    const rows = db.categories.slice(start, start + size)
    return { data: rows.map(r => Category.restore(r.id, r.name, r.created_at, r.updated_at)), total }
  }

  getCategoryById(id: string): Category | null {
    const row = db.categories.find(c => c.id === id)
    if (!row) return null
    return Category.restore(row.id, row.name, row.created_at, row.updated_at)
  }

  updateCategory(category: Category): Category {
    const index = db.categories.findIndex(c => c.id === category.id)
    if (index !== -1) {
      db.categories[index].name = category.name
      db.categories[index].updated_at = category.updatedAt
    }
    return category
  }

  deleteCategory(id: string): void {
    db.categories = db.categories.filter(c => c.id !== id)
  }
}