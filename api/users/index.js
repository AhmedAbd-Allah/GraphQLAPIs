const graphqlHTTP = require("express-graphql");
const { makeExecutableSchema } = require("graphql-tools");

const typeDefs = require("./schema").Schema;
const resolvers = require("./resolvers").Resolvers;

const schema = makeExecutableSchema({
  typeDefs,
  resolvers,
});

module.exports = graphqlHTTP(request => ({
  schema: schema,
  context: { user: request.session.user },
}));
