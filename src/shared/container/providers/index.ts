import { container } from 'tsyringe';
import IStoregeProvaider from '@shared/container/providers/StoregeProvider/models/IStoregeProvaider';
import DiskStorageProvider from './StoregeProvider/implementations/DiskStorageProvider';

container.registerSingleton<IStoregeProvaider>(
  'StoregeProvaider',
  DiskStorageProvider,
);
