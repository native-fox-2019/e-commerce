# e-commerce

https://dascomix.firebaseapp.com/





------------------------


#1. User Register 
##Succesfull register user
It will redirect you to homepage
<li> URL: 

    USER/REGISTER

<li> Method: 

    POST

<li> Request Body: 

```
{
  "email": "theNewUserz@mail.com",
  "password": "tests",
  "name": "New User",
  "level": "user"
}
```

<li> Output:
status (200)
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmV3IFVzZXIiLCJlbWFpbCI6InRoZU5ld1VzZXJ6QG1haWwuY29tIiwibGV2ZWwiOiJ1c2VyIiwiY3VzdElkIjo5LCJpYXQiOjE1ODUyMTQ2OTF9.tp4LEn2SIIkFexwOjBPrQR-fIpyrs0FW30r7Wv9IkSQ",
    "name": "New User",
    "level": "user"
}
```

###Login Failed:
#### because invalid request body

<li> Request Body

```
{
  "email": "",
  "password": "test",
  "name": "",
  "level": ""
}
```

<li> Output status (400)
```
{
    "msg": [
        "name cannot be empty",
        "name must be between 3 to 25 characters",
        "email cannot be empty",
        "invalid email format",
        "password must be 5 or more characters",
        "level user cannot be empty"
    ]
}
```

#### Because of email has been used before

<li> Request Body

```
{
  "email": "theNewUserz@mail.com",
  "password": "tests",
  "name": "New User Two",
  "level": "user"
}
```

<li> Output status (400)
```
{
    "msg": "Email Has Been Used"
}
```

#2. User Login 
##Succesfull Login
It will redirect you to homepage
<li> URL: 

    USER/LOGIN

<li> Method: 

    POST

<li> Request Body: 

```
{
  "email": "theNewUserz@mail.com",
  "password": "tests",
}
```

<li> Output:
status (200)
```
{
    "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiTmV3IFVzZXIiLCJlbWFpbCI6InRoZU5ld1VzZXJ6QG1haWwuY29tIiwibGV2ZWwiOiJ1c2VyIiwiY3VzdElkIjo5LCJpYXQiOjE1ODUyMTUzMzR9.L13cRm_ff60a7TY_cPyio2rlCq8eQxkwlWzRt3kBxAs",
    "name": "New User",
    "level": "user"
}
```

###Login Failed:
#### because mismatch or user doesnt exist

<li> Request Body

```
{
  "email": "theNewUserz@mail.com",
  "password": "test",

}
```

<li> Output status (400)
```
{
    "msg": "Invalid User/Password"
}
```


#3. GET ALL PRODUCT 
##Succesfully get product

<li> URL: 

    PRODUCT/

<li> Method: 

    GET

<li> Request Body: 

```
NONE
```

<li> Output:
status (200)
```
[
    {
        "id": 1,
        "name": "DC Injustice Vol 1 #1",
        "image_url": "https://vignette.wikia.nocookie.net/marvel_dc/images/8/8b/Injustice_Gods_Among_Us_Vol_1_1_Raapack_Variant.jpg/revision/latest?cb=20131202222220",
        "price": 20000,
        "stock": 4,
        "createdAt": "2020-03-25T02:15:21.844Z",
        "updatedAt": "2020-03-25T02:17:21.590Z"
    },
    {
        "id": 3,
        "name": "DC Injustice vol 1 #4",
        "image_url": "https://vignette.wikia.nocookie.net/marvel_dc/images/7/77/Injustice_Gods_Among_Us_Vol_1_4.jpg/revision/latest?cb=20131202223326",
        "price": 20000,
        "stock": 10,
        "createdAt": "2020-03-25T08:15:07.085Z",
        "updatedAt": "2020-03-25T08:15:07.085Z"
    },
]

```



#4. Add Product 
##Succesfully Add product

<li> URL: 

    PRODUCT/

<li> Method: 

    POST

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6ImFkbWluIiwiY3VzdElkIjoxLCJpYXQiOjE1ODUyMTU3NTN9.bdjdzUDB-igtmpd8ZAPbZQ9WspvuWHIwBqTWg0eJJkY"
```

<li> Request Body: 

```
{
  "name": "Item 1",
  "image_url": "www.somewhat.com",
  "price": 10000,
  "stock": 10,
}
```

<li> Output:
status (200)
```
{
    "id": 5,
    "name": "Item 1",
    "image_url": "www.somewhat.com",
    "price": 10000,
    "stock": 10,
    "updatedAt": "2020-03-26T09:47:19.068Z",
    "createdAt": "2020-03-26T09:47:19.068Z"
}

```


###Failed add product
#### because of invalid credential (authorization/authentification) failure)

<li> URL: 

    PRODUCT/

<li> Method: 

    POST

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6asddas;dlasdasdasd.bdjdzUDB-igtmpd8ZAPbZQ9WspvuWHIwBqTWg0eJJkY"
```

<li> Request Body: 

```
{
  "name": "Item 1",
  "image_url": "www.somewhat.com",
  "price": 10000,
  "stock": 10,
}
```

<li> Output:
status (403)
```
{
    "msg": "invalid credential"
}

```

#### because of invalid or missing request body

<li> URL: 

    PRODUCT/

<li> Method: 

    POST

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6asddas;dlasdasdasd.bdjdzUDB-igtmpd8ZAPbZQ9WspvuWHIwBqTWg0eJJkY"
```

<li> Request Body: 

```
{
  "name": "",
  "image_url": "",
  "price": "asdasd",
  "stock": -1,
}
```

<li> Output:
status (400)
```

{
    "msg": [
        "name cannot be empty",
        "image url cannot be empty",
        "Price must be number",
        "Product's Stock(s) must be positive value"
    ]
}


```





#4. Edit Product 
##Succesfully Edit product

<li> URL: 

    PRODUCT/:id

<li> Method: 

    PUT

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6ImFkbWluIiwiY3VzdElkIjoxLCJpYXQiOjE1ODUyMTU3NTN9.bdjdzUDB-igtmpd8ZAPbZQ9WspvuWHIwBqTWg0eJJkY"
```

<li> Request Body: 

```
{
  "name": "Item 1 revison",
  "image_url": "www.somewhat.com revision",
  "price": 10000,
  "stock": 10,
}
```

<li> Output:
status (200)
```
{
    "msg": "Succes update data",
    "data": {
        "id": "5",
        "name": "Item 1 revison",
        "image_url": "www.somewhat.com revision",
        "price": "10000",
        "stock": "10"
    }
}

```


###Failed Edit product
#### because of invalid credential (authorization/authentification) failure)

<li> URL: 

    PRODUCT/:id

<li> Method: 

    PUT

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6asddas;dlasdasdasd.bdjdzUDB-igtmpd8ZAPbZQ9WspvuWHIwBqTWg0eJJkY"
```

<li> Request Body: 

```
{
  "name": "Item 1 revison",
  "image_url": "www.somewhat.com revision",
  "price": 10000,
  "stock": 10,
}
```

<li> Output:
status (403)
```
{
    "msg": "invalid credential"
}

```

#### because of invalid request Body

<li> URL: 

    PRODUCT/:id

<li> Method: 

    PUT

<li> Request Headers:
```
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluekBtYWlsLmNvbSIsImxldmVsIjoiYWRtaW4iLCJjdXN0SWQiOjEwLCJpYXQiOjE1ODUyMTYwMjl9.zICTK053h8tqhMe4L2Ovws89oNKxM2C-s-NSNEF4ftw"
```

<li> Request Body: 

```
{
  "name": "",
  "image_url": "",
  "price": ayy lmao,
  "stock": -20,
}
```

<li> Output:
status (400)
```
{
    "msg": [
        "name cannot be empty",
        "image url cannot be empty",
        "Price must be number",
        "Product's Stock(s) must be positive value"
    ]
}

```



#5. Delete Product 
##Succesfully Delete product

<li> URL: 

    PRODUCT/:id

<li> Method: 

    DELETE

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW5pc3RyYXRvciIsImVtYWlsIjoiYWRtaW5AbWFpbC5jb20iLCJsZXZlbCI6ImFkbWluIiwiY3VzdElkIjoxLCJpYXQiOjE1ODUyMTU3NTN9.bdjdzUDB-igtmpd8ZAPbZQ9WspvuWHIwBqTWg0eJJkY"
```

<li> Request Body: 

```
NONE
```

<li> Output:
status (200)
```
{
    "msg": "succesfully delete data",
    "id": "5",
    "name": "Item 1 edit",
    "image_url": "newsomehat.jpg",
    "price": 99999,
    "stock": 199
}

```


###Failed Delete product
#### because of invalid credential (authorization/authentification) failure)

<li> URL: 

    PRODUCT/:id

<li> Method: 

    DELETE

<li> Request Headers:
```
"token": "example user token"
```

<li> Request Body: 

```
NONE
```

<li> Output:
status (403)
```
{
    "msg": "invalid credential"
}

```

#### because of data not found 

<li> URL: 

    PRODUCT/9999

<li> Method: 

    DELETE

<li> Request Headers:
```
"token":"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFkbWluekBtYWlsLmNvbSIsImxldmVsIjoiYWRtaW4iLCJjdXN0SWQiOjEwLCJpYXQiOjE1ODUyMTYwMjl9.zICTK053h8tqhMe4L2Ovws89oNKxM2C-s-NSNEF4ftw"
```

<li> Request Body: 

```
none
```

<li> Output:
status (400)
```
{
    "msg": "data not found"
}

```

----------------------

#CART

#1. Add Product to Cart 
##Succesfully add Cart

<li> URL: 

    cart/:ProductId

<li> Method: 

    POST

<li> Request Params: 

```
cart/3
```

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsc0BtYWlsLmNvbSIsImxldmVsIjoidXNlciIsImN1c3RJZCI6MTEsImlhdCI6MTU4NTIxODQwNH0.oBt_pyTJEFe_ANhC1Mh2aatA2EqF6SkTJvldcn6hHW0"
```

<li> Request Body: 

```
{
  "amount":20
}
```

<li> Output:
status (200)
```
[
    {
        "id": 16,
        "CustId": 11,
        "ProductId": 3,
        "amount": 3,
        "createdAt": "2020-03-26T11:10:51.167Z",
        "updatedAt": "2020-03-26T11:10:51.167Z",
        "Product": {
            "id": 3,
            "name": "DC Injustice vol 1 #4",
            "image_url": "https://vignette.wikia.nocookie.net/marvel_dc/images/7/77/Injustice_Gods_Among_Us_Vol_1_4.jpg/revision/latest?cb=20131202223326",
            "price": 20000,
            "stock": 10,
            "createdAt": "2020-03-25T08:15:07.085Z",
            "updatedAt": "2020-03-25T08:15:07.085Z"
        }
    }
]

```


###Failed  add Cart
#### because of invalid credential (authorization/authentification) failure)

<li> URL: 

    Cart/:id

<li> Method: 

    DELETE

<li> Request Headers:
```
"token": "example user token"
```

<li> Request Params:
```
cart/3
```


<li> Request Body: 

```
"amount":20
```

<li> Output:
status (403)
```
{
    "msg": "invalid credential"
}

```
#### because of invalid amount

<li> URL: 

    PRODUCT/:id

<li> Method: 

    DELETE

<li> Request Headers:
```
"token": "example user token"
```

<li> Request Params:
```
cart/3
```


<li> Request Body: 

```
NONE
```

<li> Output:
status (400)
```
{
    "msg": "amount must be positive value"
}

```


#2. GET CART for Certain User
##Succesfully Get Cart

<li> URL: 

    cart/

<li> Method: 

    GET


<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsc0BtYWlsLmNvbSIsImxldmVsIjoidXNlciIsImN1c3RJZCI6MTEsImlhdCI6MTU4NTIxODQwNH0.oBt_pyTJEFe_ANhC1Mh2aatA2EqF6SkTJvldcn6hHW0"
```

<li> Request Body: 

```
{
  NONE
}
```

<li> Output:
status (200)
```
[
    {
        "id": 13,
        "CustId": 11,
        "ProductId": 1,
        "amount": 45,
        "createdAt": "2020-03-26T10:38:01.365Z",
        "updatedAt": "2020-03-26T10:42:46.094Z",
        "Product": {
            "id": 1,
            "name": "DC Injustice Vol 1 #1",
            "image_url": "https://vignette.wikia.nocookie.net/marvel_dc/images/8/8b/Injustice_Gods_Among_Us_Vol_1_1_Raapack_Variant.jpg/revision/latest?cb=20131202222220",
            "price": 20000,
            "stock": 4,
            "createdAt": "2020-03-25T02:15:21.844Z",
            "updatedAt": "2020-03-25T02:17:21.590Z"
        }
    },
    {
        "id": 14,
        "CustId": 11,
        "ProductId": 4,
        "amount": 45,
        "createdAt": "2020-03-26T10:41:53.225Z",
        "updatedAt": "2020-03-26T11:10:26.336Z",
        "Product": {
            "id": 4,
            "name": "komik",
            "image_url": "www.asdasdasd.com",
            "price": 10000,
            "stock": 3,
            "createdAt": "2020-03-26T06:56:24.758Z",
            "updatedAt": "2020-03-26T06:56:24.758Z"
        }
    },
    {
        "id": 15,
        "CustId": 11,
        "ProductId": 6,
        "amount": 6,
        "createdAt": "2020-03-26T10:43:18.026Z",
        "updatedAt": "2020-03-26T10:44:47.052Z",
        "Product": {
            "id": 6,
            "name": "Item 1",
            "image_url": "www.somewhat.com",
            "price": 10000,
            "stock": 10,
            "createdAt": "2020-03-26T09:53:42.121Z",
            "updatedAt": "2020-03-26T09:53:42.121Z"
        }
    },
    {
        "id": 16,
        "CustId": 11,
        "ProductId": 3,
        "amount": 3,
        "createdAt": "2020-03-26T11:10:51.167Z",
        "updatedAt": "2020-03-26T11:18:29.128Z",
        "Product": {
            "id": 3,
            "name": "DC Injustice vol 1 #4",
            "image_url": "https://vignette.wikia.nocookie.net/marvel_dc/images/7/77/Injustice_Gods_Among_Us_Vol_1_4.jpg/revision/latest?cb=20131202223326",
            "price": 20000,
            "stock": 10,
            "createdAt": "2020-03-25T08:15:07.085Z",
            "updatedAt": "2020-03-25T08:15:07.085Z"
        }
    }
]

```


###Failed  GET Cart
#### because of invalid credential (authorization/authentification) failure)

<li> URL: 

    cart/

<li> Method: 

    GET

<li> Request Headers:
```
"token": "different user token"
```



<li> Request Body: 

```
NONE
```

<li> Output:
status (403)
```
{
    "msg": "invalid credential"
}

```


#3. Delete CART for Certain User
##Succesfully Delete Cart

<li> URL: 

    cart/:productId

<li> Method: 

    Delete


<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsc0BtYWlsLmNvbSIsImxldmVsIjoidXNlciIsImN1c3RJZCI6MTEsImlhdCI6MTU4NTIxODQwNH0.oBt_pyTJEFe_ANhC1Mh2aatA2EqF6SkTJvldcn6hHW0"
```

<li> Request Body: 

```
{
  NONE
}
```

<li> Output:
status (200)
```
{
    "msg": "succesfully delete data",
    "id": "1",
    "name": "DC Injustice Vol 1 #1",
    "image_url": "https://vignette.wikia.nocookie.net/marvel_dc/images/8/8b/Injustice_Gods_Among_Us_Vol_1_1_Raapack_Variant.jpg/revision/latest?cb=20131202222220",
    "price": 20000,
    "stock": 4
}

```


###Failed  Delete Cart
#### because of invalid credential (authorization/authentification) failure)

<li> URL: 

    Cart/:productId

<li> Method: 

    GET

<li> Request Headers:
```
"token": "different user token"
```



<li> Request Body: 

```
NONE
```

<li> Output:
status (403)
```
{
    "msg": "invalid credential"
}

```


#### because of Data Not found
<li> URL: 

    Cart/:productId

<li> Method: 

    GET

<li> Request Headers:
```
"token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImVtYWlsc0BtYWlsLmNvbSIsImxldmVsIjoidXNlciIsImN1c3RJZCI6MTEsImlhdCI6MTU4NTIxODQwNH0.oBt_pyTJEFe_ANhC1Mh2aatA2EqF6SkTJvldcn6hHW0"
```



<li> Request Body: 

```
NONE
```

<li> Output:
status (404)
```
{
    "msg": "data not found"
}

```
