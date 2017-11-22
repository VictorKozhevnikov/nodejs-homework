import { Typegoose, prop } from 'typegoose';

import { City } from '../city';

export class CityTypegoose extends Typegoose implements City {
    @prop()
    public name: string;
    @prop()
    public latitude: number;
    @prop()
    public longitude: number;
    @prop()
    public population: number;
    @prop()
    public country: string;
    @prop()
    public province: string;
}
