import { ProductRepository } from '../repositories/ProductRepository'
import { CategoryRepository } from '../repositories/CategoryRepository'
import { Product } from '../entities/Product'
import { AppError } from '../errors/AppError'

export class ProductService {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly categoryRepository: CategoryRepository
  ) {}

  getAll(page: number, size: number) {
    return this.productRepository.getAllProducts(page, size)
  }

  getById(id: string): Product {
    const product = this.productRepository.getProductById(id)
    if (!product) throw new AppError('Produto não encontrado.', 404)
    return product
  }

  create(name: string, price: number, stock: number, categoryId: string): Product {
    const category = this.categoryRepository.getCategoryById(categoryId)
    if (!category) throw new AppError('Categoria não encontrada.', 404)
    const product = Product.create(name, price, stock, categoryId)
    return this.productRepository.createProduct(product)
  }

  update(id: string, data: { name?: string; price?: number; stock?: number; categoryId?: string }): Product {
    const product = this.productRepository.getProductById(id)
    if (!product) throw new AppError('Produto não encontrado.', 404)

    if (data.categoryId && data.categoryId !== product.categoryId) {
      const category = this.categoryRepository.getCategoryById(data.categoryId)
      if (!category) throw new AppError('Nova categoria não encontrada.', 404)
    }

    product.update(data.name, data.price, data.stock, data.categoryId)
    return this.productRepository.updateProduct(product)
  }

  delete(id: string): void {
    const product = this.productRepository.getProductById(id)
    if (!product) throw new AppError('Produto não encontrado.', 404)
    this.productRepository.deleteProduct(id)
  }
}
