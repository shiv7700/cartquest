import express from "express";
import {
  loginUser,
  registerUser,
  logoutUser,
} from "../controller/user/index.js";

const router = express.Router();

// register user
router.post("/register", registerUser);

// login user
router.post("/loginUser", loginUser);

// logout user
router.post("/logout", logoutUser);

export default router;
