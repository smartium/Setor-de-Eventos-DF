import { Meteor } from 'meteor/meteor';

Meteor.startup(() => {
});

Accounts.onCreateUser(function(options, user) {
   user.profile = options.profile || {};
   user.profile.newUser = true;
   return user;
});

Meteor.methods({
  'userForm'(user, profile, isNewUser) {
    Meteor.users.update({_id: user},
    {
      $set: {
        'profile.newUser': isNewUser,
        'profile.empresa': profile.empresa,
        'profile.segmento': profile.segmento,
        'profile.telefone': profile.telefone,
        'profile.email': profile.email,
        'profile.cargo': profile.cargo,
        'profile.tipo': profile.tipo,
        'profile.responsavel': profile.responsavel,
        'profile.publico': profile.publico,
        'profile.descricao': profile.descricao,
        'profile.updatedAt': new Date().valueOf(),
      }
    });
  }
});
