const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Review = require("../models/Review")
const mongoose = require('mongoose')


const router = express.Router()

router.put("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        if (req.body.password) {
            const salt = bcrypt.genSaltSync(8)
            req.body.password = bcrypt.hashSync(req.body.password, salt)
        }
        try {


            const updatedUser = await User.findOneAndUpdate({ id: req.params.id }, {
                $set: req.body
            }, { new: true })

            res.status(200).json({ message: "User updated", updatedUser })
        } catch (err) {
            console.log(err);
            res.status(500).json(err)
        }
    } else {
        res.status(401).json("Not authenticated")

    }
})
router.delete("/:id", async (req, res) => {
    if (req.body.userId === req.params.id) {
        try {
            const user = await User.findById(req.params.id)
            if (!user) {
                res.status(404).send("User not found")
            }

            try {
                await Review.deleteMany({ username: user.username })
                await User.findByIdAndDelete(req.params.id)
                res.status(200).json({ message: "User deleted" })
            } catch (err) {
                console.log(err);
                res.status(500).json(err)
            }
        } catch (error) {



        }
    } else {
        res.status(401).json("Not authenticated")

    }
})

router.get("/:id", async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        const { password, otherDetails } = user._doc
        res.status(200).json(otherDetails)
    } catch (error) {
        res.status(500).json(error)
    }
})

module.exports = router