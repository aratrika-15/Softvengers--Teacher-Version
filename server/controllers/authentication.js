//importing jwt
const jwt = require("jsonwebtoken");
const accessTokenSecret=process.env.TOKEN || "ssad_game_secret_Softvengers";


//middleware function for token authentication
const authenticateJWT = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (authHeader) {
        const token = authHeader.split(' ')[1];
        //verification of token
        jwt.verify(token, accessTokenSecret, (err, user) => {
            if (err) {
                return res.sendStatus(403);//forbidden access
            }

            req.user = user;
            next();
        });
    } else {
        res.sendStatus(401);//unauthorized access
    }
};

module.exports= authenticateJWT;
