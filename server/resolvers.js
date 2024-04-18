import pubsub from "./pubsub.js";

const COMPONENTS = {
  USRP: "usrp"
};

const resolvers = {
  Subscription: {
    usrp: {
      subscribe: () => pubsub.asyncIterator(COMPONENTS.USRP)
    }
  },
};

export default resolvers