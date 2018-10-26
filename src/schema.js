export default `
scalar Date

type OppDeck {
  _id: String,
  name: String,
  charClass: String,
  archetypeId: Archetype,
  code: String,
  key_features: String,
  cards: [CardA]
}
type Archetype {
  _id: String,
  name: String,
  charClass: String,
  key_features: String
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
  opponentDeck: String,
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
  opponentDeckId: String,
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

input ArchetypeInput {
  name: String,
  charClass: String,
  key_features: String
}

input WinrateCardInput {
  cardId: String!
}

type Query {
  allArchetypes(
    _id: String,
    name: String,
    charClass: String,
    key_features: String
  ): [Archetype!]!,
  getArchetype(
    id: String!
  ): Archetype!,
  allOppDecks(
    _id: String,
    name: String,
    charClass: String,
    archetypeId: ArchetypeInput,
    code: String,
    key_features: String,
    cards: [Card]
  ): [OppDeck!]!,
  allWinrates(
    deckId: String,
    opponentDeckId: String,
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
  getOppDeck(
    id: String!
  ): OppDeck!,
  getOppDeckByClass(
    charClass: String!
  ): [OppDeck]!,
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
  createOppDeck(
    name: String!,
    charClass: String!,
    archetypeId: String!,
    code: String!,
    key_features: String!
  ): OppDeck!
  createGame(
    deckId: String!,
    opponentClass: String!,
    opponentArchetype: String!,
    outcome: String!
  ): Game!
  createArchetype(
    name: String!,
    charClass: String!,
    key_features: String
  ): Archetype!
  updateWinrate(
    deckId: String!,
    opponentClass: String!, 
    opponentArchetype: String!,
    outcome: String!,
    cards: [WinrateCardInput]
  ): Winrate!
}
`
