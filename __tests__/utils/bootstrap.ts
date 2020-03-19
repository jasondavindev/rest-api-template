import { Application } from 'express'
import http from 'http'
import { bootstrapMicroframework } from 'microframework-w3tec'
import { Connection } from 'typeorm/connection/Connection'

import expressLoader from '@/loaders/ExpressLoader'
import typeormLoader from '@/loaders/TypeormLoader'

export interface BootstrapSettings {
  app: Application
  server: http.Server
  connection: Connection
}

export const bootstrapApp = async (): Promise<BootstrapSettings> => {
  const framework = await bootstrapMicroframework({
    loaders: [typeormLoader, expressLoader]
  })

  return {
    app: framework.settings.getData('app') as Application,
    connection: framework.settings.getData('connection') as Connection
  } as BootstrapSettings
}
