import express from "express";
import { PostUser, GetUser } from "../controllers/user.js";

const router = express.Router();

router.post("/post", PostUser);
router.get("/get", GetUser)

export default router;
