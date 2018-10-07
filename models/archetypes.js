import mongoose from 'mongoose'

const Archetype = mongoose.model('Archetype', {
  name: String,
  class: String,
  code: String,
  key_features: String
})

export default Archetype
