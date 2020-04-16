import './user.html';
import './user.scss';
import '../../partials/user_form/user_form';

Template.user.onCreated(()=> {
});

Template.user.onRendered(()=> {
});

Template.user.helpers({
});

Template.user.events({
  'submit form'(e) {
    e.preventDefault();
    let tipo = $('input[name=tipo]:checked');
    profile = {
      empresa: e.target.empresa.value,
      segmento: e.target.segmento.value,
      telefone: e.target.telefone.value,
      email: e.target.email.value,
      cargo: e.target.cargo.value,
      tipo: {
        tag: tipo.attr('id'),
        nome: tipo.next().text(),
      },
      responsavel: e.target.responsavel.checked,
      publico: e.target.publico.checked,
      descricao: e.target.descricao.value,
    }
    Meteor.call('userForm', this._id, profile, false);
    // FlowRouter.go('/contatos');
  }
});
