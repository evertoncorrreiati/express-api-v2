import { z } from 'zod'

// ── Params: valida UUID ────────────────────────────────
export const categoryParamsSchema = z.object({
  id: z.string().uuid({ message: 'ID deve ser um UUID válido.' }),
})

// ── Query: paginação segura ────────────────────────────
export const categoryQueryPaginationSchema = z.object({
  page: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 1))
    .pipe(z.number().min(1, { message: 'page deve ser >= 1.' })),
  size: z
    .string()
    .optional()
    .transform(val => (val ? parseInt(val, 10) : 10))
    .pipe(z.number().min(1).max(100, { message: 'size deve ser entre 1 e 100.' })),
})

// ── Body: criação de categoria ─────────────────────────
export const createCategorySchema = z.object({
  name: z
    .string({ required_error: 'name é obrigatório.' })
    .min(3, { message: 'name deve ter no mínimo 3 caracteres.' })
    .max(100, { message: 'name deve ter no máximo 100 caracteres.' }),
})

// ── Body: atualização de categoria ────────────────────
export const updateCategorySchema = createCategorySchema.partial()

// ── Tipos inferidos ───────────────────────────────────
export type CategoryParams    = z.infer<typeof categoryParamsSchema>
export type CategoryQuery     = z.infer<typeof categoryQueryPaginationSchema>
export type CreateCategoryDTO = z.infer<typeof createCategorySchema>
export type UpdateCategoryDTO = z.infer<typeof updateCategorySchema>
