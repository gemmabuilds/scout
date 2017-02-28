Router.route('/', function () {
  this.layout('main-layout');
  this.render('home');
  this.render('join-game', { to: 'form' });
});

Router.route('/new', function () {
  this.layout('main-layout');
  this.render('home');
  this.render('new-game', { to: 'form' });
});

Router.route('/game/:_id', function () {
  this.layout('game-layout');
  this.render('game');
});

Router.route('game/:_id/table', function () {
  this.layout('game-layout');
  this.render('game-table');
});
