import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
    name: String,
    price: Number,
    description: String,
    // Otros campos del producto
});

const Product = mongoose.model('Product', productSchema);

export default Product;
