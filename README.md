# Remixi Music Rating WebApp

#### By: Chi Phan and Nagena Latifi

This repository implements the PHP/MySQL backend for our K-Pop music rating web app via a REST API, and connects it to a JavaScript/React frontend. 

## Table of Contents
- [Features](#features)
- [Database Schema](#database-schema)
- [Architecture](#architecture)
- [RESTful API](#restful-api)
- [Directory Structure](#directory-structure)
- [Setup and Installation](#setup-and-installation)
- [Important Notes](#important-notes)

## Features
The application allows users to:
- Sign up and login/logout with authentication using PHPSESSID tokens, with authentication implemented to prevent SQL injection.
- View, add, update, and delete song ratings (including title, artist, and rating).
- Search through existing ratings for specific artists and/or songs and filter by minimum and/or maximum star ratings.

## Database Schema
All data is stored in the `music_db` database, which consists of two tables: `users` and `ratings`.

### Users Table
![Users Table](images/users_table.png)

### Ratings Table
![Ratings Table](images/ratings_table.png)

## Architecture
The app is built using the **Model-View-Controller (MVC)** architecture, which organizes the code into three components:

- **Model**: Manages data and business logic, communicates with the database to perform CRUD operations.
- **View**: Provides the user interface, presenting data to the user via dynamic HTML templates.
- **Controller**: Acts as an intermediary between the Model and View, processing requests, interacting with the Model, and rendering the appropriate View.

## RESTful API
The application provides a RESTful API that adheres to the principles of REST for communication between the client and the server.

### Key Features:
- **Stateless Interactions**: Each request contains all the necessary information for the server to process it.
- **Resource-Based URLs**: Exposes resources like `/api/users` and `/api/ratings` via structured URLs.
- **HTTP Methods**: Supports standard CRUD operations using `GET`, `POST`, `PUT/PATCH`, and `DELETE`.
- **Response Codes**: Uses standard HTTP response codes (e.g., `200` for success, `400` for client errors, and `500` for server errors).

## Directory Structure

### Frontend (`remixi`)
```plaintext
remixi/
└── src/
    ├── Signin.js         // Account creation page
    ├── Login.js          // User login page
    ├── HomePage.js       // Main page (available after login) with all app features
    ├── ViewRating.js     // View detailed information of a song rating
    ├── AddRating.js      // Add new ratings to the database
    ├── UpdateRating.js   // Update an existing rating
    ├── DeleteRating.js   // Delete a rating from the database
    └── SearchRating.js   // Search for ratings by artist, song, and rating range
```

### Backend (`backend`)
```plaintext
backend/
└── Controller/Api/
    ├── BaseController.php  // Base controller for common functionality
    ├── RatingController.php // Handles rating-related HTTP requests
    └── UserController.php   // Handles user account-related HTTP requests

└── Model/
    ├── Database.php     // Provides database connection and query methods
    ├── RatingModel.php  // Methods to manage the ratings data
    └── UserModel.php    // Methods to manage the user data

└── index.php           // Front controller, routes incoming requests to appropriate controllers
```

## Setup and Installation

### Prerequisites:
- **XAMPP**: Ensure MySQL Database and Apache Web Server are running.
- **Node.js**: For managing the frontend React app.

### Steps to Run Locally:

1. Start your MySQL Database and Apache Web Server using XAMPP.
2. Copy the repository into the `htdocs` directory within XAMPP.
3. Navigate to the `remixi` folder for the frontend:
```bash
cd remixi
```
5. To install dependencies:
```bash
npm install
```
5. Start the frontend application:
```bash
npm start
```

### Important Notes:
Files like HomePage.js, Login.js, and Signup.js may have incorrect capitalization when cloned. Ensure these filenames match the capitalization shown above for App.js to work properly.

