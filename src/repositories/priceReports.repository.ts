import db from '../db/gasolinaCTG.db';

export const getAllPriceReports = async () => {
    const results = await db.query(`
        SELECT * 
        FROM price_reports
        `);
    return results.rows;
};

export const findPriceReports = async (gas_station_id: string, fuel_type_id: number, price: number) => {
    const results = await db.query(`
        SELECT * 
        FROM price_reports
        WHERE gas_station_id = $1
        AND fuel_type_id = $2
        AND price = $3
        AND updated_at >= CURRENT_DATE
        AND updated_at < CURRENT_DATE + INTERVAL '1 day'
        LIMIT 1;
        `);
    return results.rows;
};

export const savePriceReport = async (
    gas_station_id: string,
    fuel_type_id: number,
    price: number,
    status: string,
    user_id: number,
) => {
    try {
        await db.query(
            `
        INSERT INTO price_reports (
        gas_station_id,
        fuel_type_id,
        price,
        status,
        user_id
        )
        VALUES ($1, $2, $3, $4, $5);  
        `,
            [gas_station_id, fuel_type_id, price, status, user_id],
        );
    } catch (error) {
        console.log(error);
    }
};

export const approveStatusInPriceReport = async (gas_station_id: string, fuel_type_id: number, price: number) => {
    try {
        await db.query(
            `
        UPDATE price_reports
        SET status = 'approved'
        WHERE gas_station_id = $1
        AND fuel_type_id = $2
        AND price = $3
        AND status = 'pending'
        AND updated_at >= CURRENT_DATE
        AND updated_at < CURRENT_DATE + INTERVAL '1 day'
        LIMIT 1;
        `,
            [gas_station_id, fuel_type_id, price],
        );
        return true;
    } catch (error) {
        console.log(error);
    }
};
