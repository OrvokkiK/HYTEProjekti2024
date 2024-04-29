import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import 'dotenv/config';
// import {selectUserByUsername} from '../models/user-model.mjs';
import {customError} from '../middlewares/error-handler.mjs';
import { selectUserByUsername } from '../models/user-model.mjs';

/**
 * User login
 * @async
 * @param {object} req
 * @param {object} res
 * @param {function} next
 * @return {object} user if username & password match
 */
const postLogin = async (req, res, next) => {
  const {username, password} = req.body;
  console.log('login', req.body);
  const user = await selectUserByUsername(username);
  if (user.error) {
    return res.status(user.error).json(user);
  }
  // compare password and hash, if match, login successful
  const match = await bcrypt.compare(password, user.password);
  if (match) {
    delete user.password;
    const token = jwt.sign(user, process.env.JWT_SECRET, {
      expiresIn: process.env.JWT_EXPIRES_IN,
    });
    console.log(token)
    return res.json({message: 'Logged in successfully', user, token});
  } else {
    return next(customError('Invalid username or password', 401));
  }
};

/**
 * Get user info from token
 * NOTE! user info is extracted from the token
 * => it is not necessary up to date info (should be refreshed from db)
 * @async
 * @param {object} req
 * @param {object} res
 * @return {object} user info
 */
const getMe = async (req, res) => {
  res.json({user: req.user});
};

export {postLogin, getMe};