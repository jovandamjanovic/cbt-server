const express = require('express')
const { server } = require('./data/schema')
const jwt = require('express-jwt');
require('./config.js');

const auth = jwt({
  secret: 'amoderatelylongjwtsecret',
  credentialsRequired: false
})

const app = express()

const PORT = 3000

// app.use('/api', bodyParser.json(), auth, graphqlExpress(req => ({
//   schema,
  // context: {
  //   user: req.user
  // }
// }))
// )

app.use(auth);

server.applyMiddleware({
  app: app
})

app.listen(PORT, () => {
  console.log(`The server is running on http://localhost:${PORT}/graphql`)
})