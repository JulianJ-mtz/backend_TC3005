import { PrismaClient } from "@prisma/client";
import { jsonResponse } from "../lib/json-response.js";
import bcrypt from "bcrypt"
const prisma = new PrismaClient();

import { generateAccessToken, generateRefreshToken } from "./auth/generateTokens.js"
import { getTokenFromHeader } from "./auth/getTokenFromHeader.js";
import e from "express";
import { verifyRefreshToken } from "./auth/verifyTokens.js";

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

        // res.status(200).json(newUser)
        res.status(200).json(jsonResponse(200, { newUser }));
        console.log(newUser);
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
                        id: true,
                        title: true,
                        status: true,
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

export const User = (req, res) => {
    res.status(200).json(jsonResponse(200, req.user));
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

                res.status(200).json(jsonResponse(200, { thisUser: thisUser.username, accessToken, refreshToken: refreshToken.token }));
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

export const RefreshToken = async (req, res) => {
    const refreshToken = getTokenFromHeader(req.headers)

    if (refreshToken) {
        try {
            const found = await prisma.tokens.findUnique({
                where: {
                    token: refreshToken
                }
            })

            if (!found) {
                return res.status(401).send(jsonResponse(401, { error: "Unauthorized" }))
            }

            const payload = verifyRefreshToken(found.token);
            if (payload) {
                const accessToken = generateAccessToken(payload.user)

                return res.status(200).json(jsonResponse(200, { accessToken }))
            } else {
                return res.status(401).send(jsonResponse(401, { error: "Unauthorized" }))
            }

        } catch (error) {
            return res.status(401).send(jsonResponse(401, { error: "Unauthorized" }))
        }
    } else {
        res.status(401).send(jsonResponse(401, { error: "Unauthorized" }))
    }
}




