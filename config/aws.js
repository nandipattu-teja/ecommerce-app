// config/aws.js
import { SQSClient } from '@aws-sdk/client-sqs';
import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";
import { RDSClient } from '@aws-sdk/client-rds';
import dotenv from 'dotenv';
dotenv.config();

const sqsClient = new SQSClient({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const s3Client = new S3Client({
  region: process.env.AWS_REGION, // Replace with your region
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// const rdsClient = new RDSClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// Export clients
export { sqsClient, s3Client };
