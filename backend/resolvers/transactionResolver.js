import { transactions } from '../dummyData/data.js'

const transactionResolver = {
  Query: {
    transactions: () => {
      return transactions
    }
  },
  Mutation: {}
}
export default transactionResolver