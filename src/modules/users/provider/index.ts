import { container } from 'tsyringe';

import IHashProvaider from './HashProvider/models/IHashProvider';

import BCryptHashProvider from './HashProvider/implementations/BCryptHashProvider';

container.registerSingleton<IHashProvaider>('BCryptHashProvider', BCryptHashProvider);
