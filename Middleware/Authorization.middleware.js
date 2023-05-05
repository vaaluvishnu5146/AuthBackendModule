// https://jwt.io/ - VALIDATE JWT TOKEN
const { verifyToken } = require("../Utils/AuthUtils");

async function checkJWTValidaty(req, res, next) {
  const token = req.header("Authorization");
  if (token) {
    const data = await verifyToken(token);
    if (data.success) {
      next();
    } else {
      res.status(401).json({
        message: "You are logged out, so login again",
      });
    }
  } else {
    res.status(401).json({
      message: "Kindly login to access resource",
    });
  }
}

async function blockIfUser(req, res, next) {
  const token = req.header("Authorization");
  if (token) {
    const data = await verifyToken(token);
    if (data.success && data.role !== "user") {
      next();
    } else {
      res.status(401).json({
        message: "You are not authorised to access this resource",
      });
    }
  } else {
    res.status(401).json({
      message: "Kindly login to access resource",
    });
  }
}

module.exports = {
  checkJWTValidaty,
  blockIfUser,
};
