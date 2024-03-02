import { mergeTypeDefs } from "@graphql-tools/merge";

import userTypeDef from './userTypeDef.js'
import transactionTypeDef from './transactionTypeDef.js'

const mergedTypeDefs = mergeTypeDefs([userTypeDef, transactionTypeDef])

export default mergedTypeDefs