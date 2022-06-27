const { verify } = require('jsonwebtoken');

const validateToken = (req, res, next) => {
    const token = req.headers['accesstoken'];
    if (!token) {
        return res.json({ error: 'No token provided.'});
    }
    try {
        const decoded = verify(token, "sectretKey");
        if (decoded) {
            req.user = decoded;
            return next();
        }
    } catch (err) {
        return res.json({ error: "not verified" });
    }
};

module.exports = { validateToken };