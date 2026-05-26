import db from '../db/gasolinaCTG.db';

export const isPriceAlreadyApproved = async (gas_station_id: string, fuel_type_id: number, price: number) => {
    const results = await db.query(
        `
        SELECT 1
        FROM approved_prices
        WHERE gas_station_id = $1
        AND fuel_type_id = $2
        AND price = $3
        AND updated_at >= CURRENT_DATE
        AND updated_at < CURRENT_DATE + INTERVAL '1 day'
        LIMIT 1
        `,
        [gas_station_id, fuel_type_id, price],
    );
    return results.rows.length > 0;
};

export const insertApprovedPrice = async (gas_station_id: string, fuel_type_id: number, price: number) => {
    await db.query(
        `
        INSERT INTO approved_prices (
            gas_station_id,
            fuel_type_id,
            price,
            updated_at
        )
        VALUES (
            $1,
            $2,
            $3,
            NOW()
        );
        `,
        [gas_station_id, fuel_type_id, price],
    );
    return true;
};
