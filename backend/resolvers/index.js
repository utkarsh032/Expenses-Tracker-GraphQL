import { mergeResolvers } from "@graphql-tools/merge";

import userResolver from "./userResolver.js";
import transactionResolver from "./transactionResolver.js";

const mergedResolvers = mergeResolvers([userResolver, transactionResolver])

export default mergedResolvers