import { Router } from 'express'
import { validateData } from '../middlewares/validateData'
import {
  categoryParamsSchema,
  categoryQueryPaginationSchema,
  createCategorySchema,
  updateCategorySchema,
} from '../schemas/category.schema'
import {
  listCategories,
  getCategoryById,
  createCategory,
  updateCategory,
  deleteCategory,
} from '../controllers/category.controller'

const router = Router()

// GET /category?page=1&size=10
router.get('/',
  validateData(categoryQueryPaginationSchema, 'query'),
  listCategories
)

// GET /category/:id
router.get('/:id',
  validateData(categoryParamsSchema, 'params'),
  getCategoryById
)

// POST /category
router.post('/',
  validateData(createCategorySchema, 'body'),
  createCategory
)

// PUT /category/:id
router.put('/:id',
  validateData(categoryParamsSchema, 'params'),
  validateData(updateCategorySchema, 'body'),
  updateCategory
)

// DELETE /category/:id
router.delete('/:id',
  validateData(categoryParamsSchema, 'params'),
  deleteCategory
)

export default router
