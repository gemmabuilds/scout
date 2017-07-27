export const Games = new Mongo.Collection('games');
export const Previous = new Mongo.Collection('previous');

var Schemas = {};

Schemas.Previous = new SimpleSchema({
  title: {
    type: String,
    label: 'Title',
  },
  hashes: {
    type: [String],
    label: 'Hash List',
  },
});

Card = new SimpleSchema({
  value: {
    type: Number,
    max: 10,
  },
  suit: {
    type: String,
    max: 50,
  },
});

Player = new SimpleSchema({
  name: {
    type: String,
    label: 'Name',
    max: 50,
  },
  hand: {
    type: [Card],
    label: 'Hand',
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
    type: [Card],
    label: 'Deck',
    max: 50,
  },
  players: {
    type: [Player],
    label: 'Players',
    defaultValue: [],
  },
});

Games.attachSchema(Schemas.Game);
Previous.attachSchema(Schemas.Previous);
