const { ApolloServer } = require('apollo-server');
const {sequelize} = require('./models')

// A schema is a collection of type definitions (hence "typeDefs")
// that together define the "shape" of queries that are executed against
// your data.
const typeDefs = require('./graphql/typeDefs')

const resolvers = require('./graphql/resolvers')

const server = new ApolloServer({ typeDefs, resolvers, context: ctx => ctx });

  // The `listen` method launches a web server.
  server.listen().then(({ url }) => {
    console.log(`🚀  Server ready at ${url}`);

    sequelize.authenticate()
    .then(() => console.log('DB connected'))
    .catch(err => console.log(err.message))
  });