const express = require('express')
const mongoose = require('mongoose')
require('dotenv').config()
const multer = require('multer')

const authRoute = require('./routes/auth')
const userRoute = require('./routes/users')
const reviewRoute = require("./routes/reviews")
const categoryRoute = require("./routes/catergories")


const app = express()

mongoose.connect(process.env.MONGODB_URL, { useNewUrlParser: true, useUnifiedTopology: true }).then(() => (console.log("DB connected"))).catch(err => (console.log(err)))

const storage = multer({ destination: (req, file, cb) => { cb(null, "images") }, filename: (req, file, cb) => { cb(null, req.body.name) } })

const upload = multer({ storage: storage })
app.post("/api/upload", upload.single("file"), (req, res) => {
    res.status(200).json("Image has been uploaded")
})

app.use(express.json())
app.use("/api/auth", authRoute)
app.use("/api/users", userRoute)
app.use("/api/reviews", reviewRoute)
app.use("/api/categories", categoryRoute)

app.listen(8080, () => {
    console.log("Server is up and running at http://localhost:8080");
})