import express from 'express';
import path from 'path';

const __dirname = path.resolve();
const app = express();
const PORT = 3000;

app.use(express.static(`${__dirname}/dist`));

app.get('/*', (request, response) => {
  response.sendFile(`${__dirname}/dist/index.html`);
});

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}!`);
});
