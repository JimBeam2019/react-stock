const { ApolloServer } = require('apollo-server');
const { makeExecutableSchema } = require('@graphql-tools/schema');

const logger = require('./config/logger');
const typeDefs = require('./schema');
const resolvers = require('./resolvers');
const Init = require('./config/init');
// const DbEvent = require('./event/DbEvent');
// const InitModel = require('./model/database/InitModel');

const server = new ApolloServer({
  schema: makeExecutableSchema({
    typeDefs,
    resolvers,
  }),
});

server.listen().then(({ url }) => {
  const app = new Init();
  app.initApp();

  logger.info(`🚀 Server ready at ${url}`);
});
