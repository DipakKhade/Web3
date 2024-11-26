import { Request , Response , NextFunction } from "express"
import jwt, { JwtPayload } from 'jsonwebtoken';
export const authMiddleware = async(req:Request,res:Response,next:NextFunction)=>{

    const token = req.headers.token as string
    if(!token){
        res.json({
            message:"inavalid authorization headers"
        });
        return;
    }

    const verifyToken = jwt.verify(token,process.env.JWT_SEC!) as JwtPayload
    if(!verifyToken){
        res.json({
            message:"invalid auth token"
        });
        return;
    }

    req.userId= verifyToken.id

    next();
}


declare global {
    namespace Express {
        export interface Request {
          userId: number
        }
      }
}