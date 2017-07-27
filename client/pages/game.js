import { Games } from '../../collections/games.js';

Template.enterGame.created = function () {
  // here `this` refers to template instance
  this.game = -1;
};

Template.enterGame.helpers({
  game: function() {
    var g = Games.findOne({short_id: Router.current().params._id});
    Template.instance().game = g;
    return g;
  },
});

Template.enterGame.events({
  'submit #enter-game'(event) {
    event.preventDefault();

    const target = event.target;
    const playerName = target.playerName.value;

    var player = {
      name: playerName,
      hand: [],
    };

    Games.update(Template.instance().game._id, {
      $push: { players: player }
    });
  },
});

Template.gameTable.helpers({
  game: function() {
    return Games.findOne({short_id: Router.current().params._id});
  },
});
