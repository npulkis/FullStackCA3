const mongoose = require(`mongoose`)

let salesSchema = new mongoose.Schema(
    {
        paypalPaymentID: {type: String, required:true},
        products: [Object],
        total: {type: Number, required:true},
        customerName: {type: String,required:true},
        customerEmail: {type: String,required:true},
        returned:{type:Boolean,default:false}
    },
    {
        collection: `sales`
    })

module.exports = mongoose.model(`sales`, salesSchema)