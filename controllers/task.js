import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const PostTask = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { userId } = req.params;

        const newTaskData = {
            title,
            content,
            userId: String(userId)
        }

        const newTask = await prisma.task.create({
            data: newTaskData
        });

        console.log('sheeehs');
        res.json(newTask);
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const GetTasks = async (req, res) => {
    try {
        console.log('sheeehs')
        const { userId } = req.params;
        res.json(await prisma.task.findMany(
            {
                where: {
                    user: {
                        id: String(userId)
                    }
                },
                include: {
                    user: {
                        select: {
                            // id: true,
                            username: true,
                            email: true
                        }
                    }
                }
            }
        ));
    } catch (error) {
        res.status(500).json({ error: "Error al crear la tarea" });
    }
}
