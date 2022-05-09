import { model, Schema, Document } from 'mongoose';
import { City } from '@interfaces/city.interface';

const citySchema: Schema = new Schema({
  id: { type: Number },
  name: { type: String },
  state: { type: String },
  country: { type: String },
  loc: {
    type: {
      type: String,
      enum: ['Point'],
      required: true,
    },
    coordinates: {
      type: [Number],
      required: true,
    },
  },
});

const cityModel = model<City & Document>('Cities', citySchema);

export default cityModel;
