import express from 'express';
import routes from './routes'
import requestContext from './middleware/request-context'

const app = express();
const port = 3000;

app.use(requestContext)
app.use(routes)

app.listen(port, () => {
  return console.log(`Express is listening at http://localhost:${port}`);
});