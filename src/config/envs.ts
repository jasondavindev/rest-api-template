export default {
  fusionAuth: {
    apiKey: process.env.FUSION_AUTH_API_KEY,
    host: process.env.FUSION_AUTH_HOST,
    applicationId: process.env.FUSION_AUTH_APPLICATION_ID
  },
  db: {
    host: process.env.TYPEORM_HOST,
    port: Number(process.env.TYPEORM_PORT),
    username: process.env.TYPEORM_USERNAME,
    password: process.env.TYPEORM_PASSWORD,
    database: process.env.TYPEORM_DATABASE,
    logging: Boolean(process.env.TYPEORM_LOGGING)
  }
}
