import { container } from 'tsyringe';

import IStoregeProvaider from '@shared/container/providers/StoregeProvider/models/IStoregeProvaider';
import DiskStorageProvider from './StoregeProvider/implementations/DiskStorageProvider';

import IMailProvider from './MailProvider/models/IMailProvaider';
import EtherealMailProvider from './MailProvider/implementations/EtherealMailProvider';

container.registerSingleton<IStoregeProvaider>(
  'StoregeProvaider',
  DiskStorageProvider,
);

container.registerInstance<IMailProvider>(
  'MailProvider',
  new EtherealMailProvider(),
);
