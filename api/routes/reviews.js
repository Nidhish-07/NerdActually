const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Review = require("../models/Review")
const mongoose = require('mongoose')


const router = express.Router()

router.post("/:id", async (req, res) => {
    const newReview = new Post(req.body)
    try {


        const savedReview = await newReview.save()

        res.status(200).json(savedReview)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
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