import { Request, Response } from 'express';
import { AuthRequest } from '../middlewares/auth.middleware';
import { checkAutoApproval } from '../services/priceApproval.service';
import { getAllPriceReports } from '../repositories/priceReports.repository';

export const getReports = async (req: Request, res: Response) => {
    try {
        const results = getAllPriceReports();

        res.json({
            success: true,
            data: results,
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({
            success: false,
            message: 'Error fetching reports',
        });
    }
};

export const createReport = async (req: AuthRequest, res: Response) => {
    try {
        const user_id = req.user.id;

        const { gas_station_id, fuel_type_id, price } = req.body;

        // VALIDACIÓN SUPER BÁSICA
        if (!gas_station_id || !fuel_type_id || !user_id || !price) {
            return res.status(400).json({
                success: false,
                message: 'Missing required fields',
            });
        }

        checkAutoApproval(gas_station_id, fuel_type_id, price, user_id);
        
        res.status(201).json({
            success: true,
            data: 'Report successfully created',
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Error creating price report',
        });
    }
};

//     const result = await db.query(
//         `
//             INSERT INTO price_reports (
//                 gas_station_id,
//                 fuel_type_id,
//                 user_id,
//                 price
//             )
//             VALUES ($1, $2, $3, $4)
//             RETURNING *
//   `,
//         [gas_station_id, fuel_type_id, user_id, price],
//     );

// AUTO APPROVAL CHECK
// await checkAutoApproval(
//     gas_station_id,
//     fuel_type_id,
//     price
// );

//         res.status(201).json({
//             success: true,
//             data: 'Report successfully created',
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: 'Error creating price report',
//         });
//     }
// };
