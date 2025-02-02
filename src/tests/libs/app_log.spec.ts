// someModule.ts

import { AppLog } from 'libs/app_log';

describe('AppLog', () => {
  it('should log debug messages', () => {
    const logger = AppLog.getInstance();
    const consoleSpy = jest.spyOn(console, 'debug').mockImplementation();

    logger.debug('This is a debug message');
    expect(consoleSpy).toHaveBeenCalledWith('[DEBUG]: This is a debug message');
  })

  it('should log info messages', () => {
    const logger = AppLog.getInstance();
    const consoleSpy = jest.spyOn(console, 'info').mockImplementation();

    logger.info('This is a info message');
    expect(consoleSpy).toHaveBeenCalledWith('[INFO]: This is a info message');
  })

  it('should log warn messages', () => {
    const logger = AppLog.getInstance();
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();

    logger.warn('This is a warn message');
    expect(consoleSpy).toHaveBeenCalledWith('[WARN]: This is a warn message');
  })

  it('should log error messages', () => {
    const logger = AppLog.getInstance();
    const consoleSpy = jest.spyOn(console, 'error').mockImplementation();

    logger.error('This is a error message');
    expect(consoleSpy).toHaveBeenCalledWith('[ERROR]: This is a error message');
  })
})
