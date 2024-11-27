import { execute } from '../config/db.js';  // Database execution
import { sendMessage } from '../utils/awsHandler.js';  // SQS utility

// Function to place an order
export async function placeOrder(req, res) {
    const { products, total } = req.body;

    // Validation: Ensure the products and total are provided
    if (!products || products.length === 0) {
        return res.status(400).json({ message: 'Products are required.' });
    }
    if (total === undefined || total === null) {
        return res.status(400).json({ message: 'Total amount is required.' });
    }

    try {
        // Step 1: Insert the order into the `orders` table
        const orderResult = await execute(
            'INSERT INTO orders (total) VALUES (?)',
            [total]
        );
        
        // Step 2: Get the order ID from the insert result
        const orderId = orderResult.insertId;

        // Step 3: Insert products into the `order_products` table (many-to-many relationship)
        const productInserts = products.map(productId => {
            return execute(
                'INSERT INTO order_products (order_id, product_id) VALUES (?, ?)',
                [orderId, productId]
            );
        });

        // Wait for all product inserts to complete
        await Promise.all(productInserts);

        // Step 4: Send a message to SQS with the order details
        const sqsMessage = {
            orderId,
            total,
            products,
        };

        // Send message to the SQS queue
        await sendMessage(sqsMessage);

        // Step 5: Send a success response
        res.status(201).json({
            message: 'Order placed successfully.',
            orderId,
            total,
            products,
        });

    } catch (err) {
        // Handle any errors that occur during the order creation process
        console.error('Error placing order:', err);
        res.status(500).json({
            message: 'An error occurred while placing the order.',
            error: err.message,
        });
    }
}

// Function to get all orders
export async function getAllOrders(req, res) {
    try {
        const orders = await execute('SELECT * FROM orders', []);
        res.status(200).json({ orders });
    } catch (err) {
        console.error('Error fetching orders:', err);
        res.status(500).json({
            message: 'An error occurred while fetching orders.',
            error: err.message,
        });
    }
}