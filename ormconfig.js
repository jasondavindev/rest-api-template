const envs = ['production', 'test', 'development'].map((env) => ({
  name: env,
  host: process.env.TYPEORM_HOST,
  port: Number(process.env.TYPEORM_PORT),
  username: process.env.TYPEORM_USERNAME,
  password: process.env.TYPEORM_PASSWORD,
  database: `${process.env.TYPEORM_DATABASE}_${env}`,
  synchronize: false,
  logging: Boolean(process.env.TYPEORM_LOGGING),
  entities: ['src/database/models/**/*.ts'],
  migrations: [
    process.env.IS_SEED ? 'src/database/seeds/**/*.ts' : 'src/database/migrations/**/*.ts'
  ],
  type: 'postgres'
}))

module.exports = envs
