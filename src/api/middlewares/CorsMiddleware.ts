import cors from 'cors'
import { Request, Response, NextFunction } from 'express'
import { ExpressMiddlewareInterface, Middleware } from 'routing-controllers'

@Middleware({ type: 'before' })
export default class CorsMiddleware implements ExpressMiddlewareInterface {
  public use(req: Request, res: Response, next: NextFunction) {
    return cors()(req, res, next)
  }
}
