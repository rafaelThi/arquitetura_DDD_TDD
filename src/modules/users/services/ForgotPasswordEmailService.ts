// import User from '@modules/users/infra/typeorm/entities/Users';
// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvaider';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequest {
  email:string;
}
@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(
    @inject('UserRepository')
      userRepository: IUsersRepository,

    @inject('mailProvider')// tem que criar ainda
      private mailProveider:IMailProvider,

  ) {
    // tipando o que esta recebendo
    this.usersRepository = userRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }

  public async execute({ email }:IRequest): Promise<void> {
    this.mailProveider.sendMail(email, 'Pedido de recuperação de senha.');
  }
}

export default SendForgotPasswordEmailService;
