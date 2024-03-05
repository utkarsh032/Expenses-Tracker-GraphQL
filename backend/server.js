import express from 'express';
import http from 'http';
import cors from 'cors';
import dotenv from 'dotenv'

import passport from 'passport';
import session from 'express-session';
import ConnectMongo from 'connect-mongodb-session';

import { ApolloServer } from "@apollo/server";
import { expressMiddleware } from '@apollo/server/express4';
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';

import mergedTypeDefs from './typeDefs/index.js';
import mergedResolvers from './resolvers/index.js';
import { configuePassport } from './passport/passport.config.js';

import { connectDB } from './db/connectDB.js';
import { buildContext } from 'graphql-passport';

const app = express();
dotenv.config()
configuePassport()

const httpServer = http.createServer(app);

const MongoDBStore = ConnectMongo(session)

const store = new MongoDBStore({
  uri: process.env.MONGODB_URI,
  collection: 'session',
})

store.on('error', err => console.log(err))

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      maxAge: 1000 * 60 * 60 * 24 * 7,
      httpOnly: true
    },
    store: store
  })
)

app.use(passport.initialize())
app.use(passport.session())

const server = new ApolloServer({
  typeDefs: mergedTypeDefs,
  resolvers: mergedResolvers,
  plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
});

await server.start();


app.use(
  '/',
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
  express.json(),
  expressMiddleware(server, {
    context: async ({ req, res }) => buildContext({ req, res }),
  }),
);

// Modified server startup
await new Promise((resolve) => httpServer.listen({ port: 4000 }, resolve));
await connectDB()

console.log(`🚀 Server ready at http://localhost:4000/`);