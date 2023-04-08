import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { UserModel } from '../models/index.js';
import { createError } from '../utils/error.js';
import 'dotenv/config';

export const register = async (firstName, lastName, email, password) => {
  const salt = bcrypt.genSaltSync(10);
  const hash = bcrypt.hashSync(password, salt);

  const user = new UserModel({
    first_name: firstName,
    last_name: lastName,
    email,
    password: hash,
  });

  try {
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    throw error;
  }
};

export const login = async (email, password) => {
  const user = await UserModel.findOne({ email });
  if (!user) {
    throw createError(404, 'User not found');
  }

  const isPasswordCorrect = await bcrypt.compare(password, user.password);
  if (!isPasswordCorrect) {
    throw createError(400, 'Wrong email or password');
  }

  const token = jwt.sign(
    {
      id: user._id,
      isAdmin: user.is_admin,
    },
    process.env.JWT_SECRET_KEY
  );

  const { password: userPassword, is_admin, ...others } = user._doc;

  return {
    cookie: {
      access_token: 'access_token',
      token,
      httpOnly: true,
    },
    status: 200,
    others: { ...others },
  };
};

export const updateUser = async (userID, updatedInfo) => {
  try {
    const updatedUser = await UserModel.findByIdAndUpdate(
      userID,
      { $set: updatedInfo },
      { new: true }
    );
    return updatedUser;
  } catch (error) {
    throw error;
  }
};

export const deleteUser = async (userID) => {
  try {
    await UserModel.findByIdAndDelete(userID);
  } catch (error) {
    throw error;
  }
};

export const getUserByID = async (userID) => {
  try {
    const user = await UserModel.findById(userID);
    return user;
  } catch (error) {
    throw error;
  }
};

export const getAllUsers = async () => {
  try {
    const users = await UserModel.find();
    return users;
  } catch (error) {
    throw error;
  }
};
