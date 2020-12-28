import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { isAfter, addHours } from 'date-fns';
import IUsersRepository from '../repositories/IUserRepository';
import IUserTokenRepository from '../repositories/IUserTokenRepository';
import IHashProvider from '../provider/HashProvider/models/IHashProvider';

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

    @inject('HashProvider')//
    private hashProvider: IHashProvider,

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

    const user = await this.usersRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User does not exists');
    }

    const tokenCreateAt = userToken.created_at;

    const compareDate = addHours(tokenCreateAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token Expired');
    }

    user.password = await this.hashProvider.generateHash(password);

    await this.usersRepository.save(user);
  }
}

export default ResetPasswordService;
