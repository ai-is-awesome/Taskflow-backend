import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs } from "./schema.js";

import { MongoDataSource } from "./MongoDataSource.js";

const PORT = 3001;

const resolvers = {
  Query: {
    boards: async (_, __, context) => {
      console.log("context: ", context, context.datasources);
      return context.dataSources.db.getBoards();
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const { url } = await startStandaloneServer(server, {
  context: async () => {
    const { cache } = server;
    const token = null;
    return {
      dataSources: {
        db: new MongoDataSource({ cache, token }),
      },
      token,
    };
  },
  listen: { port: PORT },
});

console.log(`🚀  Server ready at: ${url}`);
