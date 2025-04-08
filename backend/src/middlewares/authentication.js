import jwt from "jsonwebtoken";

export const authentication = (req, res, next) => {
  try {
    const token = req.cookies?.token;
    // console.log(token);
    if (!token) {
      return res.status(404).json({
        message: "Token not found",
      });
    }
    // verify user token using Jsonwebtoken
    const decoded = jwt.verify(token, process.env.JWT_KEY);

    if (!decoded) {
      return res.status(401).json({ message: "Invalid token" });
    }
    // send decoded id vai request to next function
    req.userId = decoded.userId;

    // console.log("Authenticated userId:", decoded.userId);

    next();
  } catch (error) {
    console.log(`Error in authentication: ${error.message}`);
    res.status(500).json({
      message: "Server error",
      error: error.message,
    });
  }
};
