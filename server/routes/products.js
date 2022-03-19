const router = require(`express`).Router()
const productsMiddleware = require('../middleware/products')
const multer = require('multer')
const verifyUser = require("../middleware/verifyUser.js");
const upload = multer({dest: `${process.env.UPLOADED_FILES_FOLDER}`})

const {verifyJWT, checkUserisAdmin} = verifyUser
const {
    getProducts,
    filterCategory,
    getCategories,
    createProduct,
    createCategory,
    deleteProduct,
    deleteCategory,
    updateProduct,
    updateStock,
    findOneProduct,
    searchProducts,
    getPhoto
} = productsMiddleware

router.get(`/products`, getProducts)

router.get(`/filter/:category`, filterCategory)

router.get(`/categories`, getCategories)

router.post(`/products/`, upload.array("productPhotos", parseInt(process.env.MAX_NUMBER_OF_UPLOAD_FILES_ALLOWED)), verifyJWT, checkUserisAdmin, createProduct)

router.post(`/products/add_category/:category`,createCategory)

router.delete(`/products/:id`, verifyJWT, checkUserisAdmin, deleteProduct)

router.delete(`/category/:id`, verifyJWT, checkUserisAdmin, deleteCategory)

router.put(`/products/:id`, verifyJWT, checkUserisAdmin, updateProduct)

router.put(`/updateStock/:id/:stock`, updateStock)

router.get(`/product/:id`, findOneProduct)

router.get(`/search/:search`, searchProducts)

router.get(`/photo/:filename`, getPhoto)


module.exports = router