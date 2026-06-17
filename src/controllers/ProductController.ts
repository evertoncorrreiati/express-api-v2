import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { ProductService } from '../services/ProductService'
import { ProductResponseDto, ProductListDto } from '../dtos'

const paramsSchema = z.object({ id: z.string().uuid() })
const querySchema = z.object({
  page: z.string().optional().transform(v => v ? parseInt(v) : 1).pipe(z.number().min(1)),
  size: z.string().optional().transform(v => v ? parseInt(v) : 10).pipe(z.number().min(1).max(100)),
})
const createSchema = z.object({
  name: z.string().min(3, 'name deve ter no mínimo 3 caracteres.'),
  price: z.number().positive('price deve ser positivo.'),
  stock: z.number().int().min(0, 'stock não pode ser negativo.').default(0),
  categoryId: z.string().uuid('categoryId deve ser um UUID válido.'),
})
const updateSchema = createSchema.partial()

export class ProductController {
  constructor(private readonly productService: ProductService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, size } = querySchema.parse(req.query)
      const { data, total } = this.productService.getAll(page, size)
      res.status(200).json(ProductListDto.create(data, page, size, total))
    } catch (err) { next(err) }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = paramsSchema.parse(req.params)
      const product = this.productService.getById(id)
      res.status(200).json(ProductResponseDto.create(product))
    } catch (err) { next(err) }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name, price, stock, categoryId } = createSchema.parse(req.body)
      const product = this.productService.create(name, price, stock, categoryId)
      res.status(201).json(ProductResponseDto.create(product))
    } catch (err) { next(err) }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = paramsSchema.parse(req.params)
      const data = updateSchema.parse(req.body)
      const product = this.productService.update(id, data)
      res.status(200).json(ProductResponseDto.create(product))
    } catch (err) { next(err) }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = paramsSchema.parse(req.params)
      this.productService.delete(id)
      res.status(204).send()
    } catch (err) { next(err) }
  }
}
