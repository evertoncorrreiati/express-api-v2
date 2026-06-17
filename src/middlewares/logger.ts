import { Request, Response, NextFunction } from 'express'

export function loggerMiddleware(req: Request, _res: Response, next: NextFunction): void {
  const now = new Date().toLocaleString('pt-BR', { timeZone: 'America/Sao_Paulo' })
  console.log(`[${now}] ${req.method} ${req.originalUrl}`)
  next()
}
