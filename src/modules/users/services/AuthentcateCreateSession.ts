import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';

import AppError from '@shared/errors/AppError';

import User from '@modules/users/infra/typeorm/entities/Users';

import auth from '@config/auth';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestDTO {
  email: string,
  password: string
}

interface IResponseUser {
  user:User;
   token: string
  }

class AutenticanteCreateSession {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(userRepository: IUsersRepository) {
    // tipando o que esta recebendo
    this.usersRepository = userRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }

  public async execute({ email, password }:IRequestDTO): Promise<IResponseUser> {
    // chamando usuario para autenticar
    const user = await this.usersRepository.findByEmail(email);
    // verificar o email do usuario
    if (!user) {
      throw new AppError('Incorrect dates', 401);
    }
    const passwordMatch = await compare(password, user.password);
    // verificar a senha do usuario

    if (!passwordMatch) {
      throw new AppError('Incorrect dates', 401);
    }
    // gerando token
    const token = sign({}, auth.jwt.secret, {
      subject: user.id,
      expiresIn: auth.jwt.expiresIn,
    });
    // se tudo bater, retornar algo
    return ({
      user,
      token,
    });
  }
}

export default AutenticanteCreateSession;
