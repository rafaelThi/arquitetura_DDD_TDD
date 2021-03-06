// import User from '@modules/users/infra/typeorm/entities/Users';
// import AppError from '@shared/errors/AppError';
import IMailProvider from '@shared/container/providers/MailProvider/models/IMailProvaider';
import { inject, injectable } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  email:string;
}
@injectable()
class SendForgotPasswordEmailService {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(

    @inject('MailProvider')// tem que criar ainda
    private mailProveider: IMailProvider,

    @inject('UserTokenRepository')//
    private userTokenRepository: IUserTokenRepository,

    @inject('UserRepository')
    userRepository: IUsersRepository,
  ) {
    // tipando o que esta recebendo
    this.usersRepository = userRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }

  public async execute({ email }:IRequest): Promise<void> {
    const checkUserExists = await this.usersRepository.findByEmail(email);

    if (!checkUserExists) {
      throw new AppError('User does not exists');
    }

    const { token } = await this.userTokenRepository.generate(checkUserExists.id);

    await this.mailProveider.sendMail(
      email,
      `Pedido de recuperação de senha. ${token}`,
    );
  }
}

export default SendForgotPasswordEmailService;
