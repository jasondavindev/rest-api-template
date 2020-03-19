import { Request, Response } from 'express'
import { ExpressErrorMiddlewareInterface, HttpError, Middleware } from 'routing-controllers'

import { Logger, LoggerInterface } from '@/decorators/Logger'

@Middleware({ type: 'after' })
export default class ErrorHandlerMiddleware implements ExpressErrorMiddlewareInterface {
  private isProduction

  @Logger(__filename) private log: LoggerInterface

  constructor() {
    this.isProduction = process.env.NODE_ENV === 'production'
  }

  public error(error: HttpError, req: Request, res: Response): void {
    res.status(error.httpCode || 500)
    res.json({
      name: error.name,
      message: error.message
    })

    if (this.isProduction) {
      this.log.error(error.name, error.message)
    } else {
      this.log.error(error.name, error.stack)
    }
  }
}
