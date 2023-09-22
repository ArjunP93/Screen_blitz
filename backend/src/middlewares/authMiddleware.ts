import express from "express";
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../authService/JwtAuth";
import { JwtPayload } from "jsonwebtoken";

const authMiddleware = (role:string)=>{

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      

      let token: string | null = null;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }

      const response = verifyJWT(token as string) as JwtPayload;
      console.log("responsessssss", response);
      if (response && response.role === role) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized Access" });
        //   res.status(401).send("Unauthorized Access");
      }
      //   }
    } catch (error) {
      res.status(401).json({ message: "Unauthorised Access" });
    }
  }








}
  
 

export default authMiddleware;
