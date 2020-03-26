### 1. POST /user/register
## Example Input (Request Body):

{
    "email": "test@mail.com",
    "password": "test"
}
## Response (201):

{
    token: "my token"
    } 
Example Input (Request Body) :

{
    "email": ,
    "password": "test"
}
Response ERROR (401):

{
    msg:"email and password must be filled"
}


### 2. POST /user/login
Example Input (Request Body):

{
    "email": "test@mail.com",
    "password": "test"
}
Response (200):

   {
    token: "my token"
   } 
Example Input (Request Body) :

{
    "email": "test@mail.com",
    "password": "apa" ,	
}
Response ERROR (404):

{ 
    msg:"id or email is not found" 
}

|                        Shopper                             |
|-------------------------------------------------------------|
| Url        |	Method	 |Description                         |
|/product/:id|	  GET	 | Menampilkan produk berdasarkan id  |
|/product/:id|	  PUT	 |    Melakukan edit ke produk        |
|/product/:id|	DELETE	 |   Menghapus produk dari list       |
| /product/	 |    POST	 |      Menambahkan produk baru       |
| /product/	 |    GET	 |      Menampilkan list produk       |
|----------- |-----------|----------------------------------|

### 1. POST /product
Example Input (Request Headers):

{
    token: "yourToken..."

}
Example Input (Request Body):

{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
}
Response (201):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
}


Example Input:

{
	"name" : ,
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
}
Response ERROR (500):

{
	message: "Internal server error"
}

### 2. GET /product
Example Input (Request Headers):

{
    token: "my token"

}
Response (200):

[
    {
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
Example Input (Request Headers) :

{
 token: "my token"
}
Response ERROR (404):

{
	msg: "data is not found"
}

### 3. GET /product/:id
Example Input (Request Headers):

{
    token: my token
}
Response (200):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Example Input (Request Headers):

{
    
}
Response ERROR (404):

{
	msg: "data is not found"
}
### 4. PUT /product/:id
Example Input (Request Headers):

{
    token: "my token"
}
Example Input (Request Body):

{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "5"
}
Response (200):

{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "5"
}
Example Input (Request Headers):

{
    token: "wrong token"

}
Example Input (Request Body):

{
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "5"
}
Response ERROR (403):

{
	message: "not authorized"
}
Response ERROR (400):

	{
        msg: "update fail"
    }

### 5. DELETE /product/:id
Example Input (Request Headers):

{
token:"my token"
}
Response (200):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

Example Input (Request Headers):

{
    token: "Wrong token"

}
Example Input (Request Body):

{
    "id":1
	"name" : "test",
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response ERROR (403):

{
	message: "not authorized"
}
Response ERROR (404):

{
	msg: "data is not found"
}

|                        louiv-vutton                         |
|-------------------------------------------------------------|
| Url        |	Method	 |Description                         |
|/cart  /:id|	  PUT	 |    Melakukan edit ke cart          |
|/cartt/:id|	DELETE	 |   Menghapus produk dari cart       |
| /cart/	 |    POST	 |      Menambahkan item ke cart      |
| /cart/	 |    GET	 |      Menampilkan list produk       |
|----------- |-----------|----------------------------------|

### 1. POST /cart
Example Input (Request Headers):

{
    token: "yourToken..."

}
Example Input (Request Body):

{
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompet",
    "amount": "1",
    "image_url": "dompet.com",
}
Response (201):

{
    "id" : 1
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompet",
    "amount": "1",
    "image_url": "dompet.com"
}


Example Input:

{
	"name" : ,
    "image_url" : "test.com",
    "price": "150000",
    "stock": "1"
}
Response ERROR (500):

{
	message: "Internal server error"
}

### 2. GET /cart
Example Input (Request Headers):

{
    token: "my token"

}
Response (200):

[
    {
    "id" : 1
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompet",
    "amount": "1",
    "image_url": "dompet.com",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
    }
]
Example Input (Request Headers) :

{
 token: "my token"
}
Response ERROR (404):

{
	msg: "data is not found"
}

### 3. GET /product/:id
Example Input (Request Headers):

{
    token: "my token"
}
Response (200):

{
    "id" : 1
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompet",
    "amount": "1",
    "image_url": "dompet.com",
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Example Input (Request Headers & params):

{
    token: "my token"
}

{
    params.id : 2
}
Response ERROR (404):

{
	msg: "data is not found"
}
### 4. PUT /product/:id
Example Input (Request Headers):

{
    token: "my token"
}
Example Input (Request Body):

{
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompetEdited",
    "amount": "2",
    "image_url": "dompet.com"
}
Response (200):

{
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompetEdited",
    "amount": "2",
    "image_url": "dompet.com"
}
Example Input (Request Headers):

{
    token: "wrong token"

}
Example Input (Request Body):

{
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompetEdited",
    "amount": "2",
    "image_url": "dompet.com"
}
Response ERROR (403):

{
	message: "not authorized"
}
Response ERROR (400):

	{
        msg: "update fail"
    }

### 5. DELETE /product/:id
Example Input (Request Headers):

{
token:"my token"
}
Response (200):

{
    "id":1
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompetEdited",
    "amount": "2",
    "image_url": "dompet.com"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}

Example Input (Request Headers):

{
    token: "Wrong token"

}
Example Input (Request Body):

{
    "id":3
	"usersId" : "1",
    "productsId" : "2",
    "name": "dompetEdited",
    "amount": "2",
    "image_url": "dompet.com"
    "createdAt": "2020-03-20T07:15:12.149Z",
    "updatedAt": "2020-03-20T07:15:12.149Z",
}
Response ERROR (403):

{
	message: "not authorized"
}
Response ERROR (404):

{
	msg: "data is not found"
}