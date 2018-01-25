import { Router } from 'meteor/iron:router';

// Homepage route. Renders 'home' template with 'join-game' form.
Router.route('/', function () {
  this.layout('main-layout');
  this.render('home');
  this.render('join-game', { to: 'form' });
});

// New Game route. Renders 'home' template with 'new-game' form.
Router.route('/new', function () {
  this.layout('main-layout');
  this.render('home');
  this.render('new-game', { to: 'form' });
});

// Game route. Allows players to join a game and control their own cards.
Router.route('/game/:_id', function () {
  this.layout('game-layout');
  this.render('game');
  this.render('enter-game', {to: 'content'});
});

// Game Table route. Displays the current game state to all players.
Router.route('game/:_id/table', function () {
  this.layout('game-layout');
  this.render('game');
  this.render('game-table', {to: 'content'});
}, {
  name: 'table'
});

// Wildcard route. Any undefined route redirects to homepage.
// This route must be at the bottom.
Router.route('/(.*)', function () {
  Router.go('/');
});
