import { ENABLE_LOGGING, LOG_LEVEL } from "@/lib/logger/config"

import type { LogLevel, LogMetadata } from "@/lib/logger/types"

const levels: Record<LogLevel, number> = {
  debug: 10,
  info: 20,
  warn: 30,
  error: 40,
}

const shouldLog = (level: LogLevel) => {
  return levels[level] >= levels[LOG_LEVEL as LogLevel]
}

const writeLog = (level: LogLevel, message: string, meta?: LogMetadata) => {
  if (!ENABLE_LOGGING) {
    return
  }

  if (!shouldLog(level)) {
    return
  }

  // Pretty logs for development
  if (process.env.NODE_ENV === "development") {
    const method =
      level === "error"
        ? console.error
        : level === "warn"
          ? console.warn
          : level === "debug"
            ? console.debug
            : console.info

    method(`[${level.toUpperCase()}] ${message}`, meta ?? "")

    return
  }

  // Structured JSON logs for production
  const payload = {
    level: level.toUpperCase(),
    timestamp: new Date().toISOString(),
    message,
    ...meta,
  }

  const output = JSON.stringify(payload)

  switch (level) {
    case "error":
      console.error(output)
      break

    case "warn":
      console.warn(output)
      break

    case "debug":
      console.debug(output)
      break

    default:
      console.info(output)
  }
}

const createLogger = (defaultMeta?: LogMetadata) => ({
  debug: (message: string, meta?: LogMetadata) =>
    writeLog("debug", message, {
      ...defaultMeta,
      ...meta,
    }),

  info: (message: string, meta?: LogMetadata) =>
    writeLog("info", message, {
      ...defaultMeta,
      ...meta,
    }),

  warn: (message: string, meta?: LogMetadata) =>
    writeLog("warn", message, {
      ...defaultMeta,
      ...meta,
    }),

  error: (message: string, meta?: LogMetadata) =>
    writeLog("error", message, {
      ...defaultMeta,
      ...meta,
    }),

  child: (meta: LogMetadata) =>
    createLogger({
      ...defaultMeta,
      ...meta,
    }),
})

export const logger = createLogger()
