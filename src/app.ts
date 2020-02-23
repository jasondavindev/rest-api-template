import 'reflect-metadata';
import { bootstrapMicroframework } from 'microframework-w3tec';

import { Logger } from '@/lib/logger';
import expressLoader from '@/loaders/expressLoader';
import typeORMLoader from '@/loaders/typeormLoader';

const log = new Logger(__filename);

bootstrapMicroframework({
  loaders: [expressLoader, typeORMLoader]
})
  .then(() => log.info('Application is running'))
  .catch((error) => log.error(`Application is crashed: ${error}`));
