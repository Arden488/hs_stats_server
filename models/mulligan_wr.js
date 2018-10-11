import mongoose from 'mongoose'

const MulliganWR = mongoose.model('MulliganWR', {
  deckId: String,
  archetypeId: String,
  cards: [
    {
      id: String,
      wins: Number,
      loses: Number
    }
  ]
})

export default MulliganWR
