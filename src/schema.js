export default `
scalar Date

type Archetype {
  _id: String
  name: String
  charClass: String
  code: String,
  key_features: String,
  cards: [CardA]
}
type CardA {
  cost: Int, 
  count: Int,
  dbfId: Int, 
  id: String, 
  name: String, 
  type: String
}
type Game {
  _id: String,
  deckId: String,
  datetime: Date,
  opponentClass: String,
  opponentArchetype: String,
  outcome: String
}
type WinrateCard {
  cardId: String,
  wins: Int,
  losses: Int
}
type Winrate {
  _id: String,
  deckId: String,
  opponentArchetypeId: String,
  opponentClass: String,
  wins: Int,
  losses: Int,
  games: Int,
  cards: [WinrateCard]
}
type Deck {
  _id: String,
  name: String,
  charClass: String,
  code: String
}

input Card {
  cost: Int,
  count: Int!, 
  dbfId: Int!, 
  id: String!, 
  name: String!, 
  type: String!
}

input WinrateCardInput {
  cardId: String!
}

type Query {
  allArchetypes(
    _id: String,
    name: String,
    charClass: String,
    code: String,
    key_features: String,
    cards: [Card]
  ): [Archetype!]!,
  allWinrates(
    deckId: String,
    opponentArchetypeId: String,
    opponentClass: String,
    wins: Int,
    losses: Int,
    games: Int,
    cards: [WinrateCardInput]
  ): [Winrate!]!,
  getWinratesByClass(
    deckId: String,
    opponentClass: String
  ): [Winrate!]!,
  getArchetype(
    id: String!
  ): Archetype!,
  getArchetypeByClass(
    charClass: String!
  ): [Archetype]!,
  allDecks(
    name: String,
    charClass: String,
    code: String
  ): [Deck!]!,
  getDeck(
    id: String!
  ): Deck!
}

type Mutation {
  createArchetype(
    name: String!,
    charClass: String!,
    code: String!,
    key_features: String!
  ): Archetype!
  createGame(
    deckId: String!,
    opponentClass: String!,
    opponentArchetype: String!,
    outcome: String!
  ): Game!
  updateWinrate(
    deckId: String!,
    opponentClass: String!, 
    opponentArchetype: String!,
    outcome: String!,
    cards: [WinrateCardInput]
  ): Winrate!
}
`
