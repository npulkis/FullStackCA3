const router = require(`express`).Router()
const productsModel =require('../models/products')
const categoriesModel = require('../models/categories')

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const fs = require('fs')
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");



//
// router.get(`/products`, (req,res)=>
// {
//     productsModel.find((error,data) =>
//     {
//         res.json(data)
//     })
// })

router.get(`/products`,async (req,res)=>{

   try {
       const products = await productsModel.find();
       res.status(200).json({
           status: 'success',
           data:products
       });
   }catch (err){
       res.status(404).json({
           status: 'fail',
           message: err
       });
   }

})

router.get(`/filter/:category`,async (req,res)=>{


    const filter = req.params.category;

    try {
        const products = await productsModel.find({category: filter});
        res.status(200).json({
            status: 'success',
            data:products
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})



router.get(`/products/desc`,async (req,res)=>{

    try {
        const products = await productsModel.find().sort({price: -1});
        res.status(200).json({
            status: 'success',
            data:products
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})

router.get(`/products/asc`,async (req,res)=>{

    try {
        const products = await productsModel.find().sort({price: 1});
        res.status(200).json({
            status: 'success',
            data:products
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})

router.get(`/categories`,(req,res)=>
{
    categoriesModel.find((error,data) =>
    {
        res.json(data)
    })
})


router.post(`/products/add/:name/:description/:category/:stock/:price`,upload.single("productPhoto"), (req,res) =>
{
    // jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    // {


        // if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN){



    if(!req.file)
    {
        res.json({errorMessage:`No file was selected to be uploaded`})
    }
    else if(req.file.mimetype !== "image/png" && req.file.mimetype !== "image/jpg" && req.file.mimetype !== "image/jpeg")
    {
        fs.unlink(`${process.env.UPLOADED_FILES_FOLDER}/${req.file.filename}`, (error) => {res.json({errorMessage:`Only .png, .jpg and .jpeg format accepted`})})
    }else{


    productsModel.findOne({name:req.params.name}, (uniqueError, uniqueData) =>
    {
        if(uniqueData)
        {
            res.json({errorMessage:`Product already exists`})
        }
        else
        {

                productsModel.create({name:req.params.name,description:req.params.description,category:req.params.category,stock:req.params.stock,price:req.params.price,productPhotoFilename:req.file.filename}, (err, data) =>
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
    //     }else {
    //         res.json({errorMessage:`User not admin`})
    //     }
    // })
})

router.post(`/products/add_category/:category`,(req,res) => {
    // jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {


        // if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {

            categoriesModel.findOne({category: req.params.category}, (uniqueError, uniqueData) => {
                if (uniqueData) {
                    res.json({errorMessage: `Category already exists`})
                } else {
                    categoriesModel.create({category: req.params.category}, (err, data) => {
                        if (data) {
                            res.json({category: data.category})
                        } else {
                            res.json({errorMessage: `Category not added`})
                        }
                    })
                }
            })

        // }if (err){
        //     res.json(err)
        // }else {
        //     res.json({errorMessage:`User not admin`})
        // }
    // })
})

router.delete(`/products/:id`, (req, res) => {
    // jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {

        // if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {
            res.json(decodedToken.accessLevel)

            productsModel.findByIdAndRemove(req.params.id, (error, data) => {
                res.json(data)
            })
    //     }else {
    //         res.json({errorMessage:`User not admin`})
    //     }
    // })
})

router.delete(`/category/:id`, (req, res) =>
{
    // jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {
    //     if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {

            categoriesModel.findByIdAndRemove(req.params.id, (error, data) => {
                res.json(data)
            })
    //     }else {
    //         res.json({errorMessage: `User not admin`})
    //     }
    // })
})


// Update one record
router.put(`/products/:id`, (req, res) => {
    // jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) => {

        // if(decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN) {


            productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
                res.json(data)
            })
    //     }else {
    //         res.json({errorMessage:`User not admin`})
    //
    //     }
    // })
})

// Read one record
router.get(`/products/:id`, (req, res) =>
{
    productsModel.findById(req.params.id, (error, data) =>
    {
        res.json(data)
    })
})

//
// //Search records
// router.get(`/search/:search`,  (req, res) =>{
//
//
//
//
//             let search = new RegExp(req.params.search, 'i')
//     productsModel.find((error,data) =>
//     {
//         res.json(data)
//     })
//
// })

// router.get(`/search/:search`, (req,res)=>
// {
//
//
//     productsModel.find({name: /test/i},(error,data) =>
//     {
//         res.json(data)
//     })
// })

router.get(`/search/:search`,async (req,res)=>{

    const searchQuery = req.params.search;



    try {
        const name = new RegExp(searchQuery,`i`);

       const  products = await productsModel.find({$or:[ {name: name},{description: name}]});

        res.status(200).json({
            status: 'success',
            data:products
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

})



module.exports = router