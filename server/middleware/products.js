const productsModel = require("../models/products");
const categoriesModel = require("../models/categories");
const fs = require("fs");


const getProducts =async (req,res)=>{

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

}

const filterCategory =async (req,res)=>{


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

}

const getCategories =(req,res)=> {
    categoriesModel.find((error,data) =>
    {
        res.json(data)
    })
}

const createProduct = (req,res) => {


    let productDetails = new Object()

    productDetails.name = req.body.name
    productDetails.description = req.body.description
    productDetails.price = req.body.price
    productDetails.category = req.body.category
    productDetails.stock = req.body.stock

    productDetails.photos = []

    req.files.map((file, index) =>
    {
        productDetails.photos[index] = {filename:`${file.filename}`}
    })


    productsModel.findOne({name:req.body.name}, (uniqueError, uniqueData) =>
    {
        if(uniqueData)
        {
            res.json({errorMessage:`Product already exists`})
        }
        else
        {

            productsModel.create(productDetails, (err, data) =>
            {
                if(data)
                {
                    res.json(data)
                }
                else
                {
                    res.status(500).send(err)
                }
            })

        }
    })
}

const createCategory = (req,res) => {

    categoriesModel.findOne({category: req.params.category}, (uniqueError, uniqueData) => {
        if (uniqueData) {
            res.status(409).send(err)
        } else {
            categoriesModel.create({category: req.params.category}, (err, data) => {
                if (data) {
                    res.json({category: data.category})
                } else {
                    res.status(404).send(err)
                }
            })
        }
    })

}

const deleteProduct = (req, res) => {


    productsModel.findByIdAndRemove(req.params.id, (error, data) => {
        res.json(data)
    })

}

const deleteCategory = (req, res) => {

    categoriesModel.findByIdAndRemove(req.params.id, (error, data) => {
        res.json(data)
    })

}

const updateProduct = (req, res) => {

    productsModel.findByIdAndUpdate(req.params.id, {$set: req.body}, (error, data) => {
        res.json(data)
    })

}

const updateStock = (req, res) => {

    productsModel.findByIdAndUpdate(req.params.id, {stock: req.params.stock}, (error, data) => {
        res.json(data)
    })

}

const findOneProduct =async (req,res)=>{

    const ID = req.params.id;

    try {

        const  product = await productsModel.findOne({_id: ID});

        res.status(200).json({
            status: 'success',
            data:product
        });
    }catch (err){
        res.status(404).json({
            status: 'fail',
            message: err
        });
    }

}

const searchProducts = async (req,res)=>{

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

}

const getPhoto = (req,res,next) =>{
    fs.readFile(`${process.env.UPLOADED_FILES_FOLDER}/${req.params.filename}`, 'base64', (err, fileData) =>
    {
        if(err)
        {
            return next(err)
        }

        if(fileData)
        {
            return res.json({image:fileData})
        }
        else
        {
            return res.json({image:null})
        }
    })
}


exports.getProducts = getProducts;
exports.filterCategory = filterCategory;
exports.getCategories = getCategories;
exports.createProduct = createProduct;
exports.createCategory = createCategory;
exports.deleteProduct = deleteProduct;
exports.deleteCategory = deleteCategory;
exports.deleteProduct = deleteProduct;
exports.updateProduct = updateProduct;
exports.updateStock = updateStock;
exports.findOneProduct = findOneProduct;
exports.searchProducts = searchProducts;
exports.getPhoto = getPhoto;