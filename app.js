import express from 'express';
import bodyParser from 'body-parser';
import { connectDB } from './config/db.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import dotenv from 'dotenv';
import { setupSwagger } from './swagger.js';
dotenv.config(); 

const app = express();
app.use(bodyParser.json());

const startServer = async () => {
  try {
    const dbMessage = await connectDB();
    console.log(dbMessage);


    app.use('/api/products', productRoutes);
    app.use('/api/orders', orderRoutes);

    app.get('/health', (req, res) => {
      res.status(200).send('Server is healthy');
    });

    const PORT = process.env.PORT || 4000;
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Error connecting to database:', error);
    process.exit(1); // Exit the process with an error code
  }
};

startServer();