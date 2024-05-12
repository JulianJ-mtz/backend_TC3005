import { PrismaClient } from "@prisma/client";
import { jsonResponse } from "../lib/json-response.js";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

import { generateAccessToken, generateRefreshToken } from "./auth/generateTokens.js"

export const PostUser = async (req, res) => {
    try {
        const { username, email, password } = req.body;

        if (!!!username || !!!email || !!!password) {
            return res.status(400).json(
                jsonResponse(400, {
                    error: "Fields are required"
                })
            )
        }

        const hashPassword = await bcrypt.hash(password, 10)

        const newUserData = {
            username,
            email,
            password: hashPassword
        }

        const newUser = await prisma.user.create({
            data: newUserData
        })

        res.status(200).json(newUser)

        console.log(newUser);
        console.log(hashPassword);

    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}


export const AuthUser = async (req, res) => {
    try {
        const { username, password } = req.body;

        if (!!!username || !!!password) {
            return res.status(400).json(
                jsonResponse(400, {
                    error: "Fields are required"
                })
            )
        }

        // const user = username;
        const thisUser = await prisma.user.findUnique({
            where: {
                username: username,
            },
        })

        if (thisUser) {
            const userPassword = thisUser.password
            const samePassword = await bcrypt.compare(password, userPassword)

            if (samePassword) {
                const accessToken = generateAccessToken(thisUser)
                const refreshToken = await prisma.tokens.create({
                    data: {
                        token: generateRefreshToken(thisUser)
                    }
                })

                res.status(200).json(jsonResponse(200, { thisUser: thisUser.username, accessToken, refreshToken }));
            } else {
                res.status(400).json(jsonResponse(400, { error: "User or password is incorrect" }))
            }
        } else {
            res.status(400).json(jsonResponse(400, { error: "User not found" }))
        }

    } catch (error) {
        console.error('Error! Entry not found:', error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



export const GetUser = async (req, res) => {
    try {
        res.json(await prisma.user.findMany({
            include: {
                task: {
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
