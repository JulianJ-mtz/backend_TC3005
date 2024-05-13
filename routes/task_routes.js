import express from "express";
import { GetTasks, PostTask, ChangeStatus, DeleteTask, EditTask } from "../controllers/task.js";

const router = express.Router();

router.delete("/del/:id", DeleteTask)
router.post('/post/:userId', PostTask);
router.get("/get/:userId", GetTasks)
router.put("/put/:id/:status", ChangeStatus)
router.put('/put/:id', EditTask );


export default router;
