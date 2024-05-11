import { PrismaClient } from "@prisma/client";
import { jsonResponse } from "../lib/json-response.js";

const prisma = new PrismaClient();



export const PostUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!username || !email || !password) {
            return res.status(400).json(
                jsonResponse(400, {
                    error: "Fields are required"
                })
            )
        }

        const newUserData = {
            username,
            email,
            password
        }

        const newUser = await prisma.user.create({
            data: newUserData
        })

        res.json(newUser);
        console.log('sheeehs');

    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const GetUser = async (req, res) => {
    try {
        res.json(await prisma.user.findMany({
            include: {
                tasks: {
                    select: {
                        // id: true,
                        title: true,
                        logs: {
                            select: {
                                // id: true,
                                message: true,
                            }
                        }
                    }
                }
            }
        }));
        console.log('sheeehs')
    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
} 
