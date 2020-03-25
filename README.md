# Deploy Link :
## [https://jinxpedia-1585158679117.firebaseapp.com](https://jinxpedia-1585158679117.firebaseapp.com)
## Demo Account for Admin: 
```
Email: admin@admin.com
Password: admin
```

# Endpoint:
## [https://shielded-refuge-06289.herokuapp.com](https://shielded-refuge-06289.herokuapp.com)


# List of available endpoints:
- `POST /users/login`
- `POST /users/register`
- `GET /products`
- `PATCH /products/:id`
- `POST /products`
- `PUT /products/:id`
- `DELETE /products/:id`
- `GET /carts`
- `POST /carts`
- `DELETE /carts/:id`
- `PUT /carts/:id`
- `GET /carts/checkout`
# Error response format:

## Status: 4xx or 5xx
```json
{
  "status": "status code",
  "message": "error message"
}
```

# POST /users/register

## Register an account
## Endpoint
> /users/register

## Request:
```
{
    name: string,
    email: string,
    password: string
}
```
All req.body is **required**

## Response:
Status 201
```
{
    id: 1,
    email: "test@test.com",
    password: "hashedPassword",
    role: 'User',
    createdAt: 2020-03-03T15:01:27.405Z,
    updatedAt: 2020-03-03T15:01:27.405Z
}
```

# POST /users/login

## Login an account
## Endpoint
> /users/login

## Request:
```
{
    email: string,
    password: string
}
```
All req.body is **required**

## Response:
Status 200
```
{
   token: "YOUR_TOKEN",
   role: "YOUR_ROLE"
}
```
# GET /products

## Get all product data
## Endpoint
> /products

## Response:
Status 200
```
[
    {
        id: 1,
        name: "J!NX Hazard Zip-Up Hoodie",
        image_url: "https://cdn.shopify.com/s/files/1/0218/8417/4408/products/10637p_0c_1x_58b01f09-ec5c-4ea4-8571-1d978fa7664d_400x.jpg?v=1582822346",
        price: 750000,
        stock: 10,
        createdAt: 2020-04-03T15:01:27.405Z,
        updatedAt: 2020-04-03T15:01:27.405Z
    }
]
```
# PATCH /products/:id

## Edit your product's stock
## Endpoint
> /products/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```

## Request:
```
{
    stock: integer
}
```
## Response:
Status 201
```
{
  msg: 'Success'
}
```

# POST /products

## Add a new product
## Endpoint
> /products

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```

## Request:
```
{
    name: string,
    image_url: string,
    price: integer,
    stock: integer
}
```
## Response:
Status 201
```
{
    id: 1,
    name: "J!NX Hazard Zip-Up Hoodie",
    image_url: "https://cdn.shopify.com/s/files/1/0218/8417/4408/products/10637p_0c_1x_58b01f09-ec5c-4ea4-8571-1d978fa7664d_400x.jpg?v=1582822346",
    price: 750000,
    stock: 10,
    createdAt: 2020-04-03T15:01:27.405Z,
    updatedAt: 2020-04-03T15:01:27.405Z
}
```

# PUT /products/:id

## Edit your product
## Endpoint
> /products/:id

## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```

## Request:
```
{
    name: string,
    image_url: string,
    price: integer,
    stock: integer
}
```
## Response:
Status 201
```
{
  msg: 'Success'
}
```

# DELETE /products/:id

## Delete a product
## Endpoint
>/product/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
```
{
  msg: 'Success'
}
```

# GET /carts

## Get User's cart
## Endpoint
>/carts
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
```
{
    "id": 2,
    "name": "Test Account",
    "email": "test@test.com",
    "password": "hashedPasword",
    "role": "User",
    "createdAt": "2020-03-25T18:45:42.738Z",
    "updatedAt": "2020-03-25T18:45:42.738Z",
    "Products": [
        {
            "id": 11,
            "name": "J!NX Men's Bomber Jacket",
            "image_url": "https://cdn.shopify.com/s/files/1/0218/8417/4408/products/7399p_0c_1x_e14bdcd4-d889-43dd-b160-36d5d5995f2b_400x.jpg?v=1582824437",
            "price": 500000,
            "stock": 4,
            "createdAt": "2020-03-25T18:43:25.580Z",
            "updatedAt": "2020-03-25T18:43:25.580Z",
            "Cart": {
                "id": 4,
                "UserId": 2,
                "ProductId": 11,
                "stock": 1,
                "createdAt": "2020-03-25T19:26:36.704Z",
                "updatedAt": "2020-03-25T19:26:36.704Z"
            }
        }
    ]
}
```

# POST /carts

## Add a new Cart
## Endpoint
>/carts
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Request:
```
{
    stock: integer
    ProductId: integer
}
```
## Response:
Status 201
```
{
    "id": 5,
    "stock": 1,
    "ProductId": 3,
    "UserId": 2,
    "updatedAt": "2020-03-25T19:54:41.379Z",
    "createdAt": "2020-03-25T19:54:41.379Z"
}
```
# DELETE /carts/:id

## Delete User's Cart
## Endpoint
>/carts/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 200
{
  msg: 'Success'
}

# PUT /carts/:id

## Edit User's Cart
## Endpoint
>/carts/:id
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Request:
```
{
    stock: integer
}
```
## Response:
Status 201
```
{
  msg: 'Success'
}
```

# GET /carts/checkout

## Checkout all User's cart
## Endpoint
>/carts/checkout
## Authentication:
Token (required)

## Request header: 
```
token: YOUR_TOKEN
```
## Response:
Status 201
```
{
  msg: 'Success'
}
```