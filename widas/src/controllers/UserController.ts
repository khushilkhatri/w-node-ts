const bcrypt = require("bcryptjs");
import { Request, Response } from "express";
import {
  getAllUser,
  createUser,
  getSingleUser,
  updateUser
} from "../services/UserService";
import { issue } from "../configs/jwt";
const ObjectId = require("mongoose").Types.ObjectId;

export const getUsers = async (req: Request, res: Response) => {
  try {
    const skip: number = Number(req.query.skip);
    const limit: number = Number(req.query.limit);
    const users: any[] = await getAllUser(skip, limit);
    return res.status(200).send({
      message: "fetching users success",
      status: true,
      data: users
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server Error.",
      status: false
    });
  }
};

export const getUser = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(id)) {
      return res.status(400).send({
        message: "ObjectId wrong.",
        status: false
      });
    }
    const user = await getSingleUser({ _id: ObjectId(id) });
    if (!user) {
      return res.status(404).send({
        message: "User not found with id.",
        status: false
      });
    }
    return res.status(200).send({
      message: "fetching user success",
      status: true,
      data: user
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server Error.",
      status: false
    });
  }
};

export const login = async (req: Request, res: Response) => {
  try {
    const email: string = req.body.email;
    const password: string = req.body.password;
    if (!email || !password) {
      return res.status(400).send({
        message: "Email or Password is missing.",
        status: false
      });
    }
    const user = await getSingleUser({ email }, true);
    if (!user) {
      return res.status(400).send({
        message: "User not registered.",
        status: false
      });
    }
    let checkPassword = bcrypt.compareSync(password, user.password);
    if (!checkPassword) {
      return res
        .status(400)
        .send({ status: false, message: "Email or password is wrong." });
    }
    delete user.password;
    return res.status(200).send({
      message: "login success",
      status: true,
      data: user
    });
  } catch (err) {
    return res.status(500).send({
      message: "Internal Server Error.",
      status: false
    });
  }
};

export const token = async (req: Request, res: Response) => {
  try {
    const token = issue({
      time: "token valid for 3 hour"
    });
    return res.status(200).send({
      message: "user created",
      status: true,
      token
    });
  } catch (error) {
    return res.status(500).send({
      message: "Internal Server Error.",
      status: false
    });
  }
};

export const register = async (req: Request, res: Response) => {
  try {
    const user = req.body;
    const userRes = await createUser(user);
    delete userRes.password;
    return res.status(200).send({
      message: "user created",
      status: true,
      data: userRes
    });
  } catch (error) {
    if (error.code == 11000) {
      return res
        .status(400)
        .send({ message: "Email already exist.", status: false });
    }
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "User validation failed.",
        status: false,
        errors: error.errors
      });
    }
    return res.status(500).send({
      message: "Internal Server Error.",
      status: false
    });
  }
};

export const update = async (req: Request, res: Response) => {
  try {
    const id = req.params.id;
    const checkForHexRegExp = new RegExp("^[0-9a-fA-F]{24}$");
    if (!checkForHexRegExp.test(id)) {
      return res.status(400).send({
        message: "ObjectId wrong.",
        status: false
      });
    }
    const userRes = await updateUser(ObjectId(id), req.body);
    return res.status(200).send({
      message: "user Updated",
      status: true,
      data: userRes
    });
  } catch (error) {
    if (error.code == 11000) {
      return res
        .status(400)
        .send({ message: "Email already exist.", status: false });
    }
    if (error.name === "ValidationError") {
      return res.status(400).send({
        message: "User validation failed.",
        status: false,
        errors: error.errors
      });
    }
    return res.status(500).send({
      message: "Internal Server Error.",
      status: false
    });
  }
};
