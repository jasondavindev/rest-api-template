import { createLogger as winstonCreateLogger, format, transports } from 'winston'

import { LogOptions, LoggerInterface } from './types'

const logFormat = () => format.printf(
  ({ level, message, stack }) => `[${new Date().toISOString()}] [${level}] ${message}${
    stack
      ? `
Stack: ${stack}`
      : ''
  }`
)

export function createLogger(): LoggerInterface {
  function createTransports() {
    const loggerTransports = []

    if (process.env.NODE_ENV !== 'production') loggerTransports.push(new transports.Console())
    if (process.env.NODE_ENV !== 'test') loggerTransports.push(new transports.File({ filename: 'application.log', level: 'error' }))

    return loggerTransports
  }

  function create() {
    return winstonCreateLogger({
      format: logFormat(),
      transports: createTransports()
    })
  }

  const logger = create()

  function log(options: LogOptions & { level: string }): void {
    logger.log(options)
  }

  function debug({ message }): void {
    log({ level: 'debug', message })
  }

  function info({ message }): void {
    log({ level: 'info', message })
  }

  function warn({ message }): void {
    log({ level: 'warn', message })
  }

  function error({ message, stack }): void {
    log({ level: 'error', message, stack })
  }

  return { debug, info, warn, error }
}

export default function Logger() {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return (object: Record<string, any>, propertyName: string) => {
    // eslint-disable-next-line no-param-reassign
    object[propertyName] = createLogger()
  }
}
