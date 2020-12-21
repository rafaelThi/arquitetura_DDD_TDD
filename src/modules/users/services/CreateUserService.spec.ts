import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

import CreatUserService from './CreateUserService';

describe('CreatAppontment', () => {
  it('should be able to create a new User', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const createUser = new CreatUserService(fakeUserRepo);

    const user = await createUser.execute({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    expect(user).toHaveProperty('id');
  });

  it('should be not be able to create a new User with same Email', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const createUser = new CreatUserService(fakeUserRepo);

    await createUser.execute({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    expect(createUser.execute({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    })).rejects.toBeInstanceOf(AppError);
  });
});
