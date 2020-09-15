const { gql, ApolloServer } = require("apollo-server-lambda");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");

const DB = new AWS.DynamoDB.DocumentClient();
const TableName = process.env.tableName;

const typeDefs = gql`
  type Task {
    id: String!
    userId: String!
    description: String!
    completed: Boolean!
  }
  type Query {
    tasks: [Task]!
  }
  type Mutation {
    createTask(description: String!): Task!
    updateTask(id: String!, completed: Boolean, description: String): Task!
    deleteTask(id: String!): Task!
  }
`;

const resolvers = {
  Query: {
    tasks: async () => {
      const { Items } = await DB.query({
        TableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": "NotARealUser" },
        ScanIndexForward: false, // newest items first
      }).promise();
      return Items;
    },
  },
  Mutation: {
    createTask: async (_, { description }) => {
      const Item = {
        userId: "NotARealUser",
        id: Date.now() + uuid(), // id is sort key, this allows us to sort chronologically
        completed: false,
        description,
      };
      await DB.put({ TableName, Item }).promise();
      return Item;
    },
    updateTask: async (_, { id, completed, description }) => {
      const { Item } = await DB.get({
        TableName,
        Key: {
          userId: "NotARealUser",
          id,
        },
      }).promise();
      if (completed !== undefined) {
        Item.completed = completed;
      }
      if (description !== undefined) {
        Item.description = description;
      }
      await DB.put({ TableName, Item }).promise();
      return Item;
    },
    deleteTask: async (_, { id }) => {
      const { Item } = await DB.get({
        TableName,
        Key: {
          userId: "NotARealUser",
          id,
        },
      }).promise();
      await DB.delete({
        TableName,
        Key: {
          userId: "NotARealUser",
          id,
        },
      }).promise();
      return Item;
    },
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
  playground: {
    endpoint: `/${process.env.stage}/graphql`,
  },
  introspection: true,
});

export const handler = server.createHandler({
  cors: { origin: true, credentials: true },
});
