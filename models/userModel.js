import mongoose from "mongoose";
import validator from "validator";

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please enter your name"],
    },
    email: {
        type: String,
        required: [true, "Please enter your email"],
        unique: true,
        validate: [validator.isEmail, "Please enter a valid email"],
    },
    password: {
        type: String,
        required: [true, "Please enter your password"],
        minlength: [6, "Password must be at least 6 characters long"],

    },
   phone: {
        type: String,
        required: [true, "Please enter your phone number"],
        minlength: [10, "Phone number must be at least 10 characters long"],
        maxlength: [10, "Phone number must be at most 10 characters long"],
    },
    
}, {
    timestamps: true,
});

const User = mongoose.model("User", userSchema);

export default User;