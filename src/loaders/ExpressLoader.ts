import { MicroframeworkSettings } from 'microframework-w3tec'

import App from '@/app'

export default (settings: MicroframeworkSettings | undefined): void => {
  if (settings) {
    settings.setData('app', App)

    if (process.env.NODE_ENV !== 'test') {
      App.listen(Number(process.env.NODE_PORT))
    }
  }
}
