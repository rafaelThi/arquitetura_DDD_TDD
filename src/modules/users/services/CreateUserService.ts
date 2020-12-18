import { hash } from 'bcryptjs';
import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email:string;
  password:string;
}

class CreateUserService {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(userRepository: IUsersRepository) {
    // tipando o que esta recebendo
    this.usersRepository = userRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }

  public async execute({ name, email, password }:IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email já cadastrado', 401);
    }
    const hashPass = await hash(password, 8);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPass,
    });
    return user;
  }
}

export default CreateUserService;
