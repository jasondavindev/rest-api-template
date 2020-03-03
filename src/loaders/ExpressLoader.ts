import { Application } from 'express';
import { MicroframeworkSettings } from 'microframework-w3tec';
import path from 'path';
import { createExpressServer } from 'routing-controllers';

/** Middlewares */
import { CompressionMiddleware } from '~/middlewares/CompressionMiddleware';
import { CorsMiddleware } from '~/middlewares/CorsMiddleware';
import { ErrorHandlerMiddleware } from '~/middlewares/ErrorHandlerMiddleware';
import { RateLimitMiddleware } from '~/middlewares/RateLimitMiddleware';
import { SecurityMiddleware } from '~/middlewares/SecurityMiddleware';

export default (settings: MicroframeworkSettings | undefined): void => {
  if (settings) {
    const app: Application = createExpressServer({
      cors: true,
      classTransformer: false,
      routePrefix: '/api',
      defaultErrorHandler: false,
      controllers: [`${path.resolve(__dirname, '..', 'api', 'controllers')}/*.ts`],
      middlewares: [
        RateLimitMiddleware,
        SecurityMiddleware,
        CorsMiddleware,
        CompressionMiddleware,
        ErrorHandlerMiddleware
      ]
    });

    app.listen(3000);
  }
};
