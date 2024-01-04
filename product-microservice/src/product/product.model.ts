import { Schema, Document, model } from 'mongoose';

export interface Product extends Document {
  Product_name: string;
  Quantity: number;
  Product_id: number;
  Price: number;
}

export const ProductSchema = new Schema<Product>({
  Product_name: {
    type: String,
    required: true,
  },
  Quantity: {
    type: Number,
    required: true,
  },
  Product_id: {
    type: Number,
    required: true,
    unique: true,
  },
  Price: {
    type: Number,
    required: true,
  },
});

export const ProductModel = model<Product>('Product', ProductSchema);
