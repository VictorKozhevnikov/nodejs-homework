import { Product } from './product';
import { ProductData } from './product-data';
import { ProductsRepository } from './products.repository';
import { products } from './products-initial-collection';

export class ProductsService {
  private nextId = 71;

  public constructor(private readonly repository: ProductsRepository) {}

  public getAllProducts(): Promise<Array<Product>> {
    return this.repository.getAllProducts();
  }

  public getProduct(productId: number): Promise<Product | undefined> {
    return this.repository.getProduct(productId);
  }

  // returns newly created product
  public async addProduct(productData: ProductData): Promise<Product> {
    // validate data and form a productData object

    // create a product
    const product = this.makeProduct(productData);

    // store it to db
    await this.repository.addProduct(product);

    return product;
  }

  public initializeProducts(): Promise<void> {
    return this.repository.initializeProducts(products);
  }

  private makeProduct(productData: ProductData): Product {
    return {
      id: this.nextId++,
      name: productData.name,
      releaseYear: productData.releaseYear
    };
  }
}
