const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../models/User")

const router = express.Router()

router.post("/register", async (req, res) => {
    try {

        const salt = bcrypt.genSaltSync(8)
        const hash = bcrypt.hashSync(req.body.password, salt)
        const newUser = await User({ username: req.body.username, email: req.body.email, password: hash, })

        const user = await newUser.save()
        res.status(200).json("Your account has been created")
    } catch (err) {
        res.status(500).json(err)
    }
})

router.post("/login", async (req, res) => {
    try {
        const user = await User.findOne({ username: req.body.username })

        if (!username) {
            return res.status(400).json("Wrong credentials")
        }

        const isValidPassword = bcrypt.compareSync(req.body.password, user.password)

        if (!isValidPassword) {
            return res.status(400).json("Wrong credentials")
        }

        const { password, ...otherDetails } = user._doc
        res.status(200).json(otherDetails)
    } catch (err) {

    }
})

module.exports = router