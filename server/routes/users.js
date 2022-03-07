const router = require(`express`).Router()

const usersModel = require(`../models/users`)
const bcrypt = require('bcrypt')


// IMPORTANT
// Obviously, in a production release, you should never have the code below, as it allows a user to delete a database collection
// The code below is for development testing purposes only
router.post(`/users/reset_user_collection`, (req, res) =>
{
    usersModel.deleteMany({}, (error, data) =>
    {
        if (data)
        {
            res.json(data)
        }
        else
        {
            res.json({errorMessage: `Failed to delete "user" collection for testing purposes`})
        }
    })
})


router.post(`/users/:name/:email/:password`, (req,res) =>
{
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email:req.params.email}, (uniqueError, uniqueData) =>
    {
        if(uniqueData)
        {
            res.json({errorMessage:`User already exists`})
        }
        else
        {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (error, hash) =>
            {
                usersModel.create({name:req.params.name,email:req.params.email,password:hash}, (err, data) =>
                {
                    if(data)
                    {
                        res.json({name: data.name})
                    }
                    else
                    {
                        res.json({errorMessage:`User was not registered`})
                    }
                })
            })
        }
    })
})

router.post(`/users/login/:email/:password`, (req,res) =>
{
    usersModel.findOne({email:req.params.email}, (error, data) =>
    {
        if(data)
        {
            bcrypt.compare(req.params.password, data.password, (err, result) =>
            {
                if(result)
                {
                    res.json({name: data.name})
                }
                else
                {
                    res.json({errorMessage:`User is not logged in`})
                }
            })
        }
        else
        {
            console.log("not found in db")
            res.json({errorMessage:`User is not logged in`})
        }
    })
})


router.post(`/users/logout`, (req,res) =>
{
    res.json({})
})


module.exports = router