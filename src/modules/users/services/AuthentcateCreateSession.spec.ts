import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeHashProvider from '@modules/users/provider/HashProvider/fakes/FakeHashProvider';
import AppError from '@shared/errors/AppError';

import AuthentcateUserService from './AuthentcateCreateSession';
import CreateUserService from './CreateUserService';

describe('AuthentcateUser', () => {
  it('should be able to Authenticate', async () => {
    const fakeAuthentcateUserRepo = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeAuthentcateUserRepo, fakeHashProvider);

    const createAuthentcateUser = new AuthentcateUserService(fakeAuthentcateUserRepo, fakeHashProvider);

    const user = await createUser.execute({ name: 'Teste', email: 'test@test.com', password: '123456' });

    const response = await createAuthentcateUser.execute({
      email: 'test@test.com',
      password: '123456',
    });

    expect(response).toHaveProperty('token');
    expect(response.user).toEqual(user);
  });

  it('should not be able to Authenticate with email not exists', async () => {
    const fakeAuthentcateUserRepo = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createAuthentcateUser = new AuthentcateUserService(fakeAuthentcateUserRepo, fakeHashProvider);

    await expect(createAuthentcateUser.execute({
      email: 'test1010@test.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
  it('should be able to Authenticate', async () => {
    const fakeAuthentcateUserRepo = new FakeUserRepository();
    const fakeHashProvider = new FakeHashProvider();

    const createUser = new CreateUserService(fakeAuthentcateUserRepo, fakeHashProvider);

    const createAuthentcateUser = new AuthentcateUserService(fakeAuthentcateUserRepo, fakeHashProvider);

    await createUser.execute({ name: 'Teste', email: 'test@test.com', password: '123456' });

    await expect(createAuthentcateUser.execute({
      email: 'test@test.com',
      password: '74158',
    })).rejects.toBeInstanceOf(AppError);
  });
});
