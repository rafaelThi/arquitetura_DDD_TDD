import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmail from './ForgotPasswordEmailService';
import FakeUserTokenRepository from '../repositories/fakes/FakeUserTokenRepository';

describe('Send Forgot Password Email', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepo = new FakeUserTokenRepository();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(fakeUserRepo, fakeMailProvider, fakeUserTokenRepo);

    await fakeUserRepo.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'test@test.com',

    });

    expect(sendMail).toHaveBeenCalled();
  });

  it('should not be able to recover a non-existing user password', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepo = new FakeUserTokenRepository();

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(fakeUserRepo, fakeMailProvider, fakeUserTokenRepo);

    await expect(sendForgotPasswordEmail.execute({
      email: 'test@test.com',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should generate a forgot password token', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();
    const fakeUserTokenRepo = new FakeUserTokenRepository();

    const generateToken = jest.spyOn(fakeUserTokenRepo, 'generate');

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(
      fakeUserRepo,
      fakeMailProvider,
      fakeUserTokenRepo,
    );

    const user = await fakeUserRepo.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });

    await sendForgotPasswordEmail.execute({
      email: 'test@test.com',

    });

    expect(generateToken).toHaveBeenCalledWith(user.id);
  });
});
