import express from "express";
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../authService/JwtAuth";
import { JwtPayload } from "jsonwebtoken";
import userHelper from "../helpers/userHelper";
import theaterHelper from "../helpers/theaterHelper";

const accessCheckMiddelware ={

  userBlockCheck:async (req: Request, res: Response, next: NextFunction) => {
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
      const id = response?.unique_id
      //check for blocked status

      const userStatus = await userHelper.blockedStatusUser(id)


      if (response && userStatus) {
        next();
      } else {
        res.json({ message: "access denied!! you are blocked by admin",status:'blocked' });
      }
      //   }
    } catch (error) {
      res.status(401).json({ message: "Unauthorised Access" });
    }
  },


  theaterBlockCheck:async (req: Request, res: Response, next: NextFunction) => {
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
      const id = response?.unique_id
      //check for blocked status

      const theaterStatus = await theaterHelper.blockedStatusTheater(id)


      if (response && theaterStatus) {
        next();
      } else {
        res.json({ message: "access denied!! you are blocked by admin",status:'blocked' });
      }
      //   }
    } catch (error) {
      res.status(401).json({ message: "Unauthorised Access " });
    }
  }








}
  
 

export default accessCheckMiddelware;
