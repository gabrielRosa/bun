import pino, { type Logger as PinoInstance, type TransportTargetOptions } from 'pino';

class Logger {
  private static instance: PinoInstance;

  private constructor() {}

  public static getInstance(): PinoInstance {
    if (!Logger.instance) {
      const isDevelopment = Bun.env.NODE_ENV === 'development';
      
      const targets: TransportTargetOptions[] = [];

      targets.push({
        target: 'pino-loki',
        options: {
          batching: true,
          host: Bun.env.LOKI_HOST || 'http://localhost:3100',
          labels: { service: 'events-backend' },
        },
      });

      if (isDevelopment) {
        targets.push({
          target: 'pino-pretty',
          options: {
            colorize: true,
            ignore: 'pid,hostname',
            translateTime: 'SYS:standard',
          },
        });
      }

      Logger.instance = pino({
        level: Bun.env.LOG_LEVEL || 'info',
        base: {
          app: 'events-api',
          env: Bun.env.NODE_ENV,
        },
        transport: { targets },
      });
    }

    return Logger.instance;
  }
}

export const logger = Logger.getInstance();