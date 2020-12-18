import { Router } from 'express';

import multer from 'multer';
import uploadConfig from '@config/upload';

import CreateUserSevice from '@modules/users/services/CreateUserService';
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService';

import UseRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { container } from 'tsyringe';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const usersRouter = Router();

const upload = multer(uploadConfig);

usersRouter.get('/list', async (request, response) => {
  const usersRepository = new UseRepository();

  const allUsers = await usersRepository.getAll();

  return response.json(allUsers);
});

usersRouter.post('/', async (request, response) => {
  const { name, email, password } = request.body;

  const createUser = container.resolve(CreateUserSevice);

  const user = await createUser.execute({
    name,
    email,
    password,
  });

  delete user.password;

  return response.json(user);
});

usersRouter.patch('/avatar', ensureAuthenticated, upload.single('avatar'), async (request, response) => {
  const updateUserAvatar = container.resolve(UpdateUserAvatarService);

  const user = await updateUserAvatar.execute({
    user_id: request.user.id,
    avatarFilename: request.file.filename,
  });

  delete user.password;

  return response.json(user);
});

export default usersRouter;
