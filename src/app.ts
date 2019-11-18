import * as express from 'express';

import errorhandler from './middleware/error-handler';
import routes from './routes';

const prefix = '';
const app = express();

app.use(`${prefix}/`, routes);

app.use(errorhandler());

export default app;
