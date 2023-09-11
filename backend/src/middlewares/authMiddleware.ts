import express from "express";
import { NextFunction, Request, Response } from "express";
import { verifyJWT } from "../authService/JwtAuth";

const authMiddleware = {
  tokenCheck: async (req: Request, res: Response, next: NextFunction) => {
    try {
      // console.log('request headers',req.headers);

      let token: string | null = null;
      if (
        req.headers.authorization &&
        req.headers.authorization.startsWith("Bearer ")
      ) {
        token = req.headers.authorization.split(" ")[1];
      }
      console.log("tokennnn", token);

      const response = verifyJWT(token as string);
      console.log("responsessssss", response);
      if (response) {
        next();
      } else {
        res.status(401).json({ message: "Unauthorized Access" });
        //   res.status(401).send("Unauthorized Access");
      }
      //   }
    } catch (error) {
      res.status(401).json({ message: "Unauthorised Access" });
    }
  },
};

export default authMiddleware;
