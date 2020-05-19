export interface LogOptions {
  message: string
  stack?: string
}

export interface LoggerInterface {
  debug(options: LogOptions): void
  info(options: LogOptions): void
  warn(options: LogOptions): void
  error(options: LogOptions): void
}
