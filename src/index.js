const express = require('express');
const middlewares = require('./middlewares');
const routes = require('./routes');

const app = express();
app.use(express.json());

// não remova esse endpoint, e para o avaliador funcionar
app.get('/', (request, response) => {
  response.send();
});

app.use('/user', routes.user);
app.use('/login', routes.login);
app.use('/categories', routes.categories);
app.use('/post', routes.post);

app.use(middlewares.error);

const { PORT = 3000 } = process.env;

app.listen(PORT, () => console.log(`ouvindo porta ${PORT}!`));
