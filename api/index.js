const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()

const authRoute = require('./routes/auth')

const app = express()

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => (console.log("DB connected"))).catch(err => (console.log(err)))

app.use(express.json())
app.use("/api/auth", authRoute)

app.listen(8080, () => {
    console.log("Server is up and running at http://localhost:8080");
})