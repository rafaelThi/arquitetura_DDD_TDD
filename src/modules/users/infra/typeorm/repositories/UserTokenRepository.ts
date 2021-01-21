import { getRepository, Repository } from 'typeorm';
import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import UserToken from '../entities/UserToken';

class UserTokenRepository implements IUserTokenRepository {
private ormRepository: Repository<UserToken>

constructor() {
  this.ormRepository = getRepository(UserToken);
  // criando o repositorio buscando de UserToken
}

public async findByToken(token: string): Promise<UserToken | undefined> {
  const userToken = await this.ormRepository.findOne({
    where: { token },
  });
  return userToken;
}

public async generate(user_id: string): Promise<UserToken> {
  const userToken = this.ormRepository.create({
    user_id,
  });
  // criando a instancia da classe, por isso não precisa do await aqui

  await this.ormRepository.save(userToken);
  // usar o await aqui pq aqui ocorre o salvamento no banco

  return userToken;
}
}

export default UserTokenRepository;
