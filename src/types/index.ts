import { HttpError } from 'routing-controllers'

import { UserResponse } from '@fusionauth/typescript-client'
import ClientResponse from '@fusionauth/typescript-client/build/src/ClientResponse'

export type GenericHttpError = HttpError & ClientResponse<UserResponse>
