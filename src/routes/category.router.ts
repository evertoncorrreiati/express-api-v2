import { Router } from 'express'
import { CategoryController } from '../controllers/CategoryController'
import { CategoryService } from '../services/CategoryService'
import { CategoryRepository } from '../repositories/CategoryRepository'
import { authMiddleware, authorize } from '../middlewares/auth'

const router = Router()

const categoryRepository = new CategoryRepository()
const categoryService = new CategoryService(categoryRepository)
const categoryController = new CategoryController(categoryService)

// ── Rotas públicas ─────────────────────────────────────
router.get('/', categoryController.getAll)
router.get('/:id', categoryController.getById)

// ── Rotas protegidas (admin) ───────────────────────────
router.post('/', authMiddleware, authorize('admin'), categoryController.create)
router.put('/:id', authMiddleware, authorize('admin'), categoryController.update)
router.delete('/:id', authMiddleware, authorize('admin'), categoryController.delete)

export default router
