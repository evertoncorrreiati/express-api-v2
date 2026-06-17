import { Router } from 'express'
import { validateData } from '../middlewares/validateData'
import {
  productParamsSchema,
  productQuerySchema,
  createProductSchema,
} from '../schemas/product.schema'
import {
  listProducts,
  getProductById,
  createProduct,
  deleteProduct,
} from '../controllers/product.controller'

const router = Router()

// GET /products?category=uuid
router.get('/',
  validateData(productQuerySchema, 'query'),
  listProducts
)

// GET /products/:id
router.get('/:id',
  validateData(productParamsSchema, 'params'),
  getProductById
)

// POST /products
router.post('/',
  validateData(createProductSchema, 'body'),
  createProduct
)

// DELETE /products/:id
router.delete('/:id',
  validateData(productParamsSchema, 'params'),
  deleteProduct
)

export default router
