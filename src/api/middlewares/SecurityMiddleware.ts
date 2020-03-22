import { Request, Response, NextFunction } from 'express'
import helmet from 'helmet'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export default class SecurityMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction) {
    return helmet()(req, res, next)
  }
}
