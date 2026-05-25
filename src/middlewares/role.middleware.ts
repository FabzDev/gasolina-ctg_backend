import { Response, NextFunction } from 'express';
import { AuthRequest } from  './auth.middleware';

export const authorizeRoles = (...allowedRoles: string[]) => {
    return(req: AuthRequest, res: Response, next: NextFunction)=>{

        const userRole = req.user?.role;

        if(!userRole){
            return res.status(401).json({
                success: false,
                message: 'No role found'
            });
        }

        if (!allowedRoles.includes(userRole)){
            return res.status(401).json({
                success: false,
                message: 'Forbidden: insufficient permissions'
            })
        }

        next();
    }
}