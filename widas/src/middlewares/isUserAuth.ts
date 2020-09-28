import { Request, Response, NextFunction } from "express";
import { verifyToken } from "../configs/jwt";

export const isUserAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    await verifyToken(req.get("token"));
    return next();
  } catch (error) {
    return res.status(401).send({
      status: false,
      message: "user unauthorized or token may expire."
    });
  }
};
