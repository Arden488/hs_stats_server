import mongoose from 'mongoose'

const OppDeck = mongoose.model('OppDeck', {
  name: String,
  charClass: String,
  archetypeId: String,
  code: String,
  key_features: String
})

export default OppDeck
