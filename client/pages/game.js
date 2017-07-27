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

Template.game.events({
  'submit #join-game'(event) {
    event.preventDefault();

    const target = event.target;
    const playerName = target.playerName.value;

    var game = Games.findOne({short_id: Router.current().params.short_id});

    Games.update({ _id: game._id }, {
      $push: { players: { name: playerName, hand: [] } },
    });
  },
})

Template.gameTable.helpers({
  game: function() {
    return Games.findOne({short_id: Router.current().params.short_id});
  },
});
