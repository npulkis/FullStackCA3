const jwt = require("jsonwebtoken");

const verifyJWT=  (req, res, next) =>
{
    jwt.verify(req.headers.authorization, process.env.JWT_PRIVATE_KEY, {algorithm: "HS256"}, (err, decodedToken) =>
    {
        if (err)
        {
            res.json({errorMessage:`User is not logged in`})
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
        return res.json({errorMessage:`User is not an administrator`})

    }
}
exports.verifyJWT = verifyJWT;
exports.checkUserisAdmin = checkThatUserIsAnAdministrator;
