import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import { graphiqlExpress, graphqlExpress } from 'apollo-server-express'
import { makeExecutableSchema } from 'graphql-tools'
import mongoose from 'mongoose'

import typeDefs from './schema'
import resolvers from './resolvers'
import Deck from './models/decks'
import Game from './models/games'
import OppDeck from './models/oppdecks'
import MulliganWR from './models/mulligan_wr'
import Winrate from './models/winrates'
import Archetype from './models/archetypes'

const env = require('dotenv').config()

const schema = makeExecutableSchema({
  typeDefs,
  resolvers
})

mongoose.connect(
  `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${
    process.env.SERVER_ADDR
  }`
)

const PORT = process.env.PORT || 3333

const app = express()

app.use(
  '/graphql',
  cors(),
  bodyParser.json(),
  graphqlExpress({
    schema,
    context: {
      Archetype,
      Deck,
      Game,
      OppDeck,
      MulliganWR,
      Winrate
    }
  })
)

app.use('/graphiql', graphiqlExpress({ endpointURL: '/graphql' }))

app.listen(PORT)
