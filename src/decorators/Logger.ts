import { Logger as WinstonLogger } from '@/lib/logger';

export function Logger(scope) {
  return (object: Record<string, any>, propertyName: string, index?: number) => {
    object[propertyName] = new WinstonLogger(scope);
  };
}

export { LoggerInterface } from '@/lib/logger';
