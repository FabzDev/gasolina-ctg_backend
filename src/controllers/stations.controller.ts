import { Request, Response } from 'express';
import db from '../db/gasolinaCTG.db';

export const getStations = async (req: Request, res: Response) => {
  try {
    const result = await db.query(`
      SELECT 
        id,
        name,
        brand,
        address,
        latitude,
        longitude,
        created_at
      FROM gas_stations
      ORDER BY created_at DESC
    `);

    res.json({
      success: true,
      data: result.rows
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stations'
    });
  }
};