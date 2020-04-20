import { Connection } from 'typeorm'

export default function cleanTables(connection: Connection, entities: Function[]) {
  return Promise.all(entities.map((entity) => connection.getRepository(entity).delete({})))
}
