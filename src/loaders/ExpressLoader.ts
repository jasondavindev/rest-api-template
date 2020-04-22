import 'dotenv/config'
import { Application } from 'express'
import path from 'path'
import { createExpressServer } from 'routing-controllers'

export default (): Application => {
  const app = createExpressServer({
    cors: true,
    classTransformer: false,
    validation: true,
    routePrefix: '/api',
    defaultErrorHandler: false,
    controllers: [`${path.resolve(__dirname, '..', 'api', 'controllers')}/*.ts`],
    middlewares: [`${path.resolve(__dirname, '..', 'api', 'middlewares')}/*.ts`]
  })

  if (process.env.NODE_ENV !== 'test') {
    app.listen(3000)
  }

  return app
}
