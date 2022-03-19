const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usersModel = require(`../models/users`)

const registerUser = (req, res) => {
    // If a user with this email does not already exist, then create new user
    usersModel.findOne({email: req.params.email}, (uniqueError, uniqueData) => {
        if (uniqueData) {
            res.json({errorMessage: `User already exists`})
        } else {
            bcrypt.hash(req.params.password, parseInt(process.env.PASSWORD_HASH_SALT_ROUNDS), (error, hash) => {
                usersModel.create({name: req.params.name, email: req.params.email, password: hash}, (err, data) => {
                    if (data) {
                        const token = jwt.sign({
                            email: data.email,
                            accessLevel: data.accessLevel
                        }, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})

                        res.json({name: data.name, accessLevel: data.accessLevel, token: token})
                    } else {
                        res.json({errorMessage: `User was not registered`})
                    }
                })
            })
        }
    })


}

const userLogin = (req, res) => {
    usersModel.findOne({email: req.params.email}, (error, data) => {
        if (data) {
            bcrypt.compare(req.params.password, data.password, (err, result) => {
                if (result) {
                    const token = jwt.sign({
                        email: data.email,
                        accessLevel: data.accessLevel
                    }, process.env.JWT_PRIVATE_KEY, {algorithm: 'HS256', expiresIn: process.env.JWT_EXPIRY})


                    res.json({name: data.name, email: data.email, accessLevel: data.accessLevel, token: token})
                } else {
                    res.json({errorMessage: `User is not logged in`})
                }
            })
        } else {
            console.log("not found in db")
            res.json({errorMessage: `User is not logged in`})
        }
    })
}

const getUsers = (req, res) => {
    usersModel.find((error, data) => {
        res.json(data)
    })
}

const deleteUser = (req, res) => {
    usersModel.findByIdAndRemove(req.params.id, (error, data) => {
        res.json(data)
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