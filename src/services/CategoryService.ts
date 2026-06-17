import { CategoryRepository } from '../repositories/CategoryRepository'
import { Category } from '../entities/Category'
import { AppError } from '../errors/AppError'

export class CategoryService {
  constructor(private readonly categoryRepository: CategoryRepository) {}

  getAll(page: number, size: number) {
    return this.categoryRepository.getAllCategories(page, size)
  }

  getById(id: string): Category {
    const category = this.categoryRepository.getCategoryById(id)
    if (!category) throw new AppError('Categoria não encontrada.', 404)
    return category
  }

  create(name: string): Category {
    const category = Category.create(name)
    return this.categoryRepository.createCategory(category)
  }

  update(id: string, name: string): Category {
    const category = this.categoryRepository.getCategoryById(id)
    if (!category) throw new AppError('Categoria não encontrada.', 404)
    category.rename(name)
    return this.categoryRepository.updateCategory(category)
  }

  delete(id: string): void {
    const category = this.categoryRepository.getCategoryById(id)
    if (!category) throw new AppError('Categoria não encontrada.', 404)
    this.categoryRepository.deleteCategory(id)
  }
}
