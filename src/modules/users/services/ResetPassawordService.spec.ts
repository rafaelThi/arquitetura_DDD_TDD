import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';

import ResetPassword from './ResetPasswordService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

describe('Send123 Forgot Password Email', () => {
  it('should be able to reset password', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeUserTokenRepo = new FakeUserTokenRepository();

    const resetPassword = new ResetPassword(
      fakeUserTokenRepo,
      fakeUserRepo,
    );

    const user = await fakeUserRepo.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    const { token } = await fakeUserTokenRepo.generate(user.id);

    await resetPassword.execute({
      token,
      password: 'abcdef',

    });
    const confirmUser = await fakeUserRepo.findById(user.id);

    expect(confirmUser?.password).toBe('abcdef');
  });
});
