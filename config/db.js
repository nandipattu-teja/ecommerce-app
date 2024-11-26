import mysql from 'mysql2';
import dotenv from 'dotenv';
dotenv.config();

const connection = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

// Connect to the database
export const connectDB = () => {
  return new Promise((resolve, reject) => {
    connection.connect((err) => {
      if (err) {
        reject('Database connection failed: ' + err.stack);
      } else {
        resolve('Connected to the database.');
      }
    });
  });
};

// Function to execute queries
export const execute = (query, params) => {
  return new Promise((resolve, reject) => {
    connection.execute(query, params, (err, results) => {
      if (err) {
        reject(err);
      } else {
        resolve(results);
      }
    });
  });
};

// Optional: Close the connection (if needed)
export const closeConnection = () => {
  connection.end((err) => {
    if (err) {
      console.error('Error closing the connection:', err);
    } else {
      console.log('Connection closed.');
    }
  });
};
