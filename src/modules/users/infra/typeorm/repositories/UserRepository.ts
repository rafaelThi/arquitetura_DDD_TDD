import ICreateUserDTO from '@modules/users/dtos/ICreateUserDTO';
import IUsersRepository from '@modules/users/repositories/IUserRepository';
import { getRepository, Repository } from 'typeorm';
import User from '../entities/Users';

class UseRepository implements IUsersRepository {
private ormRepository: Repository<User>

constructor() {
  this.ormRepository = getRepository(User);
  // criando o repositorio buscando de User
}

public async findByEmail(email: string): Promise<User | undefined> {
  const findEmail = await this.ormRepository.findOne({
    where: { email },
  });
  return findEmail || undefined;
}

public async findById(id: string): Promise<User | undefined> {
  const findById = await this.ormRepository.findOne({
    where: { id },
  });
  return findById || undefined;
}

public async create(userData: ICreateUserDTO): Promise<User> {
  const createUser = this.ormRepository.create(userData);

  await this.ormRepository.save(createUser);

  return createUser;
}

public async save(user: User): Promise <User> {
  return this.ormRepository.save(user);
}

public async getAll() {
  const allUsers = this.ormRepository.find();

  return allUsers;
}
}

export default UseRepository;
