export default `
type Archetype {
  _id: String
  name: String
  class: String
  code: String
}
type Query {
  allArchetypes(
    name: String,
    class: String,
    code: String,
    key_features: String
  ): [Archetype!]!,
  getArchetype(
    id: String!
  ): Archetype!
}
type Mutation {
  createArchetype(
    name: String!,
    class: String!,
    code: String!,
    key_features: String!
  ): Archetype!
}
`