import { Router, json } from 'express';
import Lowdb = require('lowdb');
import MemoryAdapter = require('lowdb/adapters/Memory');

import { ProductsService } from './products.service';
import { ProductsRepository } from './products.repository';
import { ReviewsService } from './reviews.service';

// resolve services
const db = new Lowdb(new MemoryAdapter());
const productsRepository = new ProductsRepository(db);
const productsService = new ProductsService(productsRepository);
const reviewsService = new ReviewsService(db);

productsService.initializeProducts();
reviewsService.initializeReviews();

export const productsRouter = Router()
  .use(json())
  .get('/', (request, response) => {
    const products = productsService.getAllProducts();
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
    (request, response) => {
      const data = request.body;
      // validate data and cast to product data
      const product = productsService.addProduct(data);
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
  .get('/:productId', (request, response) => {
    const product = productsService.getProduct(response.locals.productIdInt);
    if (product) {
      response.json(product);
      response.end();
    } else {
      response.status(404);
      response.end('product not found');
    }
  })
  .get('/:productId/reviews', (request, response) => {
    const reviews = reviewsService.getProductReviews(response.locals.productIdInt);
    response.json(reviews);
    response.end();
  });
