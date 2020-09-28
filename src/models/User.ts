const bcrypt = require("bcryptjs");
import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  email: string;
  firstName: string;
  lastName: string;
  password: string;
}

const UserSchema: Schema = new Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: [
      (email: string) => {
        let re: RegExp = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
      },
      "Email Format is invalid"
    ]
  },
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  password: {
    type: String,
    required: [true, "Password Field is required."],
    minlength: [8, "Password Length should more then 8."],
    set: (password: string) => {
      if (typeof password === "string" && password.length > 7) {
        let salt = bcrypt.genSaltSync(10);
        return bcrypt.hashSync(password, salt);
      } else {
        return password;
      }
    }
  }
});

export const User = mongoose.model<IUser>("user", UserSchema);
