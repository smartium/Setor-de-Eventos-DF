import './card.html';
import './card.scss';

Template.card.onCreated(()=> {
});

Template.card.onRendered(()=> {
});

Template.card.helpers({
    user() {
        return Meteor.users.findOne({_id: FlowRouter.getParam('id')})
    }
});

Template.card.events({
});
