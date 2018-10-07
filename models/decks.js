import mongoose from 'mongoose'

const Deck = mongoose.model('Deck', {
  name: String,
  class: String,
  code: String
})

export default Deck
