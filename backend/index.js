const { gql, ApolloServer } = require("apollo-server-lambda");
const AWS = require("aws-sdk");
const { v4: uuid } = require("uuid");

const DB = new AWS.DynamoDB.DocumentClient();
const identityProvider = new AWS.CognitoIdentityServiceProvider();
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
    tasks: async (_, __, { userId }) => {
      const { Items } = await DB.query({
        TableName,
        KeyConditionExpression: "userId = :userId",
        ExpressionAttributeValues: { ":userId": userId },
        ScanIndexForward: false, // newest items first
      }).promise();
      return Items;
    },
  },
  Mutation: {
    createTask: async (_, { description }, { userId }) => {
      const Item = {
        userId,
        id: Date.now() + uuid(), // id is sort key, this allows us to sort chronologically
        completed: false,
        description,
      };
      await DB.put({ TableName, Item }).promise();
      return Item;
    },
    updateTask: async (_, { id, completed, description }, { userId }) => {
      const { Item } = await DB.get({
        TableName,
        Key: {
          userId,
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
    deleteTask: async (_, { id }, { userId }) => {
      const { Item } = await DB.get({
        TableName,
        Key: {
          userId,
          id,
        },
      }).promise();
      await DB.delete({
        TableName,
        Key: {
          userId,
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
  context: async ({ event }) => {
    const AccessToken = event.headers.Authorization;
    const { Username } = await identityProvider
      .getUser({ AccessToken })
      .promise();
    return { userId: Username };
  },
  playground: {
    endpoint: `/${process.env.stage}/graphql`,
  },
  introspection: true,
});

export const handler = server.createHandler({
  cors: { origin: true, credentials: true },
});
