import { graphqlHTTP } from 'express-graphql';
import { buildSchema } from 'graphql';
import mongo from './mongo';
import {ObjectID} from 'mongodb';
const messagesCollection = mongo.db('test').collection('messsages');

var schema = buildSchema(`
  type Query {
    getMessage(id: ID!): String!
  }

  type Mutation {
    createMessage(msg: String): ID
    updateMessage(id: ID!, msg: String): ID
  }
`);

var root = {
    async getMessage({id}) {
        let result = await messagesCollection.findOne({
            _id: new ObjectID(id)
        });

        return result.message;
    },
    async createMessage({msg}){
        let newDoc = {
            message: msg
        };
        await messagesCollection.insertOne(newDoc);
        return newDoc._id;
    },
    async updateMessage({id, msg}) {

        let result = await messagesCollection.findOneAndUpdate({
            _id: new ObjectID(id)
        }, {
            $set: {
                message: msg
            }
        });

        return id;
    }
  };

export default graphqlHTTP({
    schema: schema,
    rootValue: root,
    graphiql: true,
});