import { NextFunction, Request, Response } from "express";
import UserModels from "../Models/UserModels";
import { AsyncHandler } from "../Utils/AsyncHandler";
import bcrypt from "bcrypt";
import { AppError, HTTPCODES } from "../Utils/AppError";

// Users Registration:
export const UsersRegistration = AsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { name, email, phoneNumber, username, password } = req.body;

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const findEmail = await UserModels.findOne({ email });

    if (findEmail) {
      next(
        new AppError({
          message: "User with this account already exists",
          httpcode: HTTPCODES.FORBIDDEN,
        })
      );
    }

    const Users = await UserModels.create({
      name,
      email,
      username,
      phoneNumber: "234" + phoneNumber,
      password: hashedPassword,
      confirmPassword: hashedPassword,
      status: "User",
    });

    return res.status(201).json({
      message: "Successfully created User",
      data: Users,
    });
  }
);

// Users Login:
export const UsersLogin = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;

    const CheckEmail = await UserModels.findOne({ email });

    if (!CheckEmail) {
      next(
        new AppError({
          message: "User not Found",
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    const CheckPassword = await bcrypt.compare(password, CheckEmail!.password);

    if (!CheckPassword) {
      next(
        new AppError({
          message: "Email or password not correct",
          httpcode: HTTPCODES.CONFLICT,
        })
      );
    }

    if (CheckEmail && CheckPassword) {
      return res.status(200).json({
        message: "Login Successfull",
        data: CheckEmail,
      });
    }
  }
);

// Get all Users:
export const GetAllUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const alluser = await UserModels.find().sort({ createdAt: -1 });

    if (!alluser) {
      next(
        new AppError({
          message: "Users not found",
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    return res.status(200).json({
      message: "Successfully got this single user",
      data: alluser,
    });
  }
);

// Get a single User:
export const GetSingleUser = AsyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const singleuser = await UserModels.findById(req.params.userID);

    if (!singleuser) {
      next(
        new AppError({
          message: "User not found",
          httpcode: HTTPCODES.NOT_FOUND,
        })
      );
    }

    return res.status(200).json({
      message: "Successfully got this single user",
      data: singleuser,
    });
  }
);

// Update a user:
export const UpdateUser = AsyncHandler(
  async (req: any, res: Response, next: NextFunction) => {
    const { userName } = req.body;

    const user = await UserModels.findByIdAndUpdate(
      req.params.id,
      { userName },
      { new: true }
    );

    if (!user) {
      next(
        new AppError({
          message: "An error occured in updating user name",
          httpcode: HTTPCODES.INTERNAL_SERVER_ERROR,
        })
      );
    }

    return res.status(201).json({
      message: "Successfully updated the user username",
      data: user,
    });
  }
);
