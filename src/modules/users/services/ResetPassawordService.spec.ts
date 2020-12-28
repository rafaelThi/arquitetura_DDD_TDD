import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import ResetPassword from './ResetPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';
import FakeHashProvider from '../provider/HashProvider/fakes/FakeHashProvider';

describe('Reset Password Service', () => {
  it('should be able to reset password', async () => {
    const fakeUsersRepo = new FakeUsersRepository();
    const fakeUserTokenRepo = new FakeUserTokenRepository();
    const fakeHashProvider = new FakeHashProvider();

    const resetPassword = new ResetPassword(
      fakeUserTokenRepo,
      fakeHashProvider,
      fakeUsersRepo,
    );

    const user = await fakeUsersRepo.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepo.generate(user.id);

    const gererateHash = jest.spyOn(fakeHashProvider, 'generateHash');

    await resetPassword.execute({
      token,
      password: 'abcdef',

    });
    const confirmUser = await fakeUsersRepo.findById(user.id);

    expect(gererateHash).toBeCalledWith('abcdef');
    expect(confirmUser?.password).toBe('abcdef');
  });
});
