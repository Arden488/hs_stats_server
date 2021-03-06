import mongoose from 'mongoose'

const Game = mongoose.model('Game', {
  deckId: String,
  datetime: { type: Date, default: Date.now },
  opponentClass: String,
  opponentDeck: String,
  outcome: String
})

export default Game
