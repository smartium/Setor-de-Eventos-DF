import './header.html';
import './header.scss';

Template.header.events({
  'click #logout'(e) {
    FlowRouter.go('/');
    Meteor.logout();
  }
});
