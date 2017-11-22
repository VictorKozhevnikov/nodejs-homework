import { Connection, Model, Document } from 'mongoose';

import { Product, ProductsRepository } from '..';

import { ProductTypegoose } from './product.typegoose';

export class ProductsMongoRepository implements ProductsRepository {
  private readonly ProductModel: Model<ProductTypegoose & Document>;

  public constructor(connection: Connection) {
    this.ProductModel = new ProductTypegoose().getModelForClass(ProductTypegoose, {
      existingConnection: connection
    });
  }

  public getAllProducts(): Promise<Array<Product>> {
    return this.ProductModel.find().exec();
  }

  public async getProduct(productId: number): Promise<Product | undefined> {
    const product = await this.ProductModel.findOne({ id: productId }).exec();
    return product;
  }

  public async addProduct(product: Product): Promise<void> {
    const productInstance = new this.ProductModel(product);
    await productInstance.save();
  }

  public async initializeProducts(products: Array<Product>): Promise<void> {
    await this.ProductModel.remove({});
    await this.ProductModel.insertMany(products);
  }
}
