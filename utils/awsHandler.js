// utils/sqsHandler.js
import { SendMessageCommand } from '@aws-sdk/client-sqs';
import { PutObjectCommand } from "@aws-sdk/client-s3";
import { sqsClient, s3Client } from '../config/aws.js';
import { v4 as uuidv4 } from 'uuid';


export const sendMessage = async (messageBody) => {
  const params = {
    QueueUrl: process.env.SQS_QUEUE_URL,
    MessageBody: JSON.stringify(messageBody),
    MessageGroupId:  uuidv4(),
    MessageDeduplicationId: uuidv4(),
  };

  try {
    const command = new SendMessageCommand(params);
    const data = await sqsClient.send(command);
    console.log("Message sent to SQS:", data);
    return data;
  } catch (err) {
    console.error("Error sending message to SQS:", err);
    throw err;
  }
};

export const uploadFile = async (fileContent, bucketName, key) => {
  const params = {
    Bucket: bucketName,
    Key: key, // File name in S3
    Body: fileContent,
  };

  try {
    const command = new PutObjectCommand(params);
    await s3Client.send(command);
    console.log("File uploaded successfully.");
  } catch (error) {
    console.error("Error uploading file:", error);
  }
};
