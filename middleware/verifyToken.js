const jwt = require("jsonwebtoken");
const verifyToken = ({ ctx }, next) => {
  const authHeader = ctx.req.header("Authorization");
  if (!authHeader)
    throw new Error(
      JSON.stringify({
        Authorization: "Chưa có token",
      })
    );
  try {
    const decoded = jwt.verify(authHeader, process.env.ACCESS_TOKEN_SECRET);
    ctx.req.userID = decoded.userID;
    return next();
  } catch (error) {
    throw new Error(
      JSON.stringify({
        Authorization: "Token không hợp lệ",
      })
    );
  }
};
module.exports = verifyToken;
