const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Sample data
const products = [
  { id: 1, name: 'Laptop', price: 999.99 },
  { id: 2, name: 'Phone', price: 499.99 },
  { id: 3, name: 'Tablet', price: 299.99 }
];

// Routes
app.get('/', (req, res) => {
  res.send('Welcome to the Sample E-commerce Site');
});

app.get('/products', (req, res) => {
  res.json(products);
});

app.post('/order', (req, res) => {
  const { productId } = req.body;
  const product = products.find(p => p.id === productId);
  if (product) {
    res.json({ message: 'Order placed successfully', product });
  } else {
    res.status(404).json({ message: 'Product not found' });
  }
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
