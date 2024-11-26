import { execute } from '../config/db.js';  // Database execution

// Function to get all products
export async function getAllProducts(req, res) {
    try {
        const products = await execute('SELECT * FROM products', []);
        res.status(200).json({ products });
    } catch (err) {
        console.error('Error fetching products:', err);
        res.status(500).json({
            message: 'An error occurred while fetching products.',
            error: err.message,
        });
    }
}

// Function to create a new product
export async function createProduct(req, res) {
    const { name, price, description } = req.body;

    // Validation
    if (!name || !price) {
        return res.status(400).json({ message: 'Product name and price are required.' });
    }

    try {
        const [result] = await execute(
            'INSERT INTO products (name, price, description) VALUES (?, ?, ?)',
            [name, price, description]
        );
        res.status(201).json({
            message: 'Product created successfully.',
            productId: result.insertId,
            name,
            price,
            description,
        });
    } catch (err) {
        console.error('Error creating product:', err);
        res.status(500).json({
            message: 'An error occurred while creating the product.',
            error: err.message,
        });
    }
}