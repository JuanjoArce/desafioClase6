import { productsRouter } from './routes/products.router';

const express = require('express');
const fs = require('fs');


class ProductManager {
    constructor(filePath) {
        this.path = filePath;
        this.productContador = 1;
        this.loadProducts();
    }

    loadProducts() {
        try {
            const data = fs.readFileSync(this.path, 'utf8');
            this.products = JSON.parse(data);
            if (this.products.length > 0) {
                const maxId = Math.max(...this.products.map(product => product.id));
                this.productContador = maxId + 1;
            }
        } catch (error) {
            this.products = [];
            this.products = [
                { id: 1, name: "Producto 1", price: 10.99, category: "Electrónica" },
                { id: 2, name: "Producto 2", price: 25.49, category: "Hogar" },
                { id: 3, name: "Producto 3", price: 5.99, category: "Ropa" }
            ];
            this.saveProducts();
        }
    }

    saveProducts() {
        const data = JSON.stringify(this.products, null, 2);
        fs.writeFileSync(this.path, data);
    }

    addProduct(product) {
        product.id = this.productContador++;
        this.products.push(product);
        this.saveProducts();
        console.log(`Producto agregado: ${product.title}`);
    }

    getProducts() {
        return this.products;
    }

    getProductById(id) {
        const foundProduct = this.products.find(product => product.id === id);
        if (foundProduct) {
            return foundProduct;
        } else {
            console.error('Producto no encontrado');
            return null;
        }
    }

    updateProduct(id, updatedFields) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products[index] = { ...this.products[index], ...updatedFields };
            this.saveProducts();
            console.log(`Producto actualizado con exito`);
        } else {
            console.error('Producto no encontrado');
        }
    }

    deleteProduct(id) {
        const index = this.products.findIndex(product => product.id === id);
        if (index !== -1) {
            this.products.splice(index, 1);
            this.saveProducts();
            console.log(`Producto eliminado con exito`);
        } else {
            console.error('Producto no encontrado');
        }
    }
}

const app = express();
const PORT = 8080;

const productManager = new ProductManager('products.json');

app.use(express.json(), productsRouter);

app.get('/products', async (req, res) => {
    try {
        const limit = parseInt(req.query.limit);
        let products = await productManager.getProducts();
        if (!isNaN(limit)) {
            products = products.slice(0, limit);
        }
        res.json(products);
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener los productos' });
    }
});

app.get('/products/:pid', async (req, res) => {
    try {
        const productId = parseInt(req.params.pid);
        const product = await productManager.getProductById(productId);
        if (product) {
            res.json(product);
        } else {
            res.status(404).json({ error: 'Producto no encontrado' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Error al obtener el producto' });
    }
});

app.listen(PORT, () => {
    console.log(`Servidor en funcionamiento en http://localhost:${PORT}`);
});
