# e-commerce
E-Commerce application is developed using express, posgresql, sequelize, and vue js. 
In this application, there are two roles : admin and customer. 
Admin can add, edit, delete his/her products. Also, admin can see if someone put his/her product in cart.
Customer can add or delete the product in his/her cart and confirm order for the product.

This application is deployed in heroku for backend and firebase for frontend as following link:
Heroku link: https://fierce-taiga-43282.herokuapp.com
Firebase link: https://ecommerce-all.firebaseapp.com

contoh input akun yang telah dimasukkan di admin: 
email: admin1@mail.com
password: admin1

contoh input akun yang telah dimasukkan di customer:
email: cust1@mail.com
password: cust1

------------
Method & URL 
GET | POST | DELETE | PUT
Example of method and url can be found in link: 
https://documenter.getpostman.com/view/10571187/SzS8s59u?version=latest#3e0c48e4-5252-4f69-9555-4c99a2edef86

-----------
Params

Required:
id=[integer]

-----------
Data Params

User(admin)
username : string
email : string
password : string

Product
name: string
image_url: string
price: integer
stock: integer
userId: integer

Customer
email:string
password: string

CustomerProduct (conjuction table)
CustomerId: integer
ProductId: integer
quantity: integer
status_order: boolean

-----------
Success Response:
Code: 200 
Code: 201 

Error Response:
Code: 400
Code: 401
Code: 500

----------

