import { Request, Response, NextFunction } from 'express'
import rateLimit from 'express-rate-limit'
import { Middleware, ExpressMiddlewareInterface } from 'routing-controllers'

const limiter = rateLimit({ max: 100, windowMs: 5 * 60 * 1000 })

@Middleware({ type: 'before' })
export default class RateLimitMiddleware implements ExpressMiddlewareInterface {
  use(req: Request, res: Response, next: NextFunction): void {
    limiter(req, res, next)
  }
}
