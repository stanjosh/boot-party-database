require('dotenv').config();
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const forever = require('forever-monitor')


const PORT = process.env.PORT || 3001;
const app = express();
const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: authMiddleware,
  cache: 'bounded'
});

app.use(express.urlencoded({ extended: false }));
app.use(express.json());

if (process.env.NODE_ENV === 'production') {
  app.use(express.static(path.join(__dirname, '../client/dist/')));
}

app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../client/dist/index.html'));
});

const startApolloServer = async () => {
  await server.start();
  server.applyMiddleware({ app, path: '/graphql' });

  db.once('open', () => {
    app.listen(parseInt(PORT), () => {
      
      console.log(`Server ready at http://localhost:${PORT}${server.graphqlPath}`);
    })
  })
  };
  
  const child = new (forever.Monitor)('server.js', {
    max: 3,
    silent: true,
    args: []
  });
  
  child.on('exit', function () {
    console.log('server.js has exited after 3 restarts');
  });
  startApolloServer();

