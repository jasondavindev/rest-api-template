const envs = ['production', 'test', 'development'].map((env) => ({
  name: env,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: `${process.env.TYPEORM_DATABASE}_${env}`,
  synchronize: false,
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: [process.env.TYPEORM_ENTITIES],
  migrations: [process.env.IS_SEED ? process.env.TYPEORM_SEEDS : process.env.TYPEORM_MIGRATIONS],
  type: process.env.TYPEORM_TYPE
}))

module.exports = envs
