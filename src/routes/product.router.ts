import { Router } from 'express'
import { ProductController } from '../controllers/ProductController'
import { ProductService } from '../services/ProductService'
import { ProductRepository } from '../repositories/ProductRepository'
import { CategoryRepository } from '../repositories/CategoryRepository'
import { authMiddleware, authorize } from '../middlewares/auth'

const router = Router()

const categoryRepository = new CategoryRepository()
const productRepository = new ProductRepository()
const productService = new ProductService(productRepository, categoryRepository)
const productController = new ProductController(productService)

// ── Rotas públicas ─────────────────────────────────────
router.get('/', productController.getAll)
router.get('/:id', productController.getById)

// ── Rotas protegidas (admin) ───────────────────────────
router.post('/', authMiddleware, authorize('admin'), productController.create)
router.put('/:id', authMiddleware, authorize('admin'), productController.update)
router.delete('/:id', authMiddleware, authorize('admin'), productController.delete)

export default router
