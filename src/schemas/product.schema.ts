import { z } from 'zod'

// ── Params: valida UUID ────────────────────────────────
export const productParamsSchema = z.object({
  id: z.string().uuid({ message: 'ID deve ser um UUID válido.' }),
})

// ── Query: filtro por categoria ────────────────────────
export const productQuerySchema = z.object({
  category: z.string().uuid({ message: 'category deve ser um UUID válido.' }).optional(),
})

// ── Body: criação de produto ───────────────────────────
export const createProductSchema = z.object({
  name: z
    .string({ required_error: 'name é obrigatório.' })
    .min(3, { message: 'name deve ter no mínimo 3 caracteres.' }),
  price: z
    .number({ required_error: 'price é obrigatório.' })
    .positive({ message: 'price deve ser um número positivo.' }),
  categoryId: z
    .string({ required_error: 'categoryId é obrigatório.' })
    .uuid({ message: 'categoryId deve ser um UUID válido.' }),
})

// ── Body: atualização de produto ──────────────────────
export const updateProductSchema = createProductSchema.partial()

// ── Tipos inferidos ───────────────────────────────────
export type ProductParams    = z.infer<typeof productParamsSchema>
export type ProductQuery     = z.infer<typeof productQuerySchema>
export type CreateProductDTO = z.infer<typeof createProductSchema>
export type UpdateProductDTO = z.infer<typeof updateProductSchema>
