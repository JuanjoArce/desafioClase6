import { Router } from 'express';
import Product from '../models/product.model.js';

const productsRouter = Router();

// Método GET para obtener productos con filtros, paginación y ordenamiento
productsRouter.get('/', async (req, res) => {
    try {
        // Parámetros de consulta opcionales
        const { limit = 10, page = 1, sort, query } = req.query;

        // Filtros de búsqueda
        let filter = {};
        if (query) {
            // Aquí puedes implementar la lógica para aplicar el filtro según la consulta recibida
        }

        // Ordenamiento
        let sortOptions = {};
        if (sort) {
            // Implementa la lógica para ordenar ascendente o descendentemente según el precio
            sortOptions.price = sort === 'asc' ? 1 : -1;
        }

        // Consulta a la base de datos para obtener productos con filtros y ordenamiento
        const products = await Product.find(filter)
                                    .sort(sortOptions)
                                    .limit(parseInt(limit))
                                    .skip((parseInt(page) - 1) * parseInt(limit));

        // Calcula el total de páginas
        const totalProducts = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalProducts / parseInt(limit));

        // Determina la página anterior y siguiente
        const prevPage = parseInt(page) > 1 ? parseInt(page) - 1 : null;
        const nextPage = parseInt(page) < totalPages ? parseInt(page) + 1 : null;

        // Devuelve la respuesta con el formato especificado
        res.json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: parseInt(page),
            hasPrevPage: prevPage !== null,
            hasNextPage: nextPage !== null,
            prevLink: prevPage ? `/api/products?limit=${limit}&page=${prevPage}&sort=${sort}&query=${query}` : null,
            nextLink: nextPage ? `/api/products?limit=${limit}&page=${nextPage}&sort=${sort}&query=${query}` : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

export { productsRouter };

