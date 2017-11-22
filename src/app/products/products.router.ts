import { Router, json } from 'express';
import { Connection } from 'mongoose';

import { ProductsService, ReviewsService } from '.';
import { ProductsMongoRepository, ReviewsMongoRepository } from './mongodb';

export async function createProductsRouter(connection: Connection): Promise<Router> {
  // resolve services
  const productsRepository = new ProductsMongoRepository(connection);
  const productsService = new ProductsService(productsRepository);
  const reviewsRepository = new ReviewsMongoRepository(connection);
  const reviewsService = new ReviewsService(reviewsRepository);

  await productsService.initializeProducts();
  await reviewsService.initializeReviews();

  const productsRouter = Router()
    .use(json())
    .get('/', async (request, response) => {
      const products = await productsService.getAllProducts();
      response.json(products);
      response.end();
    })
    .post(
      '/',
      // validate product data
      (request, response, next) => {
        const data = request.body;
        if (!data.name || !data.releaseYear) {
          response.status(400);
          response.end('Validation failed');
        } else {
          next();
        }
      },
      // add product
      async (request, response) => {
        const data = request.body;
        // validate data and cast to product data
        const product = await productsService.addProduct(data);
        response.json(product);
        response.end();
      }
    )
    // guard against invalid param
    .param('productId', (request, response, next) => {
      const productIdString: string = request.params.productId;
      const productIdInt: number = parseInt(productIdString, 10);
      if (isNaN(productIdInt) || productIdInt < 0) {
        response.status(404).end();
      } else {
        response.locals.productIdInt = productIdInt;
        next();
      }
    })
    .get('/:productId', async (request, response) => {
      const product = await productsService.getProduct(response.locals.productIdInt);
      if (product) {
        response.json(product);
        response.end();
      } else {
        response.status(404);
        response.end('product not found');
      }
    })
    .get('/:productId/reviews', async (request, response) => {
      const reviews = await reviewsService.getProductReviews(response.locals.productIdInt);
      response.json(reviews);
      response.end();
    });

  return productsRouter;
}
