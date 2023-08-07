import { Request, Response, json } from "express";
import User from "../models/userSchema";
import Theater from "../models/theaterSchema";
import bcrypt from "bcrypt";
import { Document } from "mongoose";
import { generateJWT, verifyJWT } from "../authService/JwtAuth";

const adminCredentials = {
  username: "admin",
  password: "admin123",
};

const authController = {
  userLogin: async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      //find user in db
      const userFile = await User.findOne({ email });

      if (userFile) {
        bcrypt.compare(password, userFile.password, function (err, result) {
          if (result === true) {
            if (userFile.blockedstatus) {
              return res.json({
                userBlocked: true,
                message: "OOPS!! you are blocked by admin",
              });
            } else {
              //generate jwt and send to client
              const user_id = userFile._id.toString();
              const jwt = generateJWT(user_id);

              res.json({
                user: userFile,
                created: true,
                token: jwt,
                status: "success",
              });
            }
          } else {
            return res
              .status(401)
              .json({ login_status: false, message: "invalid credentials" });
          }
        });
      } else {
        return res.status(401).json({
          login_status: false,
          message: "invalid username or password",
        });
      }
    } catch (error) {
      res.json({ error, loginStatus: false, message: "login failed" });
    }
  },

  UserSignup: async (req: Request, res: Response) => {
    try {
      const {
        email,
        name,
        password,
        mobile,
      }: { email: string; name: string; password: string; mobile: number } =
        req.body;

      let hashedPassword: string = await bcrypt.hash(password, 10);
      // check for existing user
      const existingUser = await User.findOne({ email: email });

      if (existingUser) {
        return res.json({ userExist: true, message: "User already exists" });
      }

      // Creating a new user
      const newUserData = new User({
        email,
        name,
        password: hashedPassword,
        mobile,
      });
      const returnData = await newUserData.save();

      const newUserId = returnData._id;

      const jwt = generateJWT(newUserId.toString());

      res.json({
        user: newUserData,
        created: true,
        token: jwt,
        status: "success",
      });
    } catch (error) {
      res.json({ error, created: false });
    }
  },

  TheaterLogin: async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      //find user in db
      const theaterFile = await Theater.findOne({ email });

      if (theaterFile) {
        bcrypt.compare(password, theaterFile.password, function (err, result) {
          if (result === true) {
            if (theaterFile.blockedstatus) {
              return res.json({
                userBlocked: true,
                message: "OOPS!! you are blocked by admin",
              });
            } else {
              //generate jwt and send to client
              const theater_id = theaterFile._id.toString();
              const jwt = generateJWT(theater_id);

              res.json({
                user: theaterFile,
                created: true,
                token: jwt,
                status: "success",
              });
            }
          } else {
            return res
              .status(401)
              .json({ login_status: false, message: "invalid credentials" });
          }
        });
      } else {
        return res.status(401).json({
          login_status: false,
          message: "invalid username or password",
        });
      }
    } catch (error) {
      res.json({ error, loginStatus: false, message: "login failed" });
    }
  },

  TheaterSignUp: async (req: Request, res: Response) => {
    try {
      const {
        email,
        name,
        password,
        mobile,
      }: {
        email: string;
        name: string;
        password: string;
        mobile: number;
      } = req.body;

      let hashedPassword: string = await bcrypt.hash(password, 10);
      // check for existing theater
      const existingTheater = await Theater.findOne({ email: email });

      if (existingTheater) {
        return res.json({ userExist: true, message: "Theater already exists" });
      }

      // Creating a new theaterprofile
      const newTheaterData = new Theater({
        email,
        theatername: name,
        password: hashedPassword,
        mobile,
      });
      const returnTheaterData = await newTheaterData.save();

      const newTheaterId: string = returnTheaterData._id.toString();

      const jwt = generateJWT(newTheaterId);
      res.json({
        user: newTheaterData,
        created: true,
        token: jwt,
        status: "success",
      });
    } catch (error) {
      res.json({ error, created: false });
    }
  },

  adminLogin: (req: Request, res: Response) => {},
};
export default authController;
