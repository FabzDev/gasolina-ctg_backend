import { isPriceAlreadyApproved } from '../repositories/approvedPrices.repository';
import { approveStatusInPriceReport, findPriceReports, savePriceReport } from '../repositories/priceReports.repository';


export const checkAutoApproval = async (gas_station_id: string, fuel_type_id: number, price: number, userId:number) => {
    
    if (!isPriceAlreadyApproved(gas_station_id, fuel_type_id, price)) {

        approveStatusInPriceReport(gas_station_id, fuel_type_id, price);
    
    }

    const priceReportsFound= await findPriceReports(gas_station_id, fuel_type_id, price)
    
    if((priceReportsFound).length < 2){
        savePriceReport(gas_station_id, fuel_type_id, price, 'pending', userId)
    }else {
        savePriceReport(gas_station_id, fuel_type_id, price, 'approved', userId);
        approveStatusInPriceReport(gas_station_id, fuel_type_id, price);

    }
    
    
    // FIND MATCHING REPORTS
    // const reportsResult = await db.query(
    //     `
    // SELECT *
    // FROM price_reports
    // WHERE
    //   gas_station_id = $1
    //   AND fuel_type_id = $2
    //   AND price = $3;
    // `,
    //     [gas_station_id, fuel_type_id, price],
    // );

    // const reports = reportsResult.rows;

    // DISTINCT USERS
    // const uniqueUsers = new Set(reports.map((report) => report.user_id));

    // NEED 3 DIFFERENT USERS
    // if (uniqueUsers.size >= 3) {
    //     // APPROVE REPORTS
    //     await db.query(
    //         `
    //   UPDATE price_reports
    //   SET
    //     status = 'approved',
    //     approved_at = NOW()
    //   WHERE
    //     gas_station_id = $1
    //     AND fuel_type_id = $2
    //     AND price = $3
    //     AND status = 'pending'
    //   `,
    //         [gas_station_id, fuel_type_id, price],
    //     );

    //     // UPSERT APPROVED PRICE
    //     await db.query(
    //         `
    //   INSERT INTO approved_prices (
    //     gas_station_id,
    //     fuel_type_id,
    //     price,
    //     updated_at
    //   )
    //   VALUES ($1, $2, $3, NOW())

    //   ON CONFLICT (gas_station_id, fuel_type_id)

    //   DO UPDATE SET
    //     price = EXCLUDED.price,
    //     updated_at = NOW();
    //   `,
    //         [gas_station_id, fuel_type_id, price],
    //     );

    //     return {
    //         approved: true,
    //     };
    // }

    // return {
    //     approved: false,
    // };
};
