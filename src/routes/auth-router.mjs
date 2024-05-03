import express from 'express';
import {body} from 'express-validator';
// original controller (back-end only)
// import {getMe, postLogin} from '../controllers/auth-controller.mjs';
// Use Kubios auth controller instead (TODO: apidoc need to be updated):
import {getMe, postLogin} from '../controllers/kubios-auth-controller.mjs';
import {authenticateToken} from '../middlewares/authentication.mjs';
import {validationErrorHandler} from '../middlewares/error-handler.mjs';

const authRouter = express.Router();

/**
 * @apiDefine all No authentication needed.
 */

/**
 * @apiDefine admin Admin users only.
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine token Logged in user access only
 * Valid authentication token must be provided within request.
 */

/**
 * @apiDefine UnauthorizedError
 * @apiError UnauthorizedError User name or password invalid.
 * @apiErrorExample Error-Response:
 *    HTTP/1.1 401 Unauthorized
 *    {
 *      "error": 401,
 *      "message": "invalid username or password"
 *    }
 */

/**
 * @apiDefine InvalidTokenError
 * @apiError InvalidToken Authentication token was invalid.
 * @apiErrorExample Error-Response:
 *     HTTP/1.1 401 Unauthorized
 *     {
 *       "message": "invalid token",
 *       "status": 401
 *     }
 */

authRouter
  /**
   * @api {post} /auth/login Login
   * @apiVersion 1.0.0
   * @apiName PostLogin
   * @apiGroup Authentication
   * @apiPermission all
   *
   * @apiDescription Sign in and get an authentication token for the user.
   *
   * @apiParam {String} username Username of the user.
   * @apiParam {String} password Password of the user.
   *
   * @apiParamExample {json} Request-Example:
   *    {
   *      "username": "johnd",
   *      "password": "examplepass"
   *    }
   *
   * @apiSuccess {String} token Token for the user authentication.
   * @apiSuccess {Object} user User info.
   *
   * @apiSuccessExample Success-Response:
   *    HTTP/1.1 200 OK
   *    {
   *      "message": "Logged in successfully",
   *      "token": "TOKEN-VALUE"
   *      "user": {
   *        "user_id": 21,
   *        "username": "johnd",
   *        "email": "johnd@example.com",
   *        "user_level": "regular"
   *      }
   *    }
   *
   * @apiUse UnauthorizedError
   */
  .post(
    '/login',
    body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),
    validationErrorHandler,
    postLogin,
  )

  /*
      body('username').trim().notEmpty(),
    body('password').trim().notEmpty(),
    validationErrorHandler,
    postLogin,
  )
  */

  /**
   * @api {get} /auth/me Request information about current user
   * @apiVersion 1.0.0
   * @apiName GetMe
   * @apiGroup Authentication
   * @apiPermission token
   * @apiHeader {String} Authorization Bearer token.
   *
   * @apiSuccess {Object} user User info.
   * @apiSuccess {Number} user.user_id Id of the User.
   * @apiSuccess {String} user.username Username of the User.
   * @apiSuccess {String} user.email email of the User.
   * @apiSuccess {Date} user.created_at User creation time.
   * @apiSuccess {String} user.user_level User level of the User.
   * @apiSuccess {Number} user.iat Token creation timestamp.
   * @apiSuccess {Number} user.exp Token expiration timestamp.
   *
   * @apiSuccessExample Success-Response:
   * HTTP/1.1 200 OK
   * {
   *   "user": {
   *     "user_id": 18,
   *     "username": "johnjane",
   *     "email": "johnjane@example.com",
   *     "created_at": "2024-03-07T12:45:51.000Z",
   *     "user_level": "regular",
   *     "iat": 1709887124,
   *     "exp": 1709973524
   *   }
   * }
   * @apiUse InvalidTokenError
   */
  .get('/me', authenticateToken, getMe);

export default authRouter;