# Ecom
 
#### A simple Ecommerce backend API develeoped by using ExpressJS and NodeJS

### Built With
- Express.js - Web framework for Node.js
- MongoDB - NoSQL database
- Helmet - Express.js security with HTTP headers
- Morgan - HTTP request logger middleware for Node.js

### APIs available:
This API is hosted on render.com and the API url is : `https://ecom-g2d0.onrender.com/api`
consider baseUrl : `https://ecom-g2d0.onrender.com/api`
The APIs are:
- login : POST `{{baseUrl}}/users/login`
- addUser : POST `{{baseUrl}}/users`
- updateUser : PUT `{{baseUrl}}/users`
- updateUserById : PUT `{{baseUrl}}/users/:id`
- getUsers : GET `{{baseUrl}}/users`
- updateUserById : PUT `{{baseUrl}}/users/:id`
- cerateCatiegory : POST `{{baseUrl}}/categories`
- getCategories : GET `{{baseUrl}}/categories`
- getCateforyById : GET `{{baseUrl}}/categories/:id`
- createProduct : POST `{{baseUrl}}/products`
- getProducts : GET `{{baseUrl}}/products`
- getProductById : GET `{{baseUrl}}/products/:id`
- getProductsByCategory : GET `{{baseUrl}}/categories/:categoryId/products`
- addCart : POST `{{baseUrl}}/cart`
- getCart : GET `{{baseUrl}}/cart`
- deleteCart : DELETE `{{baseUrl}}/cart/:id`
- placeOrder : POST `{{baseUrl}}/orders`
- getOrders : GET `{{baseUrl}}/orders`
- getAllOrders : GET `{{baseUrl}}/orders/all`
- getOrderByUserId : GET `{{baseUrl}}/orders/:id/orders`
- deleteOrders : DELETE `{{baseUrl}}/orders/:id`

Note: admin username and password are : `a1@email.com` and `12345` and notice that it may take a little bit of time for first API use as the application takes time to get back online in case of inactivity

## Steps to run the application locally

- clone the repository
  `git clone https://github.com/yadhunandanS/Ecom.git`

- install dependencies
  `npm install`

- running the application
   `npm start`
