import { Request, Response } from 'express';
import { createJwtToken } from '../utils/auth';
import { User } from '../db/models/User';
import asyncHandler from '../utils/asyncHandler';

export default {
    login: asyncHandler(async (req: Request, res: Response) => {
        const { username, password } = req.body

        const user = await User.findOne({
            raw: true,
            where: {
                username,
                password
            }
        })
        if (!user) {
            return res.status(401).json({ error: 'Invalid username/password combination' });
        }

        const jwt = createJwtToken({
            id: user.id,
            username: user.username,
            userTypeId: user.userTypeId,
            email: user.email,
        })
        return res.status(200).json({ jwt });
    }),
    approve: asyncHandler(async (req: Request, res: Response) => {
        return res.status(200).json({ test: 123 });
    }),
    list: asyncHandler(async (req: Request, res: Response) => {
        return res.status(200).json({ test: 123 });
    }),
    get: asyncHandler(async (req: Request, res: Response) => {
        return res.status(200).json({ test: 123 });
    }),
};
