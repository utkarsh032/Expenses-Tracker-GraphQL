import { users } from '../dummyData/data.js'

const userResolver = {
  Query: {
    users: () => {
      return users;
    },
    user: (_, { userId }) => {
      return users.find((user) => user._id === userId)
    },
  },
  Mutation: {
    // Add mutation resolvers her
  }
};

export default userResolver;
