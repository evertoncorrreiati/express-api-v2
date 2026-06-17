import { Request, Response, NextFunction } from 'express'
import { ZodSchema, ZodError } from 'zod'

type ValidateTarget = 'body' | 'query' | 'params'

/**
 * Middleware reutilizável de validação com Zod.
 * Intercepta a requisição, valida os dados e retorna 400 se houver erro.
 *
 * @param schema  - Schema do Zod para validação
 * @param target  - Onde validar: 'body', 'query' ou 'params'
 */
export function validateData(schema: ZodSchema, target: ValidateTarget = 'body') {
  return (req: Request, res: Response, next: NextFunction): void => {
    const result = schema.safeParse(req[target])

    if (!result.success) {
      const errors = (result.error as ZodError).errors.map(e => ({
        field: e.path.join('.'),
        message: e.message,
      }))

      res.status(400).json({
        error: 'Dados inválidos.',
        details: errors,
      })
      return
    }

    // Substitui os dados originais pelos dados já validados e transformados
    req[target] = result.data
    next()
  }
}
