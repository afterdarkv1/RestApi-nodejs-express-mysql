// Tu archivo principal (por ejemplo, routes.js)
import { getProductsFromDB, getProductByIdFromDB, createProductInDB, deleteProductFromDB, updateProductInDB } from '../Models/productModel.js';

export const getProducts = async (req, res) => {
    try {
        const rows = await getProductsFromDB();
        res.json(rows);
    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        });
    }
};

export const getProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const rows = await getProductByIdFromDB(id);

        if (rows.length <= 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        });
    }
};

export const createProduct = async (req, res) => {
    try {
        const { title, description, price } = req.body;
        const insertId = await createProductInDB({ title, description, price });

        res.send({
            id: insertId,
            title,
            description,
            price,
        });

        console.log(req.body);
    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        });
    }
};

export const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const affectedRows = await deleteProductFromDB(id);

        if (affectedRows <= 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        res.sendStatus(204);
    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        });
    }
};

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const { title, description, price } = req.body;

    try {
        const affectedRows = await updateProductInDB({ id, title, description, price });

        if (affectedRows === 0) {
            return res.status(404).json({
                message: 'Product not found'
            });
        }

        const rows = await getProductByIdFromDB(id);
        res.json(rows[0]);
    } catch (error) {
        return res.status(500).json({
            message: 'something goes wrong'
        });
    }
};
