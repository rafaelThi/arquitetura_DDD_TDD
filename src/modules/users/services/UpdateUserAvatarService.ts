import { injectable, inject } from 'tsyringe';
import AppError from '@shared/errors/AppError';
import User from '@modules/users/infra/typeorm/entities/Users';
import IStoregeProvaider from '@shared/container/providers/StoregeProvider/models/IStoregeProvaider';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestUpdate {
  user_id:string;
  avatarFilename:string;
}

@injectable()
class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(
    @inject('UserRepository')
      userRepository: IUsersRepository,

      @inject('StoregeProvaider')
      private storageProvaider: IStoregeProvaider,
  ) {
    // tipando o que esta recebendo
    this.usersRepository = userRepository;
    // atribuindo novo 'valor' par varaiavel <=
  }

  public async execute({ user_id, avatarFilename }: IRequestUpdate): Promise<User> {
    const user = await this.usersRepository.findById(user_id);
    if (!user) {
      throw new AppError('Deve estar Logado para mudar o Avatar.');
    }
    if (user.avatar) {
      // deletar o avatar antigo
      await this.storageProvaider.deleteFile(user.avatar);
    }

    const fileName = await this.storageProvaider.saveFile(avatarFilename);

    user.avatar = fileName;

    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
