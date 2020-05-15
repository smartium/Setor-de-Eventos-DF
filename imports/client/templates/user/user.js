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
    let strInstagram = remove_character('@', e.target.instagram.value);
    strInstagram = strInstagram.toLowerCase();
    profile = {
      empresa: e.target.empresa.value,
      nomeExibicao: e.target.nome_exibicao.value,
      segmento: e.target.segmento.value,
      telefone: e.target.telefone.value,
      whatsapp: e.target.whatsapp.value,
      email: e.target.email.value,
      cargo: e.target.cargo.value,
      tipo: {
        tag: tipo.attr('id'),
        nome: tipo.next().text(),
      },
      responsavel: e.target.responsavel.checked,
      publico: e.target.publico.checked,
      descricao: e.target.descricao.value,
      links: {
        site: e.target.site.value,
        instagram: strInstagram,
        facebook: e.target.facebook.value
      }
    }
    console.log(e.target.instagram.value);
    Meteor.call('userForm', this._id, profile, false);
    FlowRouter.go('/contatos');
  },

  'click #cancel'(e) {
    e.preventDefault();
    FlowRouter.go('/contatos');
  }
});

function remove_character(str_to_remove, str) {
  let reg = new RegExp(str_to_remove)
  return str.replace(reg, '')
}
