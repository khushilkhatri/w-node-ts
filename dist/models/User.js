"use strict";
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
var bcrypt = require("bcryptjs");
var mongoose_1 = __importStar(require("mongoose"));
var UserSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        validate: [
            function (email) {
                var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
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
        set: function (password) {
            if (typeof password === "string" && password.length > 7) {
                var salt = bcrypt.genSaltSync(10);
                return bcrypt.hashSync(password, salt);
            }
            else {
                return password;
            }
        }
    }
});
exports.User = mongoose_1.default.model("user", UserSchema);
