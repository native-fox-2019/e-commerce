'use strict'

require('dotenv').config()
const express = require('express')
const app = express()
const cors = require('cors')
const port = process.env.PORT

app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(cors())

app.listen(port, () => console.lg( 'listening on port', port))

// module.exports = app