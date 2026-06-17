import express from 'express'
import { loggerMiddleware } from './middlewares/logger'
import { errorMiddleware } from './middlewares/error'
import categoryRouter from './routes/category.router'
import productRouter from './routes/product.router'
import authRouter from './routes/auth.router'

const app = express()
const PORT = 3000

// ── Middlewares globais ────────────────────────────────
app.use(express.json())
app.use(loggerMiddleware)

// ── Rotas ──────────────────────────────────────────────
app.use('/auth', authRouter)
app.use('/category', categoryRouter)
app.use('/products', productRouter)

// ── Rota raiz ──────────────────────────────────────────
app.get('/', (_req, res) => {
  res.status(200).json({
    message: '🚀 API Express + TypeScript + SQLite rodando!',
    auth: {
      'POST /auth/login': 'Gerar token JWT (admin@api.com / admin123)',
    },
    endpoints: {
      'GET /category':          'Listar categorias (público)',
      'GET /category/:id':      'Buscar categoria (público)',
      'POST /category':         'Criar categoria (admin)',
      'PUT /category/:id':      'Atualizar categoria (admin)',
      'DELETE /category/:id':   'Remover categoria (admin)',
      'GET /products':          'Listar produtos (público)',
      'GET /products/:id':      'Buscar produto (público)',
      'POST /products':         'Criar produto (admin)',
      'PUT /products/:id':      'Atualizar produto (admin)',
      'DELETE /products/:id':   'Remover produto (admin)',
    },
  })
})

// ── Error handler (deve ser último) ───────────────────
app.use(errorMiddleware)

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
})
