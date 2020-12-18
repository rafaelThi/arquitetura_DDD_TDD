import { Response, Request } from 'express';
import { container } from 'tsyringe';

import CreateUserSevice from '@modules/users/services/CreateUserService';
import UseRepository from '../../typeorm/repositories/UserRepository';

class UsersControllers {
  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email, password } = request.body;

    const createUser = container.resolve(CreateUserSevice);

    const user = await createUser.execute({
      name,
      email,
      password,
    });

    delete user.password;

    return response.json(user);
  }

  public async index(request:Request, response:Response): Promise<Response> {
    const usersRepository = new UseRepository();

    const allUsers = await usersRepository.getAll();

    return response.json(allUsers);
  }
}

export default UsersControllers;
