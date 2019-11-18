import * as http from 'http';
import * as dotenv from 'dotenv';

import app from './app';
import * as database from './models';

dotenv.config();

export default (async () => {
  try {
    // Connect your desired database
    await database.connect();

    const port = process.env.PORT || '8080';
    app.set('port', port);

    const server = http.createServer(app);
    server.listen(port, () => console.log(`Started application on port ${port}`));

    return server;
  } catch (error) {
    console.error(error.message);

    process.exit(1);
  }
})();