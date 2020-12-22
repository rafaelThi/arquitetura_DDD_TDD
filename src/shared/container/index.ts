import { container } from 'tsyringe';

import IAppointmentsRepository from '@modules/appointments/repositories/IAppontimentsRepository';

import AppointmentsRepository from '@modules/appointments/infra/typeorm/repositories/AppontimentsRepository';

import IUserRepository from '@modules/users/repositories/IUserRepository';

import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';

import '@modules/users/provider/index';
import '@shared/container/providers/index';

container.registerSingleton<IAppointmentsRepository>('AppointmentsRepository', AppointmentsRepository);
// registerSingleton pq ele instancia essa classe uma unica vez e depois todas as requisicoes usam essa instancias

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);
