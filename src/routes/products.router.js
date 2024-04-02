import { Router } from 'express';
import Product from '../models/model.product.js';

const productsRouter = Router();

// Método GET para obtener productos con filtros, paginación y ordenamiento
productsRouter.get('/', async (req, res) => {
    try {
        const { limit = 10, page = 1, sort, category, available } = req.query;
        let filter = {};

        // Construir el filtro según la query recibida
        if (category) {
            filter.category = category;
        }
        if (available) {
            filter.available = available === 'true';
        }

        // Realizar la consulta con filtros y opciones de paginación y ordenamiento
        const products = await Product.find(filter)
            .sort(sort ? { price: sort === 'asc' ? 1 : -1 } : {})
            .skip((page - 1) * limit)
            .limit(parseInt(limit));

        // Calcular información de paginación
        const totalCount = await Product.countDocuments(filter);
        const totalPages = Math.ceil(totalCount / limit);
        const hasNextPage = page < totalPages;
        const hasPrevPage = page > 1;
        const nextPage = hasNextPage ? parseInt(page) + 1 : null;
        const prevPage = hasPrevPage ? parseInt(page) - 1 : null;

        // Devolver la respuesta
        res.status(200).json({
            status: 'success',
            payload: products,
            totalPages,
            prevPage,
            nextPage,
            page: parseInt(page),
            hasPrevPage,
            hasNextPage,
            prevLink: hasPrevPage ? `/products?limit=${limit}&page=${prevPage}` : null,
            nextLink: hasNextPage ? `/products?limit=${limit}&page=${nextPage}` : null
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ status: 'error', message: 'Internal Server Error' });
    }
});

export { productsRouter };

