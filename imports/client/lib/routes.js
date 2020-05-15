FlowRouter.route('/', {
  name: 'Hello',
  action() {
    BlazeLayout.render('App_body', {main: 'hello'});
  }
});

FlowRouter.route('/card/:id', {
  name: 'Card',
  action() {
    BlazeLayout.render('App_body', {main: 'card'});
  }
});

FlowRouter.route('/info', {
  name: 'Info',
  action() {
    BlazeLayout.render('App_body', {main: 'info'});
  }
});

FlowRouter.route('/cadastro', {
  name: 'Cadastro',
  action() {
    BlazeLayout.render('App_body', {main: 'user'});
  }
});

FlowRouter.route('/contatos', {
  name: 'Contatos',
  action() {
    BlazeLayout.render('App_body', {main: 'contacts'});
  }
});
