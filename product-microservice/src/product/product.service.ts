import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.model';

@Injectable()
export class ProductService {
    constructor(@Inject('ProductModel') private readonly productModel: Model<Product>) {}

    async create(product: Product): Promise<Product> {
        const newProduct = new this.productModel(product);
        return await newProduct.save();
    }

    async findAll(): Promise<Product[]> {
        return await this.productModel.find().exec();
    }

    async findOne(id: string): Promise<Product> {
        const product = await this.productModel.findById(id).exec();
        if (!product) {
            throw new NotFoundException(`Product with ID ${id} not found`);
        }
        return product;
    }

    async update(id: string, updateProductDto: Product): Promise<Product> {
      const existingProduct = await this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
      if (!existingProduct) {
        throw new NotFoundException(`Product with ID ${id} not found`);
      }
      return existingProduct;
    }

    async delete(id: string): Promise<any> {
        return await this.productModel.deleteOne({ _id: id }).exec();
    }
}
