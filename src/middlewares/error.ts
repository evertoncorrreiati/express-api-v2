import { Request, Response, NextFunction } from 'express'
import { AppError } from '../errors/AppError'
import { ZodError } from 'zod'

export function errorMiddleware(
  err: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
): void {
  if (err instanceof AppError) {
    res.status(err.statusCode).json({ error: err.message })
    return
  }

  if (err instanceof ZodError) {
    res.status(400).json({
      error: 'Dados inválidos.',
      details: err.errors.map(e => ({ field: e.path.join('.'), message: e.message })),
    })
    return
  }

  console.error('[ERROR]', err)
  res.status(500).json({ error: 'Erro interno do servidor.' })
}
