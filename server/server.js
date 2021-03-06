import bodyParser from 'body-parser';
import compression from 'compression';
import express from 'express';
import morgan from 'morgan';
import path from 'path';
import Loadable from 'react-loadable';
import cookieParser from 'cookie-parser';

import loader from './loader';

const app = express();
const PORT = process.env.PORT || 3000;

// NOTE: uncomment for this
/*
  Forcing www and https redirects in production, totally optional.
  http://mydomain.com
  http://www.mydomain.com
  https://mydomain.com
  Resolve to: https://www.mydomain.com
*/
// if (process.env.NODE_ENV === 'production') {
//   app.use(
//     forceDomain({
//       hostname: 'www.mydomain.com',
//       protocol: 'https'
//     })
//   );
// }

app.use(compression());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cookieParser());

app.use(express.Router().get('/', loader));
app.use(express.static(path.resolve(__dirname, '../build')));
app.use(loader);

Loadable.preloadAll().then(() => {
  app.listen(PORT, console.log(`App listening on port ${PORT}!`));
});

app.on('error', error => {
  if (error.syscall !== 'listen') {
    throw error;
  }

  const bind = typeof PORT === 'string' ? 'Pipe ' + PORT : 'Port ' + PORT;

  switch (error.code) {
    case 'EACCES':
      console.error(bind + ' requires elevated privileges');
      process.exit(1);
      break;
    case 'EADDRINUSE':
      console.error(bind + ' is already in use');
      process.exit(1);
      break;
    default:
      throw error;
  }
});
