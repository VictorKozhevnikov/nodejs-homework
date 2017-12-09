import { Connection, Model, Document } from 'mongoose';

import { Review, ReviewsRepository } from '..';

import { ReviewTypegoose } from './review.typegoose';

export class ReviewsMongoRepository implements ReviewsRepository {
  private readonly ReviewModel: Model<ReviewTypegoose & Document>;

  public constructor(connection: Connection) {
    this.ReviewModel = new ReviewTypegoose().getModelForClass(ReviewTypegoose, {
      existingConnection: connection
    });
  }

  public getProductReviews(productId: number): Promise<Array<Review>> {
    return this.ReviewModel.find({ productId }).exec();
  }

  public async initializeReviews(reviews: Array<Review>): Promise<void> {
    await this.ReviewModel.remove({});
    await this.ReviewModel.insertMany(reviews);
  }
}
