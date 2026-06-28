const jwt = require("jsonwebtoken");

const protect = (req, res, next) => {
    try {
        let token;

        if (
            req.headers.authorization &&
            req.headers.authorization.startsWith("Bearer")
        ) {
            token = req.headers.authorization.split(" ")[1];
        }

        if (!token) {
            return res.status(401).json({ message: "No token, unauthorized" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        req.user = decoded; // user data store करतो

        next(); // पुढच्या route कडे जातो

    } catch (error) {
        res.status(401).json({ message: "Token invalid or expired" });
    }
};

module.exports = protect;