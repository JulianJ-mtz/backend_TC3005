import { jsonResponse } from "../lib/json-response.js";
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
        res.status(200).json(jsonResponse(200, { newTask }));
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const EditTask = async (req, res) => {
    try {
        const { title, content } = req.body;
        const { id } = req.params;

        const newTaskData = {
            title,
            content,
        }

        const newTask = await prisma.task.update({
            where: {
                id: String(id)
            },
            data: newTaskData
        });

        res.json(newTask);

        // res.status(200).json(jsonResponse(200, { newTask }));
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const ChangeStatus = async (req, res) => {
    try {
        const { id, status } = req.params;
        const changeStatus = await prisma.task.update({
            where: {
                id: String(id),
            },
            data: {
                status: String(status)
            },
            select: {
                status: true,
            }
        })
        res.status(200).json(jsonResponse(200, { changeStatus }));
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
        // res.status(200).json(jsonResponse(200, { changeStatus }));
    } catch (error) {
        res.status(500).json({ error: "Error al crear la tarea" });
    }
}


export const DeleteTask = async (req, res) => {
    try {
        const { id } = req.params;

        res.json(await prisma.task.delete(
            {
                where: {
                    id: String(id)
                }
            }
        ))
        console.log('sheeehs')
    } catch (error) {
        res.status(500).json({ error: "Error al borrar la tarea" });
    }
}

