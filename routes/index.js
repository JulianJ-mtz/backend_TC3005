import express from "express";
import userRoutes from "./user_routes.js"
import taskRoutes from "./task_routes.js"
import logRoutes from "./log_route.js"

const router = express.Router();


router.use("/user", userRoutes);
router.use("/task", taskRoutes);
router.use("/log", logRoutes)

router.all("*", (req, res) => {
    res.status(404).json({
        status: "Not Found",
        payload: null,
    });
});

export default router;
