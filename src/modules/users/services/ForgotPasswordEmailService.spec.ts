import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
// import AppError from '@shared/errors/AppError';

import FakeMailProvider from '@shared/container/providers/MailProvider/fakes/FakeMailProvider';

import SendForgotPasswordEmail from './ForgotPasswordEmailService';

describe('Send Forgot Password Email', () => {
  it('should be able to recover the password using the email', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeMailProvider = new FakeMailProvider();

    const sendMail = jest.spyOn(fakeMailProvider, 'sendMail');

    const sendForgotPasswordEmail = new SendForgotPasswordEmail(fakeUserRepo, fakeMailProvider);

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
});
