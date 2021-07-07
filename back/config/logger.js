const winston = require("winston");
const DailyRotateFile = require("winston-daily-rotate-file");
const { omit } = require("lodash");

const { timestamp, combine, printf, colorize } = winston.format;

// Rotate a log file per minute
const transport = new DailyRotateFile({
  dirname: `${process.env.PWD}/logs/`,
  filename: "order--%DATE%.log",
  // frequency: '1h',
  datePattern: "YYYY-MM-DDTHH-mm",
  prepend: true,
  localTime: true,
  level: "info",
  maxSize: "2m",
  maxFiles: "14d",
  colorize: true,
});

const logger = winston.createLogger({
  transports: [transport],
  exitOnError: false,
});

const customFormat = printf(
  (info) =>
    `${info.timestamp} [${info.level}]${
      info.durationMs ? ` [${info.durationMs} ms] ` : ""
    } ${info.message} ${JSON.stringify(
      omit(info, ["message", "level", "timestamp", "durationMs"])
    )}`
);

logger.add(
  new winston.transports.Console({
    format: combine(colorize(), timestamp(), customFormat),
    level: "debug",
  })
);

module.exports = logger;
