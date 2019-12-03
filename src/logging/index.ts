import * as bunyan from 'bunyan';
import { LoggingBunyan } from '@google-cloud/logging-bunyan';

const loggingBunyan = new LoggingBunyan();

const logger = bunyan.createLogger({
    name: 'memedir_ws',
    streams: [
        { stream: process.stdout, level: 'info'},
        loggingBunyan.stream('info')
    ]
});

export default logger;