import HashID from '../../lib/hashid.js';
import { Games } from '../../collections/games.js';
import { Previous } from '../../collections/games.js';

Template.home.events({
  'submit #join-game'(event) {
    event.preventDefault();

    const target = event.target;
    const code = target.gameCode.value;

    Router.go('/game/' + code);
  },

  'submit #create-game'(event) {
    event.preventDefault();

    const target = event.target;
    const gameName = target.gameName.value;
    var shortId;

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

    Games.insert({
      short_id: shortId,
      name: gameName,
    });

    Router.go('/game/' + shortId);
  },
});
