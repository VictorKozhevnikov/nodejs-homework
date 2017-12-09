import { Review } from './review';

export interface ReviewsRepository {
  getProductReviews(productId: number): Promise<Array<Review>>;

  initializeReviews(reviews: Array<Review>): Promise<void>;
}
