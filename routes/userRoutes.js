import express from 'express';
import { getUsers, getUserById, addUser, deleteUser, updateUser } from '../controllers/userController.js';

const router = express.Router();

// To locally run, check out this URL: http://localhost:3000/api/users
router.get('/users', getUsers); // Get all users
router.get('/users/:id', getUserById); // Get a specific user by ID
router.post('/users', addUser); // Add a new user
router.delete('/users/:id', deleteUser); // Delete a user by ID
router.put('/users/:id', updateUser); // Update a user by ID

export default router;
