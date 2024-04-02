import { Router } from 'express';
import Cart from '../models/cart.model.js';

const cartsRouter = Router();

// POST para agregar un producto al carrito
cartsRouter.post('/:cid/products', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        // Agregar el nuevo producto al arreglo de productos del carrito
        const { productId, quantity } = req.body;
        cart.products.push({ productId, quantity });
        await cart.save();
        res.json({ status: 'success', message: 'Product added to cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// GET para obtener el contenido completo del carrito
cartsRouter.get('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        res.json({ status: 'success', payload: cart });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

export { cartsRouter };
