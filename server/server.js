require('dotenv').config();
const path = require('path');
const express = require('express');
const { ApolloServer } = require('apollo-server-express');
const { authMiddleware } = require('./utils/auth');
const { typeDefs, resolvers } = require('./schemas');
const db = require('./config/connection');
const forever = require('forever-monitor')
// const insertNewEvent = require('./utils/googleCal');

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

// app.post('/api/calendar', async (req, res) => {
//   const { title, description, location, time } = req.body;
//   const dateTimeStart = new Date(time).toISOString();
//   const dateTimeEnd = new Date(new Date(time).setHours(new Date(time).getHours() + 3)).toISOString();
//   const event = {
//     'summary': title,
//     'location': location,
//     'description': description,
//     'start': {
//       'dateTime': dateTimeStart,
//       'timeZone': 'America/Chicago'
//     },
//     'end': {
//       'dateTime': dateTimeEnd,
//       'timeZone': 'America/Chicago'
//     },
//     'attendees': [
//       { 'email': '' }
//     ],
//     'reminders': {
//       'useDefault': false,
//       'overrides': [
//         { 'method': 'email', 'minutes': 24 * 60 },
//         { 'method': 'popup', 'minutes': 10 }
//       ]
//     }
//   }
//   insertNewEvent( event )
// })


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

