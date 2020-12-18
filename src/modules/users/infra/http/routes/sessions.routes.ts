import { Router } from 'express';
import AuthenticateCreateSession from '@modules/users/services/AuthentcateCreateSession';
import UseRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import { container } from 'tsyringe';

const sessionsRouter = Router();

sessionsRouter.post('/', async (request, response) => {
  const { email, password } = request.body;
  const usersRepository = new UseRepository();

  const authenticanteUser = container.resolve(AuthenticateCreateSession);

  const authentcateResponseUser = await authenticanteUser.execute({
    email,
    password,
  });

  delete authentcateResponseUser.user.password;

  return response.json(authentcateResponseUser);
});

export default sessionsRouter;
