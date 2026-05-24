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
    const result = await db.query(`
      INSERT INTO gas_stations (
        name,
        address,
        neighborhood,
        city,
        latitude,
        longitude,
        brand,
        created_at
      )
      VALUES (
        'Estación Terpel La Cordialidad - Sector Terminal',
        'Vía La Cordialidad cerca al acceso de la Terminal de Transportes de Cartagena',
        'Pozón - Doña Manuela',
        'Cartagena',
        10.4169,
        -75.5208,
        'Terpel',
        NOW()
      );
    `);

    res.json({
      success: true,
      data: result.rows,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      success: false,
      message: 'Error fetching stations',
    });
  }
};
