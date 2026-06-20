# VaultPay Financial Core

A secure full-stack invoice payment platform built with Node.js, Express, MongoDB, Stripe, React, Cloudinary, PDFKit, and Nodemailer.

## Features

### Authentication

* JWT Authentication
* Protected Routes
* Password Hashing with bcrypt

### Zero Trust Security

* JWT Verification on every API request
* IDOR Prevention Middleware
* Ownership Validation
* Secure Resource Access

### Invoice Management

* Create Invoice
* View Invoice List
* View Invoice Details
* Invoice Status Tracking

### Stripe Integration

* Stripe Checkout Session
* Secure Webhook Verification
* Payment Processing
* Automatic Status Updates

### Automated Receipt System

* PDF Receipt Generation
* Nexus Corporate Branding
* PAID Watermark
* Cloudinary Upload
* Email Delivery

## Tech Stack

### Backend

* Node.js
* Express.js
* MongoDB
* Mongoose
* JWT
* Stripe
* PDFKit
* Cloudinary
* Nodemailer

### Frontend

* React
* Vite
* Axios
* React Router

## Project Structure

backend/
frontend/

## Security Features

### JWT Authentication

Every protected route requires a valid JWT token.

### IDOR Prevention

Users can only access invoices they own.

Example:

User A:
GET /api/invoices/123

User B:
GET /api/invoices/123

Response:
403 Forbidden

### Stripe Webhook Verification

All Stripe events are verified using:

stripe.webhooks.constructEvent()

before any database update occurs.

## Workflow

Login
↓
View Invoice
↓
Stripe Checkout
↓
Webhook Verification
↓
Invoice Paid
↓
PDF Receipt Generated
↓
Cloudinary Upload
↓
Email Sent

## Installation

See Environment Setup section below.

## Author

Hemlata Chauhan
