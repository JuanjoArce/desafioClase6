import { Router } from 'express';
import  ProductManager  from '../controller/productManager.js';

const productManager = new ProductManager("./src/files/products.json");
const productsRouter = Router();

productsRouter.get('/', async (req, res) => {
    try {
        const limit = req.query.limit
        
        const allProduct = await productManager.getProduct();
        if (!limit) {
        res.send (allProduct)
        }
        const productLimit = []
        for (let index = 0; index < limit; index++) {
            productLimit.push(allProduct[index])
            
            
        }

        
        res.send(productLimit)
        

    } catch (error) {
        console.log(error);
        res.send('Error al recibir los productos');
    }
});

productsRouter.get('/:pid', async (req, res) => {
    try {
        const pid = req.params.pid;
        
        const product = await productManager.getProductById(pid);
        res.send(product)

    } catch (error) {
        console.log(error);
        res.send('Error al recibir los productos');
    }
}); 

// productsRouter.get('/:pid', async (req, res) => {
//     try {
//         const { pid } = req.params;
//         const product = ProductManager.getProductById(pid);
//         res.json(product);
//     } catch (error) {
//         console.log(error);
//         res.send(`Error al recibir el producto con ID ${pid}`);
//     }
// });

// productsRouter.post('/', async (req, res) => {
//     try {
//         const { title, description, code, price, status = true, stock, category } = req.body;
//         const response = await ProductManager.addProduct({ title, description, code, price, status, stock, category });
//         res.json(response);

//     } catch (error) {
//         console.log(error);
//         res.send('Error al cargar el producto');
//     }
// });

// productsRouter.put('/:pid', async (req, res) => {
//     const { pid } = req.params;
//     try {
//         const { title, description, code, price, status = true, stock, category } = req.body;
//         const response = await ProductManager.updateProduct(pid, { title, description, code, price, status, stock, category });
//         res.json(response);
//     } catch (error) {
//         console.log(error);
//         res.send(`Error en la actualización del producto con ID ${pid}`);
//     }
// });

// productsRouter.delete('/:pid', async (req, res) => {
//     const { pid } = req.params;
//     try {
//         await ProductManager.deleteProduct(pid);
//         res.send('El producto fue eliminado correctamente');
//     } catch (error) {
//         console.log(error);
//         res.send(`No se pudo eliminar el producto con ID ${pid}`);
//     }
// });




export { productsRouter };
