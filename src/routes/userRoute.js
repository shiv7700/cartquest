import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
  getAllUsers,
  deleteUser,
} from "../controller/user/index.js";
import { adminAuth, authenticate } from "../middleware/authMiddleware.js";

const router = express.Router();

// register user
router.post("/register", registerUser);

// login user
router.post("/loginUser", loginUser);

// logout user
router.post("/logout", logoutUser);

// get all user
router.get("/userList", authenticate, adminAuth, getAllUsers);

// delete user
router.delete("/deleteUser/:id", authenticate, adminAuth, deleteUser);

export default router;
