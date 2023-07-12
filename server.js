import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import {
  startServerAndCreateLambdaHandler,
  handlers,
} from "@as-integrations/aws-lambda";

import { typeDefs, resolvers } from "./schema.js";

import { MongoDataSource } from "./MongoDataSource.js";

const PORT = 3001;

// const typeDefs = `#graphql
//   type Query {
//     hello: String
//   }
// `;

// const resolvers = {
//   Query: {
//     hello: () => "world",
//   },
// };

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// const { url } = await startStandaloneServer(server, {
//   context: async () => {
//     const { cache } = server;
//     const token = null;
//     return {
//       dataSources: {
//         db: new MongoDataSource({ cache, token }),
//       },
//       token,
//     };
//   },
//   listen: { port: PORT },
// });

// console.log(`🚀  Server ready at: ${url}`);

export const graphqlHandler = startServerAndCreateLambdaHandler(
  server,
  // We will be using the Proxy V2 handler
  handlers.createAPIGatewayProxyEventV2RequestHandler(),
  {
    context: async () => {
      const { cache } = server;
      return {
        dataSources: {
          db: new MongoDataSource(cache, null),
        },
      };
    },
  }
);
