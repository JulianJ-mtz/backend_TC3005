import express from "express";

import { GetLogs, PostLog } from "../controllers/log.js";

const router = express.Router();

router.post("/post/:userId", PostLog);
router.get("/get", GetLogs)

export default router;



