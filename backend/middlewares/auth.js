const jwt = require('jsonwebtoken');

module.exports = (req, res, next) => {
    console.log('hi')
    try {
        const token = req.headers.authorization.split(' ')[1];
        const decodedToken = jwt.verify(token, 'RANDOM_TOKEN_SECRET');
        console.log(decodedToken)
        const userId = decodedToken.userId;
        console.log('lol', userId)
        if (req.body.userId && req.body.userId !== userId){
            throw 'User ID non valide !';
        } else {
            req.userId = userId;
            next();
        }
    } catch ( error ) {
        res.status(401).json({ error: error | 'Requête non authentifiée !'});
    }
};