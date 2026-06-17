import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import {
  CategoryParams,
  CategoryQuery,
  CreateCategoryDTO,
  UpdateCategoryDTO,
} from '../schemas/category.schema'

// Dados em memória
interface Category {
  id: string
  name: string
  createdAt: string
}

const categories: Category[] = [
  { id: randomUUID(), name: 'Eletrônicos', createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Livros',      createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Moda',        createdAt: new Date().toISOString() },
]

// ── GET /category ──────────────────────────────────────
export function listCategories(req: Request, res: Response): void {
  // req.query já foi validado e transformado pelo middleware
  const { page, size } = req.query as unknown as CategoryQuery

  const start = (page - 1) * size
  const paginated = categories.slice(start, start + size)

  res.status(200).json({
    page,
    size,
    total: categories.length,
    data: paginated,
  })
}

// ── GET /category/:id ──────────────────────────────────
export function getCategoryById(req: Request, res: Response): void {
  const { id } = req.params as unknown as CategoryParams
  const category = categories.find(c => c.id === id)

  if (!category) {
    res.status(404).json({ error: `Categoria com ID ${id} não encontrada.` })
    return
  }

  res.status(200).json({ data: category })
}

// ── POST /category ─────────────────────────────────────
export function createCategory(req: Request, res: Response): void {
  const { name } = req.body as CreateCategoryDTO

  const newCategory: Category = {
    id: randomUUID(),
    name,
    createdAt: new Date().toISOString(),
  }

  categories.push(newCategory)
  res.status(201).json({ message: 'Categoria criada com sucesso.', data: newCategory })
}

// ── PUT /category/:id ──────────────────────────────────
export function updateCategory(req: Request, res: Response): void {
  const { id } = req.params as unknown as CategoryParams
  const { name } = req.body as UpdateCategoryDTO

  const category = categories.find(c => c.id === id)

  if (!category) {
    res.status(404).json({ error: `Categoria com ID ${id} não encontrada.` })
    return
  }

  if (name) category.name = name
  res.status(200).json({ message: 'Categoria atualizada.', data: category })
}

// ── DELETE /category/:id ───────────────────────────────
export function deleteCategory(req: Request, res: Response): void {
  const { id } = req.params as unknown as CategoryParams
  const index = categories.findIndex(c => c.id === id)

  if (index === -1) {
    res.status(404).json({ error: `Categoria com ID ${id} não encontrada.` })
    return
  }

  categories.splice(index, 1)
  res.status(204).send()
}
