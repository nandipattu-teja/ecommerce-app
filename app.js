require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql2');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Configure the MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT,
});

// Connect to the database
db.connect((err) => {
  if (err) {
    alert(err)
    console.error('Database connection failed:', err.stack);
    return;
  }
  console.log('Connected to the database.');
  alert('database connected successfully')
});

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the E-commerce Site!');
});

// Retrieve products from the database
app.get('/products', (req, res) => {
  db.query('SELECT * FROM products', (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
    } else {
      res.json(results);
    }
  });
});

// Place an order
app.post('/order', (req, res) => {
  const { productId } = req.body;
  db.query('SELECT * FROM products WHERE id = ?', [productId], (err, results) => {
    if (err) {
      res.status(500).json({ error: 'Database query failed' });
    } else if (results.length > 0) {
      res.json({ message: 'Order placed successfully', product: results[0] });
    } else {
      res.status(404).json({ message: 'Product not found' });
    }
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
