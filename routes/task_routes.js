import express from "express";
import { GetTasks, PostTask } from "../controllers/task.js";

const router = express.Router();

router.post('/post/:userId', PostTask);
router.get("/get/:userId", GetTasks)

export default router;
