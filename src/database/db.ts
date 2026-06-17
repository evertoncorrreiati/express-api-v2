// Banco de dados em memória — sem dependências nativas
export interface CategoryRow {
  id: string
  name: string
  created_at: string
  updated_at: string
}

export interface ProductRow {
  id: string
  name: string
  price: number
  stock: number
  category_id: string
  created_at: string
  updated_at: string
}

export const db = {
  categories: [] as CategoryRow[],
  products: [] as ProductRow[],
}