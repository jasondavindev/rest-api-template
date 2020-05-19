import { Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, Middleware } from 'routing-controllers'

import { Logger, LoggerInterface } from '@/decorators/logger'
import { GenericHttpError } from '@/types'

@Middleware({ type: 'after' })
export default class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  @Logger() private logger: LoggerInterface

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

    this.logger.error({ message: message || exception.message, stack: stack || exception.stack })
  }
}
