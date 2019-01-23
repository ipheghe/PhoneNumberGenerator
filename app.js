import express from 'express';
import logger from 'morgan';
import http from 'http';

// Set up the express app
const app = express();

// Log requests to the console.
app.use(logger('dev'));

app.use(express.static(__dirname + '/build/'));

const port = parseInt(process.env.PORT, 10) || 8000;
app.set('port', port);

const server = http.createServer(app);
server.listen(port);

app.all('*', (req, res) => res.status(404).send({
  message: 'Oops! 404. Page not Found',
}));

export default app;
