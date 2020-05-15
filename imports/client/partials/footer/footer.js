import './footer.html';
import './footer.scss';

Template.footer.events({
  'click #logout'(e) {
    FlowRouter.go('/');
    Meteor.logout();
  }
});
