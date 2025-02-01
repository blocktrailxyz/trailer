/* eslint-disable @typescript-eslint/no-explicit-any */
export enum LogLevel {
  DEBUG = 0,
  INFO,
  WARN,
  ERROR
}

export class AppLog {
  private static instance: AppLog;
  private currentLevel: LogLevel;

  // Define the log level thresholds for each environment
  private static readonly DEV_LEVEL: LogLevel = LogLevel.DEBUG;
  private static readonly PROD_LEVEL: LogLevel = LogLevel.INFO;

  private constructor() {
    const env = process.env.NODE_ENV || 'development';
    // Set the current log level based on the environment
    this.currentLevel = env === 'production' ? AppLog.PROD_LEVEL : AppLog.DEV_LEVEL;
  }

  // Singleton instance accessor
  public static getInstance(): AppLog {
    if (!AppLog.instance) {
      AppLog.instance = new AppLog();
    }
    return AppLog.instance;
  }

  public debug(message: string, ...optionalParams: any[]): void {
    if (this.currentLevel <= LogLevel.DEBUG) {
      console.debug(`[DEBUG]: ${message}`, ...optionalParams);
    }
  }

  public info(message: string, ...optionalParams: any[]): void {
    if (this.currentLevel <= LogLevel.INFO) {
      console.info(`[INFO]: ${message}`, ...optionalParams);
    }
  }

  public warn(message: string, ...optionalParams: any[]): void {
    if (this.currentLevel <= LogLevel.WARN) {
      console.warn(`[WARN]: ${message}`, ...optionalParams);
    }
  }

  public error(message: string, ...optionalParams: any[]): void {
    if (this.currentLevel <= LogLevel.ERROR) {
      console.error(`[ERROR]: ${message}`, ...optionalParams);
    }
  }
}
