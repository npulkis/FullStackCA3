const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require(`../models/users`)
const createError = require("http-errors");

const registerUser = (req, res,next) => {
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email: req.params.email}, (err, uniqueData) => {
        if (uniqueData) {
           // return next(createError(409,'Email is already registered'))
            res.status(409).send(err)
        } else {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (error, hash) => {
                usersModel.create({name: req.params.name, email: req.params.email, password: hash}, (err, data) => {
                    if (data) {
                        const token = jwt.sign({
                            email: data.email,
                            accessLevel: data.accessLevel
                        }, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})

                        res.json({name: data.name, accessLevel: data.accessLevel, token: token})
                    } if(err) {
                        return next(err)
                    }
                })
            })
        }
    })


}

const userLogin = (req, res) => {
    usersModel.findOne({email: req.params.email}, (error, data) => {
        if (!data){
            res.status(403).send(error)
        }
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: data.email,
                        accessLevel: data.accessLevel
                    }, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})


                    res.json({name: data.name, email: data.email, accessLevel: data.accessLevel, token: token})
                } if(!result){
                    res.status(403).send(err)
                }
            })
        }
    })
}

const getUsers = (req, res,next) => {
    usersModel.find((error, data) => {
        res.json(data)

        if (error){
            return next(error)
        }
    })
}

const deleteUser = (req, res,next) => {
    usersModel.findByIdAndRemove(req.params.id, (error, data) => {
        res.json(data)
        if (error){
            return next(error)
        }
    })
}

const logout = (req, res) => {
    res.json({})
}


exports.registerUser= registerUser;
exports.userLogin = userLogin;
exports.getUsers = getUsers
exports.deleteUser = deleteUser;
exports.logout = logout;