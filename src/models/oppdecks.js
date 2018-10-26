import mongoose from 'mongoose'
const Schema = mongoose.Schema

const OppDeck = mongoose.model('OppDeck', {
  name: String,
  charClass: String,
  archetypeId: { type: Schema.Types.ObjectId, ref: 'Archetype' },
  code: String,
  key_features: String
})

export default OppDeck
