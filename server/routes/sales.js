const router = require(`express`).Router()
const salesMiddleware = require('../middleware/sales.js')
const verifyUser = require("../middleware/verifyUser.js");

const {verifyJWT} = verifyUser
const {createSale,getUserSales,returnOrder,getSale} = salesMiddleware


router.post(`/sales/:paymentID/:total/:name/:email`,createSale)

router.get(`/sales/:email`,verifyJWT,getUserSales)

router.put(`/return/:id`,returnOrder)

router.get(`/sale/:id`,getSale)

module.exports = router