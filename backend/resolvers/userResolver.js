import { users } from '../dummyData/data.js'

const userResolver = {
  Query: {
    users: () => {
      return users;
    }
  },
  Mutation: {
    // Add mutation resolvers here
  }
};

export default userResolver;
