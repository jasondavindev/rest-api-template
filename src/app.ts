import { Application } from 'express'
import path from 'path'
import { createExpressServer } from 'routing-controllers'

export const App: Application = createExpressServer({
  cors: true,
  classTransformer: false,
  routePrefix: '/api',
  defaultErrorHandler: false,
  controllers: [`${path.resolve(__dirname, 'api', 'controllers')}/*.ts`],
  middlewares: [`${path.resolve(__dirname, 'api', 'middlewares')}/*.ts`]
})
