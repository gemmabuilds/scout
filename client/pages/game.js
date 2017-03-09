import { Games } from '../../collections/games.js';

Template.game.helpers({
  game: function() {
    return Games.findOne({short_id: Router.current().params._id});
  },
});

Template.gameTable.helpers({
  game: function() {
    return Games.findOne({short_id: Router.current().params._id});
  },
});
