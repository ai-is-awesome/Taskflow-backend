import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";

import { typeDefs, resolvers } from "./schema.js";

import { MongoDataSource } from "./MongoDataSource.js";

const PORT = 3001;

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
