import HashID from '../../../lib/hashid.js';
import { Games } from '../../api/games.js';
import { Previous } from '../../api/games.js';

import './home.html';

Template.home.onCreated(function() {
  Meteor.subscribe('games');
});

Template.home.events({
  'submit #join-game'(event) {
    event.preventDefault();

    const target = event.target;
    const code = target.gameCode.value;

    let game = Games.findOne({short_id: code});

    Router.go('/game/' + game._id);
  },

  'submit #create-game'(event) {
    event.preventDefault();

    const target = event.target;
    const gameName = target.gameName.value;
    
    Meteor.call('games.insert', gameName, function(err, result) {
      if (err) {
        console.log("ERROR! - " + err);
      } else {
        Router.go('/game/' + result);
      }
    });
  },
});
