import { Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'

import { Logger, LoggerInterface } from '@/decorators/Logger'
import { GenericHttpError } from '@/types'

@Middleware({ type: 'after' })
export default class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  private isProduction: boolean

  @Logger(__filename) private log: LoggerInterface

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
  }

  public error(
    { httpCode, statusCode, exception, message, stack, name }: GenericHttpError,
    _req: Request,
    res: Response
  ): void {
    res.status(httpCode || statusCode || 500)
    res.json({
      name: name || exception.name,
      message: message || exception.message
    })

    if (this.isProduction) {
      this.log.error(name || exception.name, message || exception.message)
    } else {
      this.log.error(name || exception.name, message || exception.message, stack || exception.stack)
    }
  }
}
