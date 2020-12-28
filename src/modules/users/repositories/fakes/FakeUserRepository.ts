import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import User from '@modules/users/infra/typeorm/entities/Users';
import { uuid } from 'uuidv4';

class FakeUserRepository implements IUsersRepository {
  private users : User[] = []

  public async findByEmail(email: string): Promise<User | undefined> {
    const userByEmail = this.users.find((user) => user.email === email);
    return userByEmail;
  }

  public async findById(id: string): Promise<User | undefined> {
    const userById = this.users.find((user) => user.id === id);
    return userById;
  }

  public async create(userData: ICreateUserDTO): Promise<User> {
    const user = new User();

    Object.assign(user, { id: uuid() },
      userData);
    // atenção aqui
    this.users.push(user);

    return user;
  }

  public async save(user: User): Promise <User> {
    const findIndex = this.users.findIndex((findUser) => (
      findUser.id === user.id
    ));
    this.users[findIndex] = user;
    return user;
  }
}

export default FakeUserRepository;
