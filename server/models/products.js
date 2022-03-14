const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        description: {type: String, required:true},
        category:{type: String,required:true},
        stock: {type: Number,required:true},
        price: {type: Number, required:true},
        productPhotoFilename: {type:String, default:""},
        count:{type: Number, default: 1}
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)