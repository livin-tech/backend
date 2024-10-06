import pino from "pino";

const logger = pino({
  transport: {
    target: "pino-pretty", // Optional: for pretty-printing in development
    options: {
      colorize: true,
    },
  },
});

export default logger;
