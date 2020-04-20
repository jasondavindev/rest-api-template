import { MicroframeworkSettings } from 'microframework-w3tec'
import { Container } from 'typedi'
import { createConnection, ConnectionOptions, useContainer } from 'typeorm'

export const connectionOptions: ConnectionOptions = {
  type: 'postgres',
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: `${process.env.TYPEORM_DATABASE}_${process.env.NODE_ENV}`,
  synchronize: false,
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: ['src/database/models/**/*.ts'],
  migrations: ['src/database/migrations/**/*.ts']
}

export default async (settings: MicroframeworkSettings | undefined): Promise<void> => {
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
}
