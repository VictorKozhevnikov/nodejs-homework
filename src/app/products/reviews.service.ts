import { Review, ReviewsRepository } from '.';
import { initialReviews } from './reviews-initial-collection';

export class ReviewsService {
  public constructor(private readonly repository: ReviewsRepository) {}

  public getProductReviews(productId: number): Promise<Array<Review>> {
    return this.repository.getProductReviews(productId);
  }

  public initializeReviews(): Promise<void> {
    return this.repository.initializeReviews(initialReviews);
  }
}
