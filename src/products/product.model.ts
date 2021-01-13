import * as mongoose from 'mongoose';

export const ProductSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  link: { type: String },
  price: { type: Number, required: true },
  currency: { type: String },
  quantity: { type: Number },
  brand: { type: String },
  color: { type: String },
  gender: { type: String },
  gtin: { type: String },
  mpn: { type: String },
  condition: { type: String },
});

export interface Product extends mongoose.Document {
  id: string;
  title: string;
  description: string;
  link: string;
  price: number;
  currency: string;
  quantity: number;
  brand: string;
  color: string;
  gender: string;
  gtin: string;
  mpn: string;
  condition: string;
}
