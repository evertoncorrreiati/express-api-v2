import { Request, Response, NextFunction } from 'express'
import { z } from 'zod'
import { CategoryService } from '../services/CategoryService'
import { CategoryResponseDto, CategoryListDto } from '../dtos'

const paramsSchema = z.object({ id: z.string().uuid() })
const querySchema = z.object({
  page: z.string().optional().transform(v => v ? parseInt(v) : 1).pipe(z.number().min(1)),
  size: z.string().optional().transform(v => v ? parseInt(v) : 10).pipe(z.number().min(1).max(100)),
})
const createSchema = z.object({ name: z.string().min(3, 'name deve ter no mínimo 3 caracteres.') })
const updateSchema = createSchema

export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  getAll = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { page, size } = querySchema.parse(req.query)
      const { data, total } = this.categoryService.getAll(page, size)
      res.status(200).json(CategoryListDto.create(data, page, size, total))
    } catch (err) { next(err) }
  }

  getById = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = paramsSchema.parse(req.params)
      const category = this.categoryService.getById(id)
      res.status(200).json(CategoryResponseDto.create(category))
    } catch (err) { next(err) }
  }

  create = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { name } = createSchema.parse(req.body)
      const category = this.categoryService.create(name)
      res.status(201).json(CategoryResponseDto.create(category))
    } catch (err) { next(err) }
  }

  update = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = paramsSchema.parse(req.params)
      const { name } = updateSchema.parse(req.body)
      const category = this.categoryService.update(id, name)
      res.status(200).json(CategoryResponseDto.create(category))
    } catch (err) { next(err) }
  }

  delete = async (req: Request, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { id } = paramsSchema.parse(req.params)
      this.categoryService.delete(id)
      res.status(204).send()
    } catch (err) { next(err) }
  }
}
