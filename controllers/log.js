import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PostLog = async (req, res) => {
    try {
        const { message } = req.body;
        const { userId } = req.params;
        const { taskId } = req.query
        const newLogData = {
            message,
            taskId: String(taskId),
            userId: String(userId)
        }
        const newLog = await prisma.logs.create({
            data: newLogData
        });
        console.log('sheeehs');
        res.json(newLog);
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const GetLogs = async (req, res) => {
    try {
        console.log('SHEEEEHS')
        res.json(await prisma.logs.findMany());
    } catch (error) {
        res.status(500).json({ error: "Error al crear la tarea" });
    }
}