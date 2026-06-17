import { Router, Request, Response } from 'express'
import jwt from 'jsonwebtoken'

const router = Router()
const JWT_SECRET = process.env.JWT_SECRET ?? 'secret-dev-key'

// Rota de login simulado para gerar token
// POST /auth/login { email, password }
router.post('/login', (req: Request, res: Response): void => {
  const { email, password } = req.body

  // Credenciais simuladas
  if (email === 'admin@api.com' && password === 'admin123') {
    const token = jwt.sign({ userId: '1', role: 'admin' }, JWT_SECRET, { expiresIn: '24h' })
    res.status(200).json({ token, role: 'admin' })
    return
  }

  if (email === 'user@api.com' && password === 'user123') {
    const token = jwt.sign({ userId: '2', role: 'user' }, JWT_SECRET, { expiresIn: '24h' })
    res.status(200).json({ token, role: 'user' })
    return
  }

  res.status(401).json({ error: 'Credenciais inválidas.' })
})

export default router
