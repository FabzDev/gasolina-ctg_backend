import { Request, Response } from "express";
import { AuthRequest } from "../middlewares/auth.middleware";
import { getAllReports } from "../repositories/reports.repository";

export const getReports = async (req: Request, res: Response) => {
    //TODO LOGIC
    try {
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error message",
        });
    }
};

export const createReport = async (req: AuthRequest, res: Response) => {
    //TODO LOGIC
    try {
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: "error message",
        });
    }
};
