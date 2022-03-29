import winston from "winston";
import { Loggly, flushLogsAndExit, LogglyOptions } from "winston-loggly-bulk";

function createLogger(
  options?: winston.LoggerOptions,
  logglyOptions?: Partial<LogglyOptions>,
) {
  const logger = winston.createLogger(options);

  if (!process.env.WINSTON_LOGGLY_TOKEN || !logglyOptions?.token)
    throw new Error("WINSTON_LOGGLY_TOKEN is not set");

  logger.add(
    new Loggly({
      token: process.env.WINSTON_LOGGLY_TOKEN,
      subdomain: "netelsoft",
      json: true,
      bufferOptions: {
        size: 1000,
        retriesInMilliseconds: 5000,
      },
      ...logglyOptions,
    })
  );

  return logger;
}

export default { createLogger, flushLogsAndExit };
