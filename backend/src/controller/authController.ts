import { Request, Response, json } from "express";
import User from "../models/userSchema";
import Theater from "../models/theaterSchema";
import Admin from "../models/adminSchema";
import bcrypt from "bcrypt";

import { generateJWT, verifyJWT } from "../authService/JwtAuth";
import Wallet from "../models/userWalletSchema";

const adminCredentials = {
  username: "admin",
  password: "admin123",
};

const authController = {
  findUser: async (req:Request,res:Response)=>{
    try {
      const userinfo = req.params.id
      const mobile = parseInt(userinfo)
      const userData = await User.findOne({mobile:mobile})
      if (userData) {
        
        res.json({status:true,user:userData})
      }else{
        res.json({status:false,message:'user not found'})

      }
    } catch (error) {
console.log('error at auth controller finduser',error)
res.json({status:false,message:'invalid user'})


    }

  },
  userOtpLogin: async (req: Request, res: Response) => {
    try {
      const userId = req.body.id;
      //find user in db
      const userFile = await User.findOne({ _id:userId });

      if (userFile) {
        if (userFile.blockedStatus) {
                return res.json({
                  userBlocked: true,
                  message: "OOPS!! you are blocked by admin",
                });
              } else {
                //generate jwt and send to client
                const user_id = userFile._id.toString();
                const jwt = generateJWT(user_id,"user");

                res.json({
                  user: userFile,
                  created: true,
                  token: jwt,
                  status: "success",
                });
              }
      }
    } catch (error) {
      res.json({ error, loginStatus: false, message: "login failed" });
    }
  },
  userLogin: async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      //find user in db
      const userFile = await User.findOne({ email });

      if (userFile) {
        if (userFile.password) {
          bcrypt.compare(password, userFile.password, function (err, result) {
            if (result === true) {
              if (userFile.blockedStatus) {
                return res.json({
                  userBlocked: true,
                  message: "OOPS!! you are blocked by admin",
                });
              } else {
                //generate jwt and send to client
                const user_id = userFile._id.toString();
                const jwt = generateJWT(user_id,"user");

                res.json({
                  user: userFile,
                  created: true,
                  token: jwt,
                  status: "success",
                });
              }
            } else {
              return (
                res
                  // .status(401)
                  .json({ login_status: false, message: "invalid credentials" })
              );
            }
          });
          } else {
          return res.json({
            login_status: false,
            message: "invalid username or password",
          });
        }
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
    
      }: { email: string; name: string; password: string;} =
        req.body;
        const mobile=parseInt(req.body.mobile)

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
        mobile:mobile
      });
     
      const returnData = await newUserData.save();

      const newUserId = returnData._id;
      
      const jwt = generateJWT(newUserId.toString(),"user");
      // create empty wallet for new user
      const newUserWallet = new Wallet({
        userId:newUserId,
        balance:0,
        transactions:[] 
       })
       await newUserWallet.save()

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
              const jwt = generateJWT(theater_id,"theater");

              res.json({
                theater: theaterFile,
                created: true,
                token: jwt,
                status: "success",
              });
            }
          } else {
            return (
              res
                // .status(401)
                .json({ login_status: false, message: "invalid credentials" })
            );
          }
        });
      } else {
        return res.json({
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
        theaterName: name,
        password: hashedPassword,
        mobile,
      });
      const returnTheaterData = await newTheaterData.save();

      const newTheaterId: string = returnTheaterData._id.toString();

      const jwt = generateJWT(newTheaterId,"theater");
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

  adminLogin: async (req: Request, res: Response) => {
    try {
      const { email, password }: { email: string; password: string } = req.body;
      //find user in db
      const adminFile = await Admin.findOne({ email });

      if (adminFile) {
        bcrypt.compare(password, adminFile.password, function (err, result) {
          if (result === true) {
            //generate jwt and send to client
            const admin_id = adminFile._id.toString();
            const jwt = generateJWT(admin_id,"admin");

            res.json({
              admin: adminFile,
              created: true,
              token: jwt,
              status: "success",
            });
          } else {
            return (
              res
                // .status(401)
                .json({
                  login_status: false,
                  message: "invalid admin credentials",
                })
            );
          }
        });
      } else {
        return res.json({
          login_status: false,
          message: "invalid admin username or password",
        });
      }
    } catch (error) {
      res.json({ error, loginStatus: false, message: "login failed" });
    }
  },
  userGoogleAuth: async (req: Request, res: Response) => {
    console.log("data fron frrooont", req.body);

    try {
      const { name, email }: { name: string; email: string } = req.body;
      //find user in db
      const userFile = await User.findOne({ email });

      if (userFile) {
        if (userFile.blockedStatus) {
          return res.json({
            userBlocked: true,
            message: "OOPS!! you are blocked by admin",
          });
        } else {
          //generate jwt and send to client
          const user_id = userFile._id.toString();
          const jwt = generateJWT(user_id,"user");

          res.json({
            user: userFile,
            created: true,
            token: jwt,
            status: "success",
          });
        }
      } else {
        // Creating a new user
        const newUserData = new User({
          email,
          name,
        });
        const returnData = await newUserData.save();

        const newUserId = returnData._id;

        const jwt = generateJWT(newUserId.toString(),"user");

        // create empty wallet for new user
      const newUserWallet = new Wallet({
        userId:newUserId,
        balance:0,
        transactions:[] 
       })
       await newUserWallet.save()

        res.json({
          user: newUserData,
          created: true,
          token: jwt,
          status: "success",
        });
      }
    } catch (error) {
      res.json({ error, loginStatus: false, message: "login failed" });
    }
  },
};
export default authController;
