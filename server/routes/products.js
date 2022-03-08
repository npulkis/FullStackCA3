const router = require(`express`).Router()
const productsModel =require('../models/products')
const categoriesModel = require('../models/categories')

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const fs = require('fs')
const bcrypt = require("bcrypt");




router.get(`/products`, (req,res)=>
{
    productsModel.find((error,data) =>
    {
        res.json(data)
    })
})

router.get(`/categories`,(req,res)=>
{
    categoriesModel.find((error,data) =>
    {
        res.json(data)
    })
})


router.post(`/products/add/:name/:description/:category/:stock`,upload.single("productPhoto"), (req,res) =>
{
    if(!req.file)
    {
        res.json({errorMessage:`No file was selected to be uploaded`})
    }
    else if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {res.json({errorMessage:`Only .png, .jpg and .jpeg format accepted`})})
    }else{

    // If a user with this email does not already exist, then create new user
    productsModel.findOne({name:req.params.name}, (uniqueError, uniqueData) =>
    {
        if(uniqueData)
        {
            res.json({errorMessage:`Product already exists`})
        }
        else
        {

                productsModel.create({name:req.params.name,description:req.params.description,category:req.params.category,stock:req.params.stock,productPhotoFilename:req.file.filename}, (err, data) =>
                {
                    if(data)
                    {

                        fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, 'base64', (err, fileData) =>{
                            res.json({name: data.name,productPhoto:fileData})
                        })


                    }
                    else
                    {
                        res.json({errorMessage:`User was not registered`})
                    }
                })

        }
    })}
})

router.post(`/products/add_category/:category`,(req,res) => {
    categoriesModel.findOne({category:req.params.category},(uniqueError,uniqueData) =>{
        if (uniqueData)
        {
            res.json({errorMessage:`Category already exists`})
        }
        else
        {
            categoriesModel.create({category:req.params.category},(err ,data) =>{
                if (data)
                {
                    res.json({category: data.category})
                }
                else {
                    res.json({errorMessage:`Category not added`})
                }
            })
        }
    })
})

router.delete(`/products/:id`, (req, res) =>
{
    productsModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

router.delete(`/category/:id`, (req, res) =>
{
    categoriesModel.findByIdAndRemove(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})


// Update one record
router.put(`/products/:id`, (req, res) =>
{
    productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) =>
    {
        res.json(data)
    })
})

// Read one record
router.get(`/products/:id`, (req, res) =>
{
    productsModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})



module.exports = router