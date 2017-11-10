import Lowdb = require('lowdb');

import { Product } from './product';
import { ProductData } from './product-data';

export class ProductsRepository {
  public constructor(private readonly db: Lowdb) {}

  public getAllProducts(): Array<Product> {
    return this.db.get('products').value();
  }

  public getProduct(productId: number): Product {
    return this.db
      .get('products')
      .find({ id: productId })
      .value();
  }

  public addProduct(product: Product): void {
    this.db
      .get('products')
      .push(product)
      .write();
  }

  public initializeProducts(products: Array<Product>): void {
    this.db.set('products', products).write();
  }
}
