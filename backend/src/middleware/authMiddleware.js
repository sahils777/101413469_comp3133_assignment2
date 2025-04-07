const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return null;
  }

  const token = authHeader.split(" ")[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    return decoded;
  } catch (err) {
    console.error("Invalid token:", err.message);
    return null;
  }
};

module.exports = authMiddleware;
