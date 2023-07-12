export const typeDefs = `#graphql

  type Board {
    _id: String,
    name: String,
    lists: [List]
  }

  type List {
    name : String
    _id: String
    items: [Item]
  }

  type Query {
    boards: [Board]
    getBoardData(boardId: String!) : Board
  }

  type Item {
    title: String
    description: String
    _id: String
    Items: String
  }

  type Mutation {
    createBoard(name: String!): Board
    createList(payload: createListPayload): List
    createItem(payload: createItemPayload) : Item    
  }

  input createListPayload {
    name: String!,
    boardId: String!    
  }

  input createItemPayload {
    title: String!,
    listId: String!
  }
`;

export const resolvers = {
  Board: {
    lists: async (parent, args, context) => {
      const listIds = parent.lists;
      console.log("Fetching lists for board: ", parent.name);
      return await context.dataSources.db.getListsFromIds(listIds);
    },
  },
  List: {
    items: async (parent, args, context) => {
      return [{ title: "Example Title, yet to hook fetch function" }];
    },
  },

  Query: {
    boards: async (_, __, context) => {
      return context.dataSources.db.getBoards();
    },

    getBoardData: async (_, args, context) => {
      return context.dataSources.db.getBoardData(args.boardId);
    },
  },
  Mutation: {
    createBoard: async (_, args, context) => {
      const payload = { name: args.name };
      console.log("Context: ", context);
      return context.dataSources.db.createBoard(payload);
    },

    createList: async (_, args, context) => {
      console.log(args);
      return await context.dataSources.db.createList(args.payload);
    },

    createItem: async (_, args, context) => {
      return await context.dataSources.db.createItem(args.payload);
    },
  },
};
