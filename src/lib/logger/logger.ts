/* eslint-disable @typescript-eslint/no-explicit-any */
import * as path from 'path'
import * as winston from 'winston'

export default class Logger {
  public static DEFAULT_SCOPE = 'app'

  private static parsePathToScope(filepath: string): string {
    if (filepath.indexOf(path.sep) >= 0) {
      return filepath
        .replace(process.cwd(), '')
        .replace(`${path.sep}src${path.sep}`, '')
        .replace(`${path.sep}dist${path.sep}`, '')
        .replace('.ts', '')
        .replace('.js', '')
        .replace(path.sep, ':')
    }

    return filepath
  }

  private scope: string

  constructor(scope?: string) {
    this.scope = Logger.parsePathToScope(scope || Logger.DEFAULT_SCOPE)
  }

  public debug(message: string, ...args: any[]): void {
    this.log('debug', message, args)
  }

  public info(message: string, ...args: any[]): void {
    this.log('info', message, args)
  }

  public warn(message: string, ...args: any[]): void {
    this.log('warn', message, args)
  }

  public error(message: string, ...args: any[]): void {
    this.log('error', message, args)
  }

  private log(level: string, message: string, args: any[]): void {
    if (winston) {
      winston[level](`${this.formatScope()} ${message}`, args)
    }
  }

  private formatScope(): string {
    return `[${this.scope}]`
  }
}
