import { Service } from 'typedi'

import envs from '@/config/envs'
import { FusionAuthClient } from '@fusionauth/typescript-client'

@Service()
export default class FusionAuthService {
  public client: FusionAuthClient

  constructor() {
    this.client = new FusionAuthClient(envs.fusionAuth.apiKey, envs.fusionAuth.host)
  }
}
