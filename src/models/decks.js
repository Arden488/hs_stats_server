import mongoose from 'mongoose'

const Deck = mongoose.model('Deck', {
  name: String,
  charClass: String,
  code: String
})

export default Deck
