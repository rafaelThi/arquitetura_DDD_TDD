import IUserTokenRepository from '@modules/users/repositories/IUserTokenRepository';
import { uuid } from 'uuidv4';
import UserToken from '@modules/users/infra/typeorm/entities/UserToken';

class FakeUserTokenRepository implements IUserTokenRepository {
  private usersTokens : UserToken[] = []

  public async generate(user_id: string): Promise<UserToken> {
    const userToken = new UserToken();

    Object.assign(UserToken, {
      id: uuid(),
      token: uuid(),
      user_id,
    });

    this.usersTokens.push(userToken);
    return userToken;
  }
}

export default FakeUserTokenRepository;
