import User from "../models/userModel.js";
import { comparePassword, hashPassword } from "../utils/authHelper.js";
import JWT from "jsonwebtoken";
import ErrorHandler from "../utils/errorHandler.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";

/*
@desc    Register a new user
@route   POST /api/v1/user/register
@access  Public
*/


export const registerUser = catchAsyncError(async (req, res, next) => {
    const { name, email, password ,phone} = req.body;

    // validation 
    if (!name || !email || !password || !phone) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    
     // existing user 
     const existingUser = await User.findOne({ email })
     if (existingUser) {
       return next(new ErrorHandler("User already exists", 400))
     }

    // create new user
    const hashedPassword = await hashPassword(password)
    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        phone
    });

    res.status(201).json({
        success: true,
        data: user,
        message: `${user.name} Registered Successfully 💃`,
    });

});

/*
@desc  Get all users
@route   GET /api/v1/user
@access  public
*/

export const getAllUsers = catchAsyncError(async (req, res, next) => {
    const users = await User.find();
    res.status(200).json({
        success: true,
        data: users,
        message: "All users fetched successfully",
    });
});

/*
@desc    Get a single user by id
@route   GET /api/v1/user/:id
@access  public
*/

export const getUserById = catchAsyncError(async (req, res, next) =>{
   const  user = await User.findById(req.params.id);
    if(!user){
        return next(new ErrorHandler("User not found", 404));
    }
    res.status(200).json({
        success: true,
        data: user,
        message: "User fetched successfully",
    });
});

/*
@desc    Update a user by id
@route   PUT /api/v1/user/:id
@access  public
*/

export const updateUser = catchAsyncError(async (req, res, next) =>{
    const { id } = req.params;
    const { name, email, password ,phone} = req.body;

    // validation
    if (!name || !email || !password || !phone) {
        return next(new ErrorHandler("Please enter all fields", 400));
    }
    
    const hashedPassword = await hashPassword(password)


    const updatedUser = await User.findByIdAndUpdate(id, {
        name,
        email,
        password: hashedPassword,
        phone
    }, { new: true })
    res.status(200).json({ message: `user ${updatedUser.name} updated successfully`, updatedUser })
});



/*
@desc    Delete a user by id
@route   DELETE /api/v1/user/:id
@access  public

*/

export const deleteUser = catchAsyncError(async (req, res, next) =>{
    const { id } = req.params;
    const user = await User.findByIdAndDelete(id);
    res.status(200).json({ message: `user ${user.name} deleted successfully`,
    user,
    success: true
 })
}
);


/*
@desc    Login a user
@route   POST /api/v1/user/login
@access  public
*/

export const loginUser = catchAsyncError(async (req, res, next) =>{
    const { email, password } = req.body;

    // validation
    if (!email || !password) {
        return next(new ErrorHandler("Please fill all the fields", 400))
    }

    // check for existing user
    const user = await User.findOne({ email })

    if (!user) {
        return next(new ErrorHandler("Invalid Credentials", 400))
    }

    const match = comparePassword(password, user.password)

    if (!match) {
        return next(new ErrorHandler("Invalid Credentials", 400))

    }

    // create token
    const token = await JWT.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" })

    res.status(200).json({
        success: true, message: "Login Successfull", user: {
            name: user.name,
            email: user.email,
            phone: user.phone,
        }, token
    })

});


