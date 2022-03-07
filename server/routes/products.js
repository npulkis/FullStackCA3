const router = require(`express`).Router()
const productsModel =require('../models/products')

const multer  = require('multer')
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})
const fs = require('fs')


router.get(`/products`, (req,res)=>
{
    productsModel.find((error,data) =>
    {
        res.json(data)
    })
})


router.post(`/products/add/:name/:description/:stock`,upload.single("productPhoto"), (req,res) =>
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

                productsModel.create({name:req.params.name,description:req.params.description,stock:req.params.stock,productPhotoFilename:req.file.filename}, (err, data) =>
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

module.exports = router