/* eslint-disable no-undef */
import 'reflect-metadata';
import * as winston from 'winston';
import { InversifyExpressServer } from 'inversify-express-utils';
import { mainContainer } from './modules';
import { config } from 'dotenv';
import { MiddlewareConfig } from './shared/middlewares/middlewareConfig';

import { CONFIG } from './config';

/** Load Envrionment Variables form .env file */
config();

/** Server */
const server = new InversifyExpressServer(mainContainer);
server.setConfig(app => {
  MiddlewareConfig.init(app);
});

const app = server.build();

app
  .listen(CONFIG.PORT, () =>
    console.log(`The server is running on port ${CONFIG.PORT}`)
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  .on('error', (error: any) => {
    if (error.code === 'EADDRINUSE') {
      console.log('server startup error: address already in use');
    } else {
      console.log(error);
    }
  });
process.on('beforeExit', function (err) {
  winston.error(JSON.stringify(err));
  console.error(err);
});
