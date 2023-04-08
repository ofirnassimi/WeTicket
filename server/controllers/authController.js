import {
  login as loginLogic,
  register as registerLogic,
} from '../logic/user.js';
import 'dotenv/config';

export const register = async (req, res) => {
  const { first_name, last_name, email, password } = req.body;

  try {
    const registrationInfo = registerLogic(
      first_name,
      last_name,
      email,
      password
    );
    res.status(201).json(registrationInfo);
  } catch (error) {
    res.status(500).json(error.message);
  }
};

export const login = async (req, res) => {
  const { email, password } = req.body || {};

  try {
    const cookieInfo = loginLogic(email, password);
    const { cookie, status, others } = cookieInfo;
    res
      .cookie(cookie.access_token, cookie.token, { httpOnly: cookie.httpOnly })
      .status(status)
      .json(others);
  } catch (error) {
    return res.status(error.status).json(error.message);
  }
};
