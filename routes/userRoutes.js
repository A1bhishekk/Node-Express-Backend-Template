import express from 'express';
import { deleteUser, getAllUsers, getUserById, loginUser, registerUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

//REGISTER || METHOD: POST || PATH: /api/v1/user/register
router.post('/register',registerUser);

//Get all users || METHOD: GET || PATH: /api/v1/auth/user
router.get('/',getAllUsers);

//Get a single user || METHOD: GET || PATH: /api/v1/auth/user/:id
router.get('/:id',getUserById);


//Update a user || METHOD: PUT || PATH: /api/v1/auth/user/:id
router.put('/:id',updateUser);


//Delete a user || METHOD: DELETE || PATH: /api/v1/auth/user/:id
router.delete('/:id',deleteUser);


//LOGIN || METHOD: POST || PATH: /api/v1/user/login
router.post('/login',loginUser);



export default router;