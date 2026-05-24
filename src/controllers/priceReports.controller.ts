import { Request, Response } from 'express';
import db from '../db/gasolinaCTG.db';

export const getReports = async (req: Request, res: Response) => {
    try {
        const result = await db.query(`
        SELECT 
          pr.id,
          gs.name AS station,
          pr.price,
          ft.name AS fuel_type,
          pr.status,
          pr.reported_at,
          users.username AS user
        FROM price_reports pr
        JOIN gas_stations gs ON pr.gas_station_id=gs.id
        JOIN fuel_types ft ON pr.fuel_type_id=ft.id
        JOIN users ON pr.user_id=users.id
        ORDER BY pr.reported_at DESC
      `);

        res.json({
            success: true,
            data: result.rows,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reports',
        });
    }
};


export const createReport = async (req: Request, res: Response) => {
    try {
        const { 
          gas_station_id,
          fuel_type_id,
          user_id,
          price
        } = req.body;

        // VALIDACIÓN SUPER BÁSICA
        if (!gas_station_id || !fuel_type_id || !user_id || !price) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        const result = await db.query(
            `
      INSERT INTO price_reports (
        gas_station_id,
        fuel_type_id,
        user_id,
        price
      )
      VALUES ($1,$2,$3,$4)
      RETURNING *
    `,
            [gas_station_id, fuel_type_id, user_id, price],
        );

        res.status(201).json({
            success: true,
            data: result.rows[0],
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating price report',
        });
    }
};
