import User from '../models/userModel.js';

// Get all users
export const getUsers = async (req, res) => {
  try {
    const users = await User.getAll();
    res.status(200).json(users);
  } catch (error) {
    console.error('Error retrieving users:', error);
    res.status(500).json({ error: 'Failed to retrieve users' });
  }
};

// Get a user by ID
export const getUserById = async (req, res) => {
  const userId = parseInt(req.params.id, 10);

  if (isNaN(userId)) {
    return res.status(400).json({ message: 'Invalid user ID' });
  }

  try {
    const user = await User.getById(userId);
    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    console.error('Error retrieving user:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

// Add a new user
export const addUser = async (req, res) => {
  const { name, email, subscription_plan, join_date, dob, country } = req.body;

  try {
    const newUser = await User.create({ name, email, subscription_plan, join_date, dob, country });
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error adding user:', error);
    res.status(500).json({ error: 'Failed to add user' });
  }
};

// Delete user by ID
export const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await User.deleteById(id);
    if (deletedUser) {
      res.status(200).json({ message: 'User deleted successfully', deletedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Failed to delete user' });
  }
};

// Update user by ID
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, subscription_plan, join_date, dob, country } = req.body;

  try {
    const updatedUser = await User.updateById(id, { name, email, subscription_plan, join_date, dob, country });
    if (updatedUser) {
      res.status(200).json({ message: 'User updated successfully', updatedUser });
    } else {
      res.status(404).json({ error: 'User not found' });
    }
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Failed to update user' });
  }
};
