import { User } from "../models/userModels";

const createUser = (data, cb) => {
    var user = new User(data)
    user.save(cb)
}

const getUser = (data, cb) => {
    User.findOne(data, cb)
}

const updateUser = (findQuery, updateQuery, cb) => {
    User.updateOne(findQuery, { $set: updateQuery }, cb)
}

const deleteUser = (data, cb) => {
    User.deleteOne(data, cb)
}

const getAllUsers = (cb) => {
    User.find(cb)
}

export default {
    createUser,
    getUser,
    updateUser,
    deleteUser,
    getAllUsers,
}