import { Module } from '@nestjs/common';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema,ProductModel } from './product.model';
@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Product', schema: ProductSchema }]), // Provide ItemModel
  ],
  controllers: [ProductController],
  providers: [ProductService]
})
export class ProductModule {}
