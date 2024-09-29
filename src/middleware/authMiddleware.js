import jwt from "jsonwebtoken";

const authenticate = (req, res, next) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res
      .status(401)
      .json({ message: "No token provided, authentication failed" });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded; // Attach the decoded payload to req.user
    console.log(req.user, "user"); // Log the attached user object
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ message: "Invalid or expired token, authentication failed" });
  }
};

// Middleware for admin access only
const adminAuth = (req, res, next) => {
  console.log(req.user, "=======user");
  if (req.user.role !== "admin") {
    return res.status(403).json({ message: "Admin access only" });
  }
  next();
};

// Middleware for user access
const userAuth = (req, res, next) => {
  if (req.user.role !== "user" && req.user.role !== "admin") {
    return res.status(403).json({ message: "User access only" });
  }
  next();
};

export { authenticate, adminAuth, userAuth };
