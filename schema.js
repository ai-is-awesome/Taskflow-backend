export const typeDefs = `#graphql

  type Board {
    name: String,
    lists: [List]
  }

  type List {
    name : String
  }
  type Query {
    boards: [Board]
  }
`;
