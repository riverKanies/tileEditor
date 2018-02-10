import { Mongo } from 'meteor/mongo';
 
export const Maps = new Mongo.Collection('maps');

Meteor.methods({
    'maps.insert'(map) {
      return Maps.insert(map)
    },
    'maps.update'(map) {
        const { level } = map
        Maps.update({_id: map._id}, { $set: {
          level
        }})
    },
})