import { RedisPubSub } from "graphql-redis-subscriptions";

// const types_of_can = []

const deserialize = (sourceOrBuffer, { channel, pattern }) => {
    // for (const key in JSON.parse(sourceOrBuffer)) {
    //     if (types_of_can.indexOf(key) === -1) {
    //         types_of_can.push(key)
    //         console.log(types_of_can)
    //     }
    // }
    return {"usrp": JSON.parse(sourceOrBuffer)}
};

const pubsub = new RedisPubSub({deserializer: deserialize});

export default pubsub