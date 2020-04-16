import './contacts.html';
import './contacts.scss';

Template.contacts.onCreated(()=> {
});

Template.contacts.onRendered(()=> {
});

Template.contacts.helpers({
  users() {
    return Meteor.users.find();
  }
});

Template.contacts.events({
});
