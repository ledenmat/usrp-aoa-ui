

const typeDefs = `#graphql
  type USRP_message {
    serial_num: String,
    aoa: Float,
    ss: Float
  }

  type Subscription {
    usrp: USRP_message
  }

  type Query {
    test: String
  }

`;

export default typeDefs