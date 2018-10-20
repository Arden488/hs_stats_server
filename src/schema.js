export default `
scalar Date

type Archetype {
  _id: String
  name: String
  charClass: String
  code: String,
  key_features: String
}
type ArchetypesByClass {
  druid: [ClassArchetype],
  warrior: [ClassArchetype],
  shaman: [ClassArchetype],
  rogue: [ClassArchetype],
  paladin: [ClassArchetype],
  hunter: [ClassArchetype],
  warlock: [ClassArchetype],
  mage: [ClassArchetype],
  priest: [ClassArchetype]
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
  cardId: String!,
  cardName: String!
}
input ClassArchetype {
  _id: String!,
  name: String!,
  charClass: String!,
  code: String!,
  key_features: String,
  cards: [Card]
}
input WinrateCardInput {
  cardId: String!
}

type Query {
  allArchetypes(
    druid: [ClassArchetype],
    warrior: [ClassArchetype],
    shaman: [ClassArchetype],
    rogue: [ClassArchetype],
    paladin: [ClassArchetype],
    hunter: [ClassArchetype],
    warlock: [ClassArchetype],
    mage: [ClassArchetype],
    priest: [ClassArchetype]
  ): [ArchetypesByClass!]!,
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
