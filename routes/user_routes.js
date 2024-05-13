import express from "express";
import { PostUser, GetUser, AuthUser, RefreshToken, User } from "../controllers/user.js";
import { authenticate } from "../controllers/auth/authenticate.js";

const router = express.Router();

router.post("/post", PostUser);
router.post("/auth", AuthUser)
router.post("/refresh-token", RefreshToken)
router.get("/get", authenticate, User)
router.get("/getall", GetUser)

export default router;
