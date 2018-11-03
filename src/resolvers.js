import { GraphQLScalarType } from 'graphql'
import { Kind } from 'graphql/language'
import { findIndex as _findIndex } from 'lodash'
import { fetchAllCards, fetchDeckCards } from './helpers'
import 'regenerator-runtime/runtime'
import util from 'util'

export default {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value) // value from the client
    },
    serialize(value) {
      return value.getTime() // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return parseInt(ast.value, 10) // ast value is always in string format
      }
      return null
    }
  }),

  Query: {
    allArchetypes: async (parent, args, { Archetype }) => {
      const archetypes = await Archetype.find(args)
      return archetypes.map(x => {
        x._id = x._id.toString()
        return x
      })
    },
    getArchetype: async (parent, args, { Archetype }) => {
      const archetype = await Archetype.findById(args.id)
      return archetype
    },
    allOppDecks: async (parent, args, { OppDeck }) => {
      const oppDecks = await OppDeck.find(args).populate('archetypeId')
      const cardsDataReq = fetchDeckCards()
      return cardsDataReq
        .then(res => {
          return res.json()
        })
        .then(data => {
          return oppDecks.map(x => {
            x._id = x._id.toString()
            x.cards = fetchAllCards(x.code, data)
            return x
          })
        })
        .catch(e => console.log(e))
    },
    getOppDeck: async (parent, args, { OppDeck }) => {
      const oppDeck = await OppDeck.findById(args.id).populate('archetypeId')
      return oppDeck
    },
    getOppDeckByClass: async (parent, args, { OppDeck }) => {
      const oppDecks = await OppDeck.find(args)
      return oppDecks.map(x => {
        x._id = x._id.toString()
        return x
      })
    },
    allWinrates: async (parent, args, { Winrate }) => {
      const winrates = await Winrate.find(args)
      return winrates.map(x => {
        x._id = x._id.toString()
        return x
      })
    },
    getWinratesByClass: async (parent, args, { Winrate }) => {
      const winrates = await Winrate.find(args)
      return winrates.map(x => {
        x._id = x._id.toString()
        return x
      })
    },
    allDecks: async (parent, args, { Deck }) => {
      const decks = await Deck.find(args)
      return decks.map(x => {
        x._id = x._id.toString()
        return x
      })
    },
    getDeck: async (parent, args, { Deck }) => {
      const deck = await Deck.findById(args.id)
      return deck
    }
  },
  Mutation: {
    createOppDeck: async (parent, args, { OppDeck }) => {
      const oppDeck = await new OppDeck(args).save()
      oppDeck._id = oppDeck._id.toString()
      return oppDeck
    },
    updateOppDeck: async (parent, args, { OppDeck }) => {
      const oppDeck = await OppDeck.findById(args.id)
      oppDeck.name = args.name
      oppDeck.code = args.code
      oppDeck.archetypeId = args.archetypeId
      oppDeck.key_features = args.key_features
      oppDeck.charClass = args.charClass
      return oppDeck.save()
    },
    createArchetype: async (parent, args, { Archetype }) => {
      const archetype = await new Archetype(args).save()
      archetype._id = archetype._id.toString()
      return archetype
    },
    updateArchetype: async (parent, args, { Archetype }) => {
      const archetype = await Archetype.findById(args.id)
      archetype.name = args.name
      archetype.key_features = args.key_features
      archetype.charClass = args.charClass
      return archetype.save()
    },
    createGame: async (parent, args, { Game }) => {
      const game = await new Game(args).save()
      game._id = game._id.toString
      return game
    },
    // createMulliganWR: async (parent, args, { MulliganWR }) => {
    //   const mulliganWr = await new MulliganWR(args).save()
    //   mulliganWr._id = mulliganWr._id.toString
    //   return mulliganWr
    // },
    updateWinrate: async (parent, args, { Winrate }) => {
      let winrate = await Winrate.findOne({
        deckId: args.deckId,
        opponentDeckId: args.opponentDeck
      })
      if (!winrate) {
        winrate = await new Winrate({
          deckId: args.deckId,
          opponentDeckId: args.opponentDeck,
          opponentClass: args.opponentClass,
          games: 0,
          wins: 0,
          losses: 0
        }).save()
      }
      const params = {
        games: winrate.games + 1,
        cards: winrate.cards
      }

      args.cards.forEach(card => {
        const existingIndex = _findIndex(params.cards, { cardId: card.cardId })
        if (existingIndex >= 0) {
          if (args.outcome === 'victory') {
            params.cards[existingIndex].wins =
              params.cards[existingIndex].wins + 1
          } else {
            params.cards[existingIndex].losses =
              params.cards[existingIndex].losses + 1
          }
        } else {
          params.cards.push({
            cardId: card.cardId,
            wins: args.outcome === 'victory' ? 1 : 0,
            losses: args.outcome === 'defeat' ? 1 : 0
          })
        }
      })
      args.outcome === 'victory'
        ? (params.wins = winrate.wins + 1)
        : (params.losses = winrate.losses + 1)

      winrate.set(params)
      await winrate.save()
      return winrate
    }
    // upvoteArchetype: async (parent, args, { Archetype }) => {
    //   const archetype = await Archetype.findById(args.id)
    //   archetype.set({ votes: archetype.votes ? archetype.votes + 1 : 1 })
    //   await archetype.save()
    //   return archetype
    // }
  }
}
