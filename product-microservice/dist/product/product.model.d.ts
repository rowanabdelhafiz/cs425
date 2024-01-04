/// <reference types="mongoose/types/aggregate" />
/// <reference types="mongoose/types/callback" />
/// <reference types="mongoose/types/collection" />
/// <reference types="mongoose/types/connection" />
/// <reference types="mongoose/types/cursor" />
/// <reference types="mongoose/types/document" />
/// <reference types="mongoose/types/error" />
/// <reference types="mongoose/types/expressions" />
/// <reference types="mongoose/types/helpers" />
/// <reference types="mongoose/types/middlewares" />
/// <reference types="mongoose/types/indexes" />
/// <reference types="mongoose/types/models" />
/// <reference types="mongoose/types/mongooseoptions" />
/// <reference types="mongoose/types/pipelinestage" />
/// <reference types="mongoose/types/populate" />
/// <reference types="mongoose/types/query" />
/// <reference types="mongoose/types/schemaoptions" />
/// <reference types="mongoose/types/schematypes" />
/// <reference types="mongoose/types/session" />
/// <reference types="mongoose/types/types" />
/// <reference types="mongoose/types/utility" />
/// <reference types="mongoose/types/validation" />
/// <reference types="mongoose/types/virtuals" />
/// <reference types="mongoose/types/inferschematype" />
import { Schema, Document } from 'mongoose';
export interface Product extends Document {
    Product_name: string;
    Quantity: number;
    Product_id: number;
    Price: Number;
}
export declare const ProductSchema: Schema<any, import("mongoose").Model<any, any, any, any, any, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, {
    Product_name: string;
    Quantity: number;
    Product_id: number;
    Price: number;
}, Document<unknown, {}, import("mongoose").FlatRecord<{
    Product_name: string;
    Quantity: number;
    Product_id: number;
    Price: number;
}>> & import("mongoose").FlatRecord<{
    Product_name: string;
    Quantity: number;
    Product_id: number;
    Price: number;
}> & {
    _id: import("mongoose").Types.ObjectId;
}>;
export declare const ProductModel: import("mongoose").Model<Product, {}, {}, {}, Document<unknown, {}, Product> & Product & {
    _id: import("mongoose").Types.ObjectId;
}, any>;
