const mongoose = require(`mongoose`)

let productPhotosSchema = new mongoose.Schema({
    filename:{type:String}
})

let productsSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        description: {type: String, required:true},
        category:{type: String,required:true},
        stock: {type: Number,required:true},
        price: {type: Number, required:true},
        count:{type: Number, default: 1},
        photos:[productPhotosSchema]
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)