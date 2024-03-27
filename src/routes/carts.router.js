import { Router } from 'express';
import Cart from '../models/cart.model.js';
import Product from '../models/product.model.js';

const cartsRouter = Router();

// DELETE para eliminar un producto del carrito
cartsRouter.delete('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        // Eliminar el producto del arreglo de productos del carrito
        cart.products = cart.products.filter(product => product !== pid);
        await cart.save();
        res.json({ status: 'success', message: 'Product removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// PUT para actualizar el carrito con un arreglo de productos
cartsRouter.put('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        // Actualizar el arreglo de productos del carrito con los nuevos productos
        const { products } = req.body;
        cart.products = products;
        await cart.save();
        res.json({ status: 'success', message: 'Cart updated successfully' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// PUT para actualizar la cantidad de un producto en el carrito
cartsRouter.put('/:cid/products/:pid', async (req, res) => {
    try {
        const { cid, pid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        // Actualizar la cantidad del producto en el carrito
        const { quantity } = req.body;
        const productIndex = cart.products.findIndex(product => product.productId === pid);
        if (productIndex !== -1) {
            cart.products[productIndex].quantity = quantity;
            await cart.save();
            return res.json({ status: 'success', message: 'Product quantity updated in cart' });
        } else {
            return res.status(404).json({ status: 'error', message: 'Product not found in cart' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

// DELETE para eliminar todos los productos del carrito
cartsRouter.delete('/:cid', async (req, res) => {
    try {
        const { cid } = req.params;
        const cart = await Cart.findById(cid);
        if (!cart) {
            return res.status(404).json({ status: 'error', message: 'Cart not found' });
        }

        // Eliminar todos los productos del carrito
        cart.products = [];
        await cart.save();
        res.json({ status: 'success', message: 'All products removed from cart' });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

export { cartsRouter };
