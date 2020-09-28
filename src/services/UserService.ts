import { User, IUser } from "../models/User";

/**
 * For fetch multiple user
 * @param skip number
 * @param limit number
 */
export const getAllUser: any = (skip: number = 0, limit: number = 10) => {
  return User.find()
    .skip(skip)
    .limit(limit)
    .select("-password");
};

/**
 * For fetch single user
 * @param query for fetch single user using query
 * @param withPassword for fetch user with password
 */
export const getSingleUser: any = (
  query: any,
  withPassword: boolean = false
) => {
  let select: string = "";
  if (!withPassword) select = "-password";
  return User.findOne(query).select(select);
};

/**
 * For create new user
 * @param user user object
 */
export const createUser: any = (user: IUser) => {
  return User.create(user);
};

/**
 * For create new user
 * @param id user mongo id
 * @param updatedBody user updated body
 */
export const updateUser: any = (id: string, updatedBody: any) => {
  return User.updateOne({ _id: id }, { $set: updatedBody }, { new: true });
};
