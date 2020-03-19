import { MicroframeworkSettings } from 'microframework-w3tec'
import { Container } from 'typedi'
import { createConnection, ConnectionOptions, useContainer } from 'typeorm'

export const connectionOptions: ConnectionOptions = {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  type: process.env.TYPEORM_TYPE as any, // See createConnection options for valid types
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: `${process.env.TYPEORM_DATABASE}_${process.env.NODE_ENV}`,
  synchronize: false,
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.TYPEORM_MIGRATIONS]
}

export default async (settings: MicroframeworkSettings | undefined): Promise<void> => {
  useContainer(Container)
  const connection = await createConnection(connectionOptions)

  if (settings) {
    settings.setData('connection', connection)
    settings.onShutdown(() => connection.close())
  }
}
