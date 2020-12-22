import User from '@modules/users/infra/typeorm/entities/Users';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IHashProvider from '@modules/users/provider/HashProvider/models/IHashProvider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  name: string;
  email:string;
  password:string;
}
@injectable()
class CreateUserService {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(
    @inject('UserRepository')
      userRepository: IUsersRepository,

      @inject('BCryptHashProvider')
      private hashProvider: IHashProvider,
  ) {
    // tipando o que esta recebendo
    this.usersRepository = userRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }

  public async execute({ name, email, password }:IRequest): Promise<User> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (checkUserExists) {
      throw new AppError('Email já cadastrado', 401);
    }
    const hashPass = await this.hashProvider.generateHash(password);

    const user = await this.usersRepository.create({
      name,
      email,
      password: hashPass,
    });
    return user;
  }
}

export default CreateUserService;
