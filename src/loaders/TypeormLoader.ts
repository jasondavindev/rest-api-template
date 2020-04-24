import { MicroframeworkSettings } from 'microframework-w3tec'
import { Container } from 'typedi'
import { createConnection, ConnectionOptions, useContainer, Connection } from 'typeorm'

import envs from '@/config/envs'

export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: envs.db.host,
  port: envs.db.port,
  username: envs.db.username,
  password: envs.db.password,
  database: `${envs.db.database}_${process.env.NODE_ENV}`,
  synchronize: false,
  logging: envs.db.logging,
  entities: ['src/database/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts']
}

export default async (settings?: MicroframeworkSettings): Promise<Connection> => {
  useContainer(Container)
  const connection = await createConnection(connectionOptions)

  if (!connection.isConnected) {
    throw new Error('No connection')
  }

  if (settings) {
    settings.setData('connection', connection)
    settings.onShutdown(async () => {
      await connection.close()
    })
  }

  return connection
}
