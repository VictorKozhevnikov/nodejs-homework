import { Product } from './product';
import { ProductData } from './product-data';
import { ProductsRepository } from './products.repository';
import { products } from './products-initial-collection';

export class ProductsService {
  private nextId = 71;

  public constructor(private readonly repository: ProductsRepository) {
  }

  public getAllProducts(): Array<Product> {
    return this.repository.getAllProducts();
  }

  public getProduct(productId: number): Product {
    return this.repository.getProduct(productId);
  }

  // returns newly created product
  public addProduct(productData: ProductData): Product {
    // validate data and form a productData object

    // create a product
    const product = this.makeProduct(productData);

    // store it to db
    this.repository.addProduct(product);

    return product;
  }

  public initializeProducts(): void {
    this.repository.initializeProducts(products);
  }

  private makeProduct(productData: ProductData): Product {
    return {
      id: this.nextId++,
      name: productData.name,
      releaseYear: productData.releaseYear
      // rating: productData.rating || 0,
      // category: productData.category,
      // cast: productData.cast,
      // director: productData.director,
      // summary: productData.summary,
      // posterUrl: productData.posterUrl,
      // runtime: productData.runtime
    };
  }
}
