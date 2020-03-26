# e-commerce

### Deployment Link

```bash
CMS : https://luxury-watch-store.firebaseapp.com/
USER : https://luxury-watch-store.firebaseapp.com/admin
```

# Server dependencies
### Dependencies

server side

| Package | Version |
| --- | --- |
| "bcrypt"              | "^4.0.1" |
| "cors"                | "^2.8.5" |
| "dotenv"              | "^8.2.0" |
| "express"             | "^4.17.1"|
| "jsonwebtoken"        | "^8.5.1" |
| "pg"                  | "^7.18.2"|
| "sequelize"           | "^5.21.5"| 

client side 

| Package | Version |
| --- | --- |
| "axios"               | "^0.19.2" |
| "vue"                 | "^2.6.11" |
| "vuex"                | "^3.1.2"  |
| "vue-hot-reload-api"  | "^2.3.4"  |
| "bootsrap"            | "^4.4.1"  |
| "sweetalert"          | "^2.1.2"  |



# Default Port

```bash
SERVER : http://localhost:3000
CLIENT : http://localhost:8080
```

# Server Tools
```bash
Tools: NodeJS, Express, sequelize, postgresql
```

# Client Tools
```bash
Vue, Vue CLI, Vuex
```

# .env example
```bash
JWT_KEY =
```
# User
| URL | Method | Description |
| --- | --- | --- |
| /user/register        | POST | creating new user|
| /user/login           | POST | login and get access token |
| /userproduct          | GET  | generate product list|
| /addtocart            | POST | adding product to cart |
| /editstock/:id        | PUT  | editing the amount of product stock|
| /getcart              | GET  | generate product that added to cart by user |
| /deletecart/:id       | DELETE | removing product from user cart|
| /address              | POST | creating user address |
| /address              | GET | generate user address|


# Admin
| URL | Method | Description |
| --- | --- | --- |
| /admin/register        | POST | creating new admin|
| /admin/login           | POST | login and get access token |
| /product               | POST | add products|
| /product               | GET | show all products |
| /product/:id           | GET | get products by id|
| /product/:id           | PUT | edit product content by id |
| /product/:id           | DELETE | delete products by id|


### Full Documentation

see full documentation here https://documenter.getpostman.com/view/10570933/SzS7RRwR?version=latest