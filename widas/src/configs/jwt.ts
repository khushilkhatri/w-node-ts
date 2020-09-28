const JWT = require("jsonwebtoken");
const util = require("util");

const jwtSecret = "example";

const verify: any = util.promisify(JWT.verify);

export const issue = (payload: any) => {
  return JWT.sign(payload, jwtSecret, { expiresIn: 3 * 60 * 60 });
};

export const verifyToken = async (token: string | undefined) => {
  return await verify(token, jwtSecret);
};
