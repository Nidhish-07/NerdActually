const express=require('express')
const Category=require('../models/Category')


const router=express.Router()

router.post("/",async(req,res)=>{
    const categories=await Ca(req.body)

    try {
        const savedCategories=await categories.save()

        res.status(200).json(savedCategories)
    } catch (error) {
        res.status(500).json(error)
    }
})


router.get("/",async(req,res)=>{


    try {
        const categories=await Category.find()
        res.status(200).json(categories)
    } catch (error) {
        res.status(200).json(err)
    }
})


module.exports=router