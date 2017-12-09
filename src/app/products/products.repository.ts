import { Product } from './product';

export interface ProductsRepository {
  getAllProducts(): Promise<Array<Product>>;

  getProduct(productId: number): Promise<Product | undefined>;

  addProduct(product: Product): Promise<void>;

  initializeProducts(products: Array<Product>): Promise<void>;
}
