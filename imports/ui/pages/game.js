import { Games } from '../../api/games.js';
import { Router }    from 'meteor/iron:router';

import './game.html';
import '../components/_loaders.html';

Template.game.onCreated(function () {
  console.log('onCreated subscribe');
  Meteor.subscribe('games');
});

Template.enterGame.helpers({
  game: function() {
    return Games.findOne({_id: Router.current().params._id});
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

    // Games.update(Template.instance().game._id, {
    //   $push: { players: player }
    // });
  },
});

Template.gameTable.helpers({
  game: function() {
    return Games.findOne({_id: Router.current().params._id});
  },
});
