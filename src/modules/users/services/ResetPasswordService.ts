import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';

interface IRequest {
  token:string;
  password:string;
}
@injectable()
class ResetPasswordService {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(
    @inject('UserTokenRepository')//
    private userTokenRepository: IUserTokenRepository,

    @inject('UserRepository')
    userRepository: IUsersRepository,

  ) {
    // tipando o que esta recebendo
    this.usersRepository = userRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }

  public async execute({ token, password }:IRequest): Promise<void> {
    const userToken = await this.userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('User token does not exists');
    }
    console.log(userToken);

    const user = await this.usersRepository.findById(userToken.user_id);
    console.log(user);

    if (!user) {
      throw new AppError('User does not exists');
    }
    user.password = password;

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
