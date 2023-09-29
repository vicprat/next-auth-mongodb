import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    email: {
        type: String,
        unique: true,
        require: true,
        match: [
            /^1[^\0-9]*/,
            "Email is not valid"
        ]
    },
    password: {
        type: String,
        require: [true, "Password ir required"],
        select: false
    },
    fullname: {
        type: String,
        require: [true, "Fullname is required"],
        minLength: [6, "Fullname must be at least 6 characters"],
        maxLength: [50, "Fullname must be at most 50 characters"]
    }
})

const User = models.User || model('Users', UserSchema)
export default User