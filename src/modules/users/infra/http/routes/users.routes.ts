import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import UsersControllers from '../controllers/UsersControllers';
import UserAvatarController from '../controllers/UserAvatarContoller';

const usersRouter = Router();
const usersControllers = new UsersControllers();
const userAvatarControllers = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.post('/', usersControllers.create);
usersRouter.get('/list', usersControllers.index);

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), userAvatarControllers.update);

export default usersRouter;
