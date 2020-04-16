import './user_form.html';
import './user_form.scss';

Template.userForm.helpers({
  user() {
    return Meteor.user().profile;
  },

  selected(segmento) {
    return segmento == this.segmento ? 'selected' : null;
  },

  checked(field) {
    return field ? 'checked' : null;
  },

  tipo(field) {
    return field  == this.tipo.tag ? 'checked' : null;
  }
});

Template.userForm.onRendered(()=> {
  M.updateTextFields();
  $('select').formSelect();
  $('textarea#descricao').characterCounter();
});
