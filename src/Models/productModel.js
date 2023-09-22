// models/productModel.js
import { pool } from '../db.js';

export const getProductsFromDB = async () => {
    const [rows] = await pool.query('SELECT * FROM products');
    return rows;
};

export const getProductByIdFromDB = async (id) => {
    const [rows] = await pool.query('SELECT * FROM products WHERE id = ?', [id]);
    return rows;
};

export const createProductInDB = async ({ title, description, price }) => {
    const [rows] = await pool.query('INSERT INTO products(title, description, price) VALUES (?, ?, ?)', [title, description, price]);
    return rows.insertId;
};

export const deleteProductFromDB = async (id) => {
    const [result] = await pool.query('DELETE FROM products WHERE id = ?', [id]);
    return result.affectedRows;
};

export const updateProductInDB = async ({ id, title, description, price }) => {
    const [result] = await pool.query('UPDATE products SET title = IFNULL(?, title), description = IFNULL(?, description), price = IFNULL(?, price) WHERE id = ?', [title, description, price, id]);
    return result.affectedRows;
};
