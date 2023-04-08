import {
  updateUser as updateUserLogic,
  deleteUser as deleteUserLogic,
  getUserByID,
  getAllUsers as getAllUsersLogic,
} from '../logic/user.js';

export const updateUser = async (req, res) => {
  const { params, body } = req;
  const { id } = params;

  try {
    const updatedUser = await updateUserLogic(id, body);
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const deleteUser = async (req, res) => {
  const { params } = req;
  const { id } = params;

  try {
    await deleteUserLogic(id);
    res.status(200).json('User has been deleted succefully');
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getUser = async (req, res) => {
  const { params } = req;
  const { id } = params;
  try {
    const user = await getUserByID(id);
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json(error);
  }
};

export const getAllUsers = async (req, res) => {
  try {
    const users = await getAllUsersLogic();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json(error);
  }
};
