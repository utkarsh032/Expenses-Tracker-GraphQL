import { mergeResolvers } from "@graphql-tools/merge";
import transactionResolver from "./transactionResolver.js";
import userResolver from "./userResolver.js";


const mergedResolvers = mergeResolvers([userResolver, transactionResolver]);

export default mergedResolvers;
