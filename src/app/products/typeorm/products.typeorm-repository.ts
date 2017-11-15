import { Repository } from 'typeorm';

import { Product, ProductsRepository } from '..';

import { ProductEntity } from './product.entity';

export class ProductsTypeormRepository implements ProductsRepository {
  public constructor(private readonly repository: Repository<ProductEntity>) {}

  public getAllProducts(): Promise<Array<Product>> {
    return this.repository.find();
  }

  public async getProduct(productId: number): Promise<Product | undefined> {
    console.log(`Get product #${productId}`);
    const product = await this.repository.findOneById(productId);
    console.log(product);
    return product;
  }

  public addProduct(product: Product): Promise<void> {
    return this.repository.insert(product);
  }

  public async initializeProducts(products: Array<Product>): Promise<void> {
    await this.repository.clear();
    await this.repository.insert(products);
  }
}
