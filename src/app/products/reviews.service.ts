import Lowdb = require('lowdb');

import { ProductReview } from './product-review';
import { initialReviews } from './product-reviews-initial-collection';

export class ReviewsService {
  public constructor(private readonly db: Lowdb) {}

  public getProductReviews(productId: number): Array<ProductReview> {
    return this.db
      .get('reviews')
      .filter({ productId })
      .value();
  }

  public initializeReviews(): void {
    this.db.set('reviews', initialReviews).write();
  }
}
