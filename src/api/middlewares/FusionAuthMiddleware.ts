import { Request, Response, NextFunction } from 'express'
import { FORBIDDEN } from 'http-status-codes'
import { ExpressMiddlewareInterface, Middleware, HttpError } from 'routing-controllers'
import Container from 'typedi'

import envs from '@/config/envs'
import { UserRegistration, FusionAuthClient } from '@fusionauth/typescript-client'

import { FusionAuthService } from '~/services'

@Middleware({ type: 'before' })
export default class FusionAuthMiddleware implements ExpressMiddlewareInterface {
  private EXCLUDED_PATHS = ['/api/v1/status']

  public fusionAuthClient: FusionAuthClient

  constructor() {
    this.fusionAuthClient = Container.get(FusionAuthService).client
  }

  public async use(req: Request, res: Response, next: NextFunction) {
    if (this.EXCLUDED_PATHS.includes(req.path)) return next()

    const {
      response: {
        user: { registrations }
      }
    } = await this.fusionAuthClient.retrieveUserUsingJWT(req.headers.authorization)
    if (this.verifyUserRolePermission(registrations)) return next()

    throw new HttpError(FORBIDDEN, 'Forbidden')
  }

  public verifyUserRolePermission(registrations: UserRegistration[]): boolean {
    const applicationRegistration: UserRegistration = registrations.find(
      (registration) => registration.applicationId === envs.fusionAuth.applicationId
    )

    if (!applicationRegistration) return false
    const { roles } = applicationRegistration
    const rolesSet = new Set(roles)

    return rolesSet.has('api-user') || rolesSet.has('super-admin')
  }
}
