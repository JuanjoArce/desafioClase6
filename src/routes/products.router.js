import {Router, response} from 'express';
import {ProductManager} from '../app.js'
const productsRouter = Router()

productsRouter.get('/' async(req, res)=>{
    try{
        const {limit} = req.query;
        const products = ProductManager.getProducts()

        if(limit){
            const limitedProducts = products.slice(0, limit)
            return res.json(limitedProducts)
        }
        return res.json(products)

    }
    catch(error){
        console.log(error);
        res.send('Error nos se reciben los productos')

    }
})

productsRouter.get('/:pid', async (req, res)=>{
    try {
        const{pid} = req.params;
        const products = ProductManager.getProductById(pid)
        res.json(products)
    } catch (error) {
        console.log(error);
        res.send('Error nos se recibe el producto con ID ${{pid}}')
    }
})

productsRouter.post('/' async (req, res)=>{
    try {
        const {title, description, code, price, status, stock, category} = req.body;
        const response = await ProductManager.addProduct({title,description,code,price,status,stock,category})
        res.json(response)

    } catch (error) {
        console.log(error);
        res.send('Erros al cargar el producto')
    }
})

productsRouter.put(':/pid',async (req,res)=> {
    const {pid} = req.params;
    try {
        const {title, description, code, price, status, stock, category} = req.body;
        const response = await ProductManager.updateProduct(id, {title,description,code,price,status,stock,category})
        res.json(response)
    } catch (error) {
        console.log(error);
        res.send('Error en la actualizacion del producto con id ${{pid}}');
    }
})

productsRouter.delete( '/:pid', async (req, res) => {
    const {pid} = req.params;
    try {
        await  ProductsManager.deleteProduct(pid);
        res.send('El producto fue eliminado correctamente');
    } catch (error) {
        console.log(error);
        res.send('No se pudo eliminar el producto con id ${{pid}}');
    }
})

export {productsRouter}