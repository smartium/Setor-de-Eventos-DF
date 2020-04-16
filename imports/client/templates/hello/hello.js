import './hello.html';
import './hello.scss';

Template.hello.onCreated(()=> {
  // counter starts at 0
  this.counter = new ReactiveVar(0);
});

Template.hello.onRendered(()=> {
});

Template.hello.helpers({
  counter() {
    return Template.instance().counter.get();
  },
});

Template.hello.events({
  'click #login'(e) {
    if (Meteor.userId()) {
      FlowRouter.go('/');
      Meteor.logout();
    }
    else {
      Meteor.loginWithGoogle({}, ()=> {
        if (Meteor.user()) {
          if (Meteor.user().profile.newUser) {
            FlowRouter.go('/cadastro');
          }
          else {
            FlowRouter.go('/contatos');
          }
        }
        else {
        FlowRouter.go('/');
        }
      });
    }
  }
});
