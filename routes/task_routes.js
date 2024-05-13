import express from "express";
import { GetTasks, PostTask, ChangeStatus } from "../controllers/task.js";
import { authenticate } from "../controllers/auth/authenticate.js";


const router = express.Router();

router.post('/post/:userId', PostTask);
router.get("/get/:userId", GetTasks)
router.put("/put/:id/:status", ChangeStatus)


export default router;
