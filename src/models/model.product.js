import mongoose from 'mongoose';

// Define el esquema del producto
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    availability: { type: Boolean, default: true }
});

// Crea el modelo de Producto a partir del esquema
const Product = mongoose.model('Product', productSchema);

export default Product;
