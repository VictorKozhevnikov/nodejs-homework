import { Connection, Model, Document } from 'mongoose';

import { City, CitiesRepository } from '..';

import { CityTypegoose } from './city.typegoose';

export class CitiesMongoRepository implements CitiesRepository {
    private readonly cityModel: Model<CityTypegoose & Document>;

    public constructor(connection: Connection) {
        this.cityModel = new CityTypegoose().getModelForClass(CityTypegoose, { existingConnection: connection });
    }

    public async getRandomCity(): Promise<City> {
        const citiesCount = await this.cityModel.count({}).exec();
        const randomIndex = Math.floor(Math.random() * citiesCount);
        const randomCity = await this.cityModel.findOne({}).skip(randomIndex).exec();
        return randomCity;
    }

    public async initializeCities(cities: Array<City>): Promise<void> {
        await this.cityModel.remove({}).exec();
        await this.cityModel.insertMany(cities);
    }
}
