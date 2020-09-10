const PORT = process.env.PORT || 3000;

const express = require("express");
const pg = require("pg");
const { ApolloServer, gql } = require("apollo-server-express");

const db = new pg.Pool({ connectionString: process.env.DATABASE_URL });

db.query(`
  CREATE TABLE IF NOT EXISTS tasks(
    id SERIAL PRIMARY KEY,
    description VARCHAR(128) NOT NULL,
    completed BOOLEAN NOT NULL DEFAULT FALSE
  );    
`);

// Construct a schema, using GraphQL schema language
const typeDefs = gql`
  type Task {
    id: Int!
    description: String!
    completed: Boolean!
  }
  type Query {
    tasks: [Task]!
  }
  type Mutation {
    createTask(description: String!): Task!
    updateTask(id: Int!, completed: Boolean, description: String): Task!
  }
`;

// Provide resolver functions for your schema fields
const resolvers = {
  Query: {
    tasks: async () => {
      const result = await db.query(`SELECT * FROM tasks ORDER BY id DESC;`);
      return result.rows;
    },
  },
  Mutation: {
    createTask: async (_, { description }) => {
      const result = await db.query(
        `INSERT INTO tasks (description) VALUES ($1) RETURNING *;`,
        [description]
      );
      return result.rows[0];
    },
    updateTask: async (_, { id, completed, description }) => {
      let column, value;
      if (completed !== undefined) {
        column = "completed";
        value = completed;
      }
      if (description !== undefined) {
        column = "description";
        value = description;
      }
      const result = await db.query(
        `UPDATE tasks SET ${column} = $1 WHERE id = $2 RETURNING *;`,
        [value, id]
      );
      return result.rows[0];
    },
  },
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.use(express.json());
app.use(express.static("dist"));

// Update something about a specific task
app.patch("/tasks/:id", async (request, response) => {
  const taskId = Number(request.params.id);
  const [column, value] = Object.entries(request.body)[0];
  const approvedColumns = ["description", "completed"];
  if (!approvedColumns.includes(column)) {
    return response.status(406).json({ error: "DO NOT HACK US" });
  }
  const result = await db.query(
    `UPDATE tasks SET ${column} = $1 WHERE id = $2 RETURNING *;`,
    [value, taskId]
  );
  if (result.rows.length > 0) {
    response.json(result.rows[0]);
  } else {
    response.status(404).json({ error: "no such task" });
  }
});

// Delete a specific task
app.delete("/tasks/:id", async (request, response) => {
  const taskId = Number(request.params.id);
  const result = await db.query(
    `DELETE FROM tasks WHERE id = $1 RETURNING *;`,
    [taskId]
  );
  if (result.rows.length > 0) {
    response.json(result.rows[0]);
  } else {
    response.status(404).json({ error: "no such task" });
  }
});

app.listen({ port: PORT }, () =>
  console.log(
    `Server is up and running at port ${PORT}, ${server.graphqlPath} 🚀`
  )
);
