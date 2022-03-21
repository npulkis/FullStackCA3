const jwt = require("jsonwebtoken");
const createError = require("http-errors");

const fs=require('fs')
const JWT_PRIVATE_KEY = fs.readFileSync(process.env.JWT_PRIVATE_KEY_FILENAME, 'utf8')


const verifyJWT=  (req, res, next) =>
{
    jwt.verify(req.headers.authorization, JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            return next(createError(401))
        }
        else
        {
            req.decodedToken = decodedToken
            next()
        }
    })
}


const checkThatUserIsAnAdministrator = (req, res, next) =>
{

    if(req.decodedToken.accessLevel >= process.env.ACCESS_LEVEL_ADMIN)
    {
        return next()

    }
    else
    {
        return next(createError(401))

    }
}
exports.verifyJWT = verifyJWT;
exports.checkUserisAdmin = checkThatUserIsAnAdministrator;
