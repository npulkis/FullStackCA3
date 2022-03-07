const mongoose = require(`mongoose`)

let productsSchema = new mongoose.Schema(
    {
        name: {type: String, required:true},
        description: {type: String, required:true},
        stock: {type: Number,required:true},
        productPhotoFilename: {type:String, default:""}
    },
    {
        collection: `products`
    })

module.exports = mongoose.model(`products`, productsSchema)