import mongoose from 'mongoose'

const Winrate = mongoose.model('Winrate', {
  deckId: String,
  opponentArchetypeId: String,
  opponentClass: String,
  wins: Number,
  losses: Number,
  games: Number,
  cards: [
    {
      cardId: String,
      wins: Number,
      losses: Number
    }
  ]
})

export default Winrate
