import { Category } from '../entities/Category'
import { Product } from '../entities/Product'

// ── Category DTOs ──────────────────────────────────────
export class CategoryResponseDto {
  id: string
  name: string
  createdAt: string
  updatedAt: string

  private constructor(category: Category) {
    this.id = category.id
    this.name = category.name
    this.createdAt = category.createdAt
    this.updatedAt = category.updatedAt
  }

  static create(category: Category): CategoryResponseDto {
    return new CategoryResponseDto(category)
  }
}

export class CategoryListDto {
  data: CategoryResponseDto[]
  page: number
  size: number
  total: number

  private constructor(data: CategoryResponseDto[], page: number, size: number, total: number) {
    this.data = data
    this.page = page
    this.size = size
    this.total = total
  }

  static create(categories: Category[], page: number, size: number, total: number): CategoryListDto {
    return new CategoryListDto(categories.map(CategoryResponseDto.create), page, size, total)
  }
}

// ── Product DTOs ───────────────────────────────────────
export class ProductResponseDto {
  id: string
  name: string
  price: number
  stock: number
  categoryId: string
  createdAt: string
  updatedAt: string

  private constructor(product: Product) {
    this.id = product.id
    this.name = product.name
    this.price = product.price
    this.stock = product.stock
    this.categoryId = product.categoryId
    this.createdAt = product.createdAt
    this.updatedAt = product.updatedAt
  }

  static create(product: Product): ProductResponseDto {
    return new ProductResponseDto(product)
  }
}

export class ProductListDto {
  data: ProductResponseDto[]
  page: number
  size: number
  total: number

  private constructor(data: ProductResponseDto[], page: number, size: number, total: number) {
    this.data = data
    this.page = page
    this.size = size
    this.total = total
  }

  static create(products: Product[], page: number, size: number, total: number): ProductListDto {
    return new ProductListDto(products.map(ProductResponseDto.create), page, size, total)
  }
}
