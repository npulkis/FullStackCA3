const mongoose = require(`mongoose`)

let categorySchema = new mongoose.Schema(
    {
        category: {type: String, required:true}
    },
    {
        collection: `categories`
    })

module.exports = mongoose.model(`categories`, categorySchema)