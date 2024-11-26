# Node.js E-Commerce Backend

This is the backend for the e-commerce application built using **Node.js**, **Express**, **MySQL** (RDS), **Amazon S3**, **SQS**, and other AWS services. The backend provides essential features for handling products, orders, and integrates with AWS services like **S3**, **RDS**, **SQS**, and **CloudWatch**.

## Features

- **Product Management**: Add and retrieve products.
- **Order Management**: Place orders, save order details in MySQL, and send order information to **SQS**.
- **AWS Integration**:
  - **Amazon RDS** (MySQL) for storing product and order data.
  - **Amazon S3** for static file storage (e.g., images).
  - **SQS** for messaging (send messages when an order is placed).
  - **CloudWatch** for monitoring logs and metrics.
  - **Elastic Beanstalk** for deployment.

## Prerequisites

1. **Node.js** (version 14.x or higher).
2. **MySQL** (RDS instance created on AWS).
3. **AWS account** with S3, SQS, RDS, CloudWatch, and Elastic Beanstalk set up.
4. **AWS CLI** configured with proper credentials.

## Installation

Clone this repository:

```bash
git clone <repository-url>
cd ecommerce-app