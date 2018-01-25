import SimpleSchema from 'simpl-schema';

import HashID from '../../lib/hashid.js';

export const Games = new Mongo.Collection('games');
export const Previous = new Mongo.Collection('previous');

if (Meteor.isServer) {
  Meteor.publish('games', function() {
    return Games.find({});
  });
}

var Schemas = {};

Schemas.Previous = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
  },
  hashes: {
    type: Array,
    label: 'Hash List',
  },
  'hashes.$': {
    type: String,
  },
});

var Card = new SimpleSchema({
  value: {
    type: Number,
    max: 10,
  },
  suit: {
    type: String,
    max: 50,
  },
});

var Player = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    max: 50,
  },
  hand: {
    type: Array,
    label: 'Hand',
  },
  'hand.$': {
    type: Card,
  },
});

Schemas.Game = new SimpleSchema({
  short_id: {
    type: String,
    label: 'Short ID',
  },
  name: {
    type: String,
    label: 'Game Name',
    max: 100,
  },
  deck: {
    type: Array,
    label: 'Deck',
    max: 50,
  },
  'deck.$': {
    type: Card,
  },
  players: {
    type: Array,
    label: 'Players',
    defaultValue: [],
  },
  'players.$': {
    type: Player
  },
});

Games.attachSchema(Schemas.Game);
Previous.attachSchema(Schemas.Previous);

Meteor.methods({
  'games.insert'(gameName) {
    var shortId;
    var suits = ['&hearts;', '&clubs;', '&diams;', '&spades;', '&#x2605;'];
    var deck = [];

    for (var s = 0; s < suits.length; s++) {
      for (var v = 1; v < 11; v++) {
        deck.push({ value: v, suit: suits[s] });
      }
    }

    var hashList = Previous.findOne({ title: 'game-hash' });

    if (hashList) {
      shortId = HashID.generateUnique(hashList.hashes);
      Previous.update({ _id: hashList._id }, {
        $push: { hashes: shortId },
      });
    } else {
      shortId = HashID.generate();
      Previous.insert({
        title: 'game-hash',
        hashes: [shortId],
      });
    }
    
    let id = Games.insert({
      short_id: shortId,
      name: gameName,
      deck: deck,
    });
    
    return id;
  },
});