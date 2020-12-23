import FakeUserRepository from '@modules/users/repositories/fakes/FakeUserRepository';
import FakeStorageProvider from '@shared/container/providers/StoregeProvider/fakes/FakeStorageProvaider';
import AppError from '@shared/errors/AppError';
import UpdateUserAvatar from './UpdateUserAvatarService';

describe('UpdateUserAvatar', () => {
  it('should be able to Update avatar user', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(fakeUserRepo, fakeStorageProvider);

    const user = await fakeUserRepo.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    expect(user.avatar).toBe('avatar.jpg');
  });

  it('should not be able to Update user avatar if not login', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const updateUserAvatar = new UpdateUserAvatar(fakeUserRepo, fakeStorageProvider);
    expect(updateUserAvatar.execute({
      user_id: 'user-not-existing',
      avatarFilename: 'avatar.jpg',
    })).rejects.toBeInstanceOf(AppError);
  });

  it('should delete old avatar when update a new', async () => {
    const fakeUserRepo = new FakeUserRepository();
    const fakeStorageProvider = new FakeStorageProvider();

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile');

    const updateUserAvatar = new UpdateUserAvatar(fakeUserRepo, fakeStorageProvider);

    const user = await fakeUserRepo.create({
      name: 'Test',
      email: 'test@test.com',
      password: '123456',
    });
    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar.jpg',
    });

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFilename: 'avatar2.jpg',
    });

    expect(deleteFile).toHaveBeenCalledWith('avatar.jpg');
    expect(user.avatar).toBe('avatar2.jpg');
  });
});
