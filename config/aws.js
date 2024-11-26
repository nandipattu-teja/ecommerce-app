// config/aws.js
import { SQSClient } from '@aws-sdk/client-sqs';
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

// const rdsClient = new RDSClient({
//   region: process.env.AWS_REGION,
//   credentials: {
//     accessKeyId: process.env.AWS_ACCESS_KEY_ID,
//     secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
//   },
// });

// Export clients
export { sqsClient };
