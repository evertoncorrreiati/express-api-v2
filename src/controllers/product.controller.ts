import { Request, Response } from 'express'
import { randomUUID } from 'crypto'
import {
  ProductParams,
  ProductQuery,
  CreateProductDTO,
} from '../schemas/product.schema'

// Dados em memória
interface Product {
  id: string
  name: string
  price: number
  categoryId: string
  createdAt: string
}

const products: Product[] = [
  { id: randomUUID(), name: 'Fone Bluetooth',    price: 199.9, categoryId: randomUUID(), createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Teclado Mecânico',  price: 349.0, categoryId: randomUUID(), createdAt: new Date().toISOString() },
  { id: randomUUID(), name: 'Clean Code',        price: 89.9,  categoryId: randomUUID(), createdAt: new Date().toISOString() },
]

// ── GET /products ──────────────────────────────────────
export function listProducts(req: Request, res: Response): void {
  const { category } = req.query as unknown as ProductQuery

  const result = category
    ? products.filter(p => p.categoryId === category)
    : products

  res.status(200).json({ total: result.length, data: result })
}

// ── GET /products/:id ──────────────────────────────────
export function getProductById(req: Request, res: Response): void {
  const { id } = req.params as unknown as ProductParams
  const product = products.find(p => p.id === id)

  if (!product) {
    res.status(404).json({ error: `Produto com ID ${id} não encontrado.` })
    return
  }

  res.status(200).json({ data: product })
}

// ── POST /products ─────────────────────────────────────
export function createProduct(req: Request, res: Response): void {
  const { name, price, categoryId } = req.body as CreateProductDTO

  const newProduct: Product = {
    id: randomUUID(),
    name,
    price,
    categoryId,
    createdAt: new Date().toISOString(),
  }

  products.push(newProduct)
  res.status(201).json({ message: 'Produto criado com sucesso.', data: newProduct })
}

// ── DELETE /products/:id ───────────────────────────────
export function deleteProduct(req: Request, res: Response): void {
  const { id } = req.params as unknown as ProductParams
  const index = products.findIndex(p => p.id === id)

  if (index === -1) {
    res.status(404).json({ error: `Produto com ID ${id} não encontrado.` })
    return
  }

  products.splice(index, 1)
  res.status(204).send()
}
