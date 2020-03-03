import { MicroframeworkSettings } from 'microframework-w3tec';
import { Container } from 'typedi';
import { createConnection, getConnectionOptions, useContainer } from 'typeorm';

export default async (settings: MicroframeworkSettings | undefined): Promise<void> => {
  const loadedConnectionOptions = await getConnectionOptions();

  const connectionOptions = Object.assign(loadedConnectionOptions, {
    type: process.env.TYPEORM_CONNECTION, // See createConnection options for valid types
    host: process.env.TYPEORM_HOST,
    port: process.env.TYPEORM_PORT,
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    synchronize: false,
    logging: process.env.TYPEORM_LOGGING,
    entities: [process.env.TYPEORM_ENTITIES],
    migrations: [process.env.TYPEORM_MIGRATIONS]
  });

  useContainer(Container);
  const connection = await createConnection(connectionOptions);

  if (settings) {
    settings.setData('connection', connection);
    settings.onShutdown(() => connection.close());
  }
};
