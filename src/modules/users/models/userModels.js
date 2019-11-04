import mongoose from 'mongoose'

let schema = mongoose.Schema

const userSchema = new schema({
    role: {
        type: String,
        enum: ["user", "admin"],
        default: "user"
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    picPath: {
        type: String,
    },
    createdAt: {
        type: Number,
        default: Date.now
    },
    updatedAt: {
        type: Number,
        default: Date.now
    },
    status: {
        type: String,
        enum: ["active", "inactive", "suspended"],
        default: "inactive"
    },
})

let User = mongoose.model('user', userSchema)

export {
    User
}