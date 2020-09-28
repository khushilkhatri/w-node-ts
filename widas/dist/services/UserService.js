"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var User_1 = require("../models/User");
/**
 * For fetch multiple user
 * @param skip number
 * @param limit number
 */
exports.getAllUser = function (skip, limit) {
    if (skip === void 0) { skip = 0; }
    if (limit === void 0) { limit = 10; }
    return User_1.User.find()
        .skip(skip)
        .limit(limit)
        .select("-password");
};
/**
 * For fetch single user
 * @param query for fetch single user using query
 * @param withPassword for fetch user with password
 */
exports.getSingleUser = function (query, withPassword) {
    if (withPassword === void 0) { withPassword = false; }
    var select = "";
    if (!withPassword)
        select = "-password";
    return User_1.User.findOne(query).select(select);
};
/**
 * For create new user
 * @param user user object
 */
exports.createUser = function (user) {
    return User_1.User.create(user);
};
/**
 * For create new user
 * @param id user mongo id
 * @param updatedBody user updated body
 */
exports.updateUser = function (id, updatedBody) {
    return User_1.User.updateOne({ _id: id }, { $set: updatedBody }, { new: true });
};
