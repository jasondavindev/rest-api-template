import { Application } from 'express'
import path from 'path'
import { createExpressServer } from 'routing-controllers'

export default createExpressServer({
  cors: true,
  classTransformer: false,
  routePrefix: '/api',
  defaultErrorHandler: false,
  controllers: [`${path.resolve(__dirname, 'api', 'controllers')}/*.ts`],
  middlewares: [`${path.resolve(__dirname, 'api', 'middlewares')}/*.ts`]
}) as Application
