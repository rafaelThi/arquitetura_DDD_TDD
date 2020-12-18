import path from 'path';
import fs from 'fs';

import AppError from '@shared/errors/AppError';
import upLoaderConfig from '@config/upload';
import User from '@modules/users/infra/typeorm/entities/Users';
import IUsersRepository from '../repositories/IUserRepository';

interface IRequestUpdate {
  user_id:string;
  avatarFilename:string;
}

class UpdateUserAvatarService {
  private usersRepository: IUsersRepository;
  // criando a variavel

  constructor(userRepository: IUsersRepository) {
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
      const userAvatarFilePath = path.join(upLoaderConfig.directory, user.avatar);
      const userAvatarFilesExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFilesExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }
    user.avatar = avatarFilename;
    await this.usersRepository.save(user);

    return user;
  }
}

export default UpdateUserAvatarService;
