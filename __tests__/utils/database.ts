import { Container } from 'typedi'
import { Connection, createConnection, useContainer } from 'typeorm'

import { connectionOptions } from '@/loaders/TypeormLoader'

export const createDatabaseConnection = async (): Promise<Connection> => {
  useContainer(Container)
  const connection = await createConnection(connectionOptions)
  return connection
}

export const closeDatabase = (connection: Connection) => connection.close()
