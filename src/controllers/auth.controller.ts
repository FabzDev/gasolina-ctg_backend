import { Request, Response } from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import db from '../db/gasolinaCTG.db';

const JWT_SECRET = process.env.JWT_SECRET || 'secret';

export const register = async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;

        // VALIDACIÓN SIMPLE
        if (!username || !email || !password) {
            return res.status(400).json({
                success: false,
                message: 'Missing fields',
            });
        }

        // CHECK EMAIL
        const existingUser = await db.query('SELECT * FROM users WHERE email = $1', [email]);

        if (existingUser.rows.length > 0) {
            return res.status(400).json({
                success: false,
                message: 'Email already exists',
            });
        }

        // HASH PASSWORD
        const hashedPassword = await bcrypt.hash(password, 10);

        // INSERT USER
        const result = await db.query(
            `
      INSERT INTO users (
        role_id,
        username,
        email,
        password_hash
      )
      VALUES ($1, $2, $3, $4)
      RETURNING id, username, email
      `,
            [
                2, // USER ROLE
                username,
                email,
                hashedPassword,
            ],
        );

        return res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Register error',
        });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;

        // FIND USER
        const result = await db.query(
            `
      SELECT
        u.*,
        r.name AS role
      FROM users u
      JOIN roles r
        ON u.role_id = r.id
      WHERE email = $1
      `,
            [email],
        );

        const user = result.rows[0];

        if (!user) {
            return res.status(401).json({
                success: false,
                message: 'Invalid username',
            });
        }

        // COMPARE PASSWORD
        const validPassword = await bcrypt.compare(password, user.password_hash);

        if (!validPassword) {
            return res.status(401).json({
                success: false,
                message: 'Invalid password',
            });
        }

        // GENERATE JWT
        const token = jwt.sign(
            {id: user.id, role: user.role},
            JWT_SECRET,
            {expiresIn: '1d'}
        );

        return res.json({
            success: true,
            token,
        });
    } catch (error) {
        console.error(error);

        return res.status(500).json({
            success: false,
            message: 'Login error',
        });
    }
};
