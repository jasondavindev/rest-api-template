import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import { Logger } from '@/lib/logger';
import expressLoader from '@/loaders/ExpressLoader';
import typeORMLoader from '@/loaders/TypeormLoader';

const log = new Logger(__filename);

bootstrapMicroframework({
  loaders: [expressLoader, typeORMLoader]
})
  .then(() => log.info('Application is running'))
  .catch((error) => log.error(`Application is crashed: ${error}`));
