import { Db, Collection } from 'mongodb';

import { City, CitiesRepository } from '..';

export class CitiesMongoRepository implements CitiesRepository {
  private collection: Collection<City>;

  public constructor(db: Db) {
    this.collection = db.collection<City>('cities');
  }

  public async getRandomCity(): Promise<City> {
    const sample = await this.collection.aggregate([{ $sample: { size: 1 } }]).toArray();
    return sample[0];
  }

  public async initializeCities(cities: Array<City>): Promise<void> {
    await this.collection.remove({});
    await this.collection.insertMany(cities);
  }
}
