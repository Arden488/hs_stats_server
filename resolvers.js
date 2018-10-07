export default {
  Query: {
    allArchetypes: async (parent, args, { Archetype }) => {
      const archetypes = await Archetype.find(args)
      return archetypes.map(x => {
        x._id = x._id.toString()
        return x
      })
    },
    getArchetype: async (parent, args, { Archetype }) => {
      const archetype = await Archetype.findById(args.id)
      return archetype
    }
  },
  Mutation: {
    createArchetype: async (parent, args, { Archetype }) => {
      const archetype = await new Archetype(args).save()
      archetype._id = archetype._id.toString()
      return archetype
    },
    // upvoteArchetype: async (parent, args, { Archetype }) => {
    //   const archetype = await Archetype.findById(args.id)
    //   archetype.set({ votes: archetype.votes ? archetype.votes + 1 : 1 })
    //   await archetype.save()
    //   return archetype
    // }
  }
}