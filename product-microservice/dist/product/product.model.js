"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = exports.ProductSchema = void 0;
const mongoose_1 = require("mongoose");
exports.ProductSchema = new mongoose_1.Schema({
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
    },
    Price: {
        type: Number,
        required: true,
    },
});
exports.ProductModel = (0, mongoose_1.model)('Product', exports.ProductSchema);
//# sourceMappingURL=product.model.js.map