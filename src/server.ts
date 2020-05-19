import 'reflect-metadata'
import { bootstrapMicroframework } from 'microframework-w3tec'

import { createLogger } from '@/decorators/logger'
import expressLoader from '@/loaders/ExpressLoader'
import typeORMLoader from '@/loaders/TypeormLoader'

const log = createLogger()

bootstrapMicroframework({
  loaders: [expressLoader, typeORMLoader]
})
  .then(() => log.info({ message: 'Application is running' }))
  .catch((error) => log.error({ message: 'Application is crashed', stack: error.stack }))
