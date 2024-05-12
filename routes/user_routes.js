import express from "express";
import { PostUser, GetUser, AuthUser } from "../controllers/user.js";

const router = express.Router();

router.post("/post", PostUser);
router.post("/auth", AuthUser)
router.get("/get", GetUser)

export default router;
