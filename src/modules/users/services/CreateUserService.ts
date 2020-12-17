import { getRepository } from 'typeorm';
import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';

interface Request {
  name: string;
  email:string;
  password:string;
}

class CreateUserService {
  public async execute({ name, email, password }:Request): Promise<User> {
    const usersReposotory = getRepository(User);

    const checkUserExists = await usersReposotory.findOne({
      where: { email },
    });

    if (checkUserExists) {
      throw new AppError('Email já cadastrado', 401);
    }
    const hashPass = await hash(password, 8);

    const user = usersReposotory.create({
      name,
      email,
      password: hashPass,
    });

    await usersReposotory.save(user);
    return user;
  }
}

export default CreateUserService;
