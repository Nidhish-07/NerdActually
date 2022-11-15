const express = require('express')
const bcrypt = require('bcrypt')
const User = require("../models/User")
const Review = require("../models/Review")
const mongoose = require('mongoose')


const router = express.Router()

router.post("/", async (req, res) => {
    const newReview = new Review(req.body)
    try {


        const savedReview = await newReview.save()

        res.status(200).json(savedReview)
    } catch (err) {
        console.log(err);
        res.status(500).json(err)
    }
})
router.put("/:id", async (req, res) => {
    try {
        const review = await Review.findByIdAndUpdate(req.params.id)

        if (req.body.author === review.author) {
            try {
                const updatedREview = await Post.findByIdAndUpdate(req.params.id, { $set: req.body }, { new: true })
                res.status(200).json("Review updated")
            } catch (err) {
                res.status(500).json(err)
            }
        } else {
            res.status(401).json("Not authenticated")
        }
    } catch (err) {
        res.status(500).json(err)
    }
})

router.delete("/:id", async (req, res) => {
    const review = await Review.findById(req.params.id)

    try {
        if (req.body.author === review.author) {
            try {
                await review.delete()
                res.status(200).json("Review deleted")
            } catch (err) {
                res.status(500).json(err)

            }
        } else {

            res.status(401).json("Not authenticated")
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.get("/:id", async (req, res) => {

    try {
        const review = await Review.findById(req.params.id)

        res.status(200).json(review)
    } catch (err) {

        res.status(500).json(err)
    }
})
router.get("/", async (req, res) => {
    const author = req.query.author;
    const category = req.query.cat
    try {
        let reviews
        if (author) {
            reviews = await Review.find({ author })
        } else if (category) {
            reviews = await Review.find({ categories: { $in: [category] } })
        } else {
            reviews = await Review.find()
        }

        res.status(200).json(reviews)
    } catch (err) {

        res.status(500).json(err)
    }
})

module.exports = router