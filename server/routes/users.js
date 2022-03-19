const router = require(`express`).Router()

const verifyUser =  require("../middleware/verifyUser.js")
const userMiddleware = require("../middleware/users")

const {verifyJWT,checkUserisAdmin} = verifyUser
const {registerUser,userLogin,getUsers,deleteUser,logout} = userMiddleware





router.post(`/users/register/:name/:email/:password`, registerUser)

router.post(`/users/login/:email/:password`, userLogin)

router.get(`/users`, verifyJWT,checkUserisAdmin,getUsers)

router.delete(`/users/:id`,verifyJWT,checkUserisAdmin, deleteUser)

router.post(`/users/logout`, logout)


module.exports = router