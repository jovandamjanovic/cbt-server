const { ApolloServer, gql } = require('apollo-server-express')
const { User } = require('./models.js');
const bcrypt = require('bcrypt');
const jsonwebtoken = require('jsonwebtoken');
require('dotenv').config;

const typeDefs = gql`
      type User {
        id: Int!
        username: String!
        email: String!
        password: String!
        entries: [Entry]
      }

      type Entry {
        user: User!
        dateTime: String!
        event: String!
        evaluation: String!
        emotion: String!
        alternative: String!
        alternativeEmotion: String!
      }

      type Query {
        me: User
        users: [User]
      }

      type Mutation {
        signup (username: String!, email: String!, password: String!): String
        login (email: String!, password: String!): String
      }
    `

const resolvers = {
    Query: {
        async me(_, args, { user }) {
            if (!user) {
                throw new Error('You are not authenticated');
            }
            return await User.findOne({ email: user.email });
        },
        async users(_, args) {
            return await User.find({});
        }
    },
    Mutation: {
        async signup(_, { username, email, password }) {
            try {
                const user = await User.create({
                    username,
                    email,
                    password: await bcrypt.hash(password, 10)
                })
                return jsonwebtoken.sign({ id: user.id, email: user.email }, 'amoderatelylongjwtsecret', { expiresIn: '1d' });
            } catch (error) {
                console.log(error);
            }
            return "User not created";
        },
        async login(_, { email, password }) {
            const user = await User.findOne({ email: email });
            if (!user) {
                throw new Error('No user with that email!');
            }
            const valid = await bcrypt.compare(password, user.password);
            if (!valid) {
                throw new Error('Incorrect password!');
            }
            return jsonwebtoken.sign({ id: user.id, email: user.email }, 'amoderatelylongjwtsecret', { expiresIn: '1d' });
        }
    }
}

const server = new ApolloServer({
    typeDefs: typeDefs,
    resolvers: resolvers,
    playground: {
        endpoint: `http://localhost:3000/graphql`,
        settings: {
            'editor.theme': 'dark'
        }
    },
    context: ({ req, res }) => {
        let token = "";
        if (req.headers.authorization) {
            token = req.headers.authorization.split(' ')[1];
        }
        if(token !== "") {
            try {
                userEmail = jsonwebtoken.verify(token, 'amoderatelylongjwtsecret').email;
                return {
                    user: { email: userEmail }
                }
            } catch (error) {
                return {};
            }
        }
    }
})

module.exports = { server };

// module.exports = { typeDefs, resolvers }