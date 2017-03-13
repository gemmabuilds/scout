import { Games } from '../../collections/games.js';

Template.game.helpers({
  game: function() {
    return Games.findOne({short_id: Router.current().params.short_id});
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
