import { Repository } from 'typeorm';

import { Review, ReviewsRepository } from '..';

import { ReviewEntity } from './review.entity';

export class ReviewsTypeormRepository implements ReviewsRepository {
  public constructor(private readonly repository: Repository<ReviewEntity>) {}

  public getProductReviews(productId: number): Promise<Array<Review>> {
    return this.repository.find({ productId });
  }

  public async initializeReviews(reviews: Array<Review>): Promise<void> {
    await this.repository.clear();
    await this.repository.insert(reviews);
  }
}
