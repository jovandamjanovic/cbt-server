const express               = require('express');
const { ApolloServer, gql } = require('apollo-server-express');
require('./config');
const { Entry } = require('./models');

const typeDefs = gql`
    type Entry {
        event: String
        evaluation: String
        emotion: String
        alternative: String
        alternativeEmotion: String
    }

    type Query {
        getEntries: [Entry]
    }

    type Mutation {
        addEntry(event: String!, evaluation: String!, emotion: String!, alternative: String!, alternativeEmotion: String!): Entry
    }
`;

const resolvers = {
    Query: {
        getEntries: async () => await Entry.find({}).exec()
    },
    Mutation: {
        addEntry: async(_, args) => {
            try {
                let response = await Entry.create(args);
                return response;
            } catch (e) {
                return e.message;
            }
        }
    }
};

const server = new ApolloServer({ typeDefs, resolvers });
const app = express();
server.applyMiddleware({ app });

app.listen({ port: 4000 }, () =>
  console.log(`🚀 Server ready at http://localhost:4000${server.graphqlPath}`)
);