import express, { Request, Response } from 'express'
import { loggerMiddleware } from './middlewares/logger'
import categoryRouter from './routes/category.router'
import productRouter from './routes/product.router'

const app = express()
const PORT = 3000

// ── Middlewares globais ────────────────────────────────
app.use(express.json())
app.use(loggerMiddleware)

// ── Rotas ──────────────────────────────────────────────
app.use('/category', categoryRouter)
app.use('/products', productRouter)

// ── Rota raiz ──────────────────────────────────────────
app.get('/', (_req: Request, res: Response) => {
  res.status(200).json({
    message: '🚀 API Express + TypeScript + Zod rodando!',
    endpoints: {
      category: {
        'GET /category':          'Lista categorias (paginado: ?page=1&size=10)',
        'GET /category/:id':      'Busca categoria por UUID',
        'POST /category':         'Cria categoria { name: string (min 3) }',
        'PUT /category/:id':      'Atualiza categoria',
        'DELETE /category/:id':   'Remove categoria',
      },
      products: {
        'GET /products':          'Lista produtos (?category=uuid)',
        'GET /products/:id':      'Busca produto por UUID',
        'POST /products':         'Cria produto { name, price, categoryId }',
        'DELETE /products/:id':   'Remove produto',
      },
    },
  })
})

// ── Inicializa servidor ────────────────────────────────
app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`)
})
