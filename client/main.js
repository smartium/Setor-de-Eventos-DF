import { Template } from 'meteor/templating';
import { ReactiveVar } from 'meteor/reactive-var';
import '../imports/client/lib/routes';
import '../node_modules/materialize-css/sass/materialize.scss';
import '../imports/client/styles/social.css';
import '../node_modules/materialize-css/dist/js/materialize.min';
import '../imports/client/partials/header/header';
import '../imports/client/partials/footer/footer';
import '../imports/client/templates/hello/hello';
import '../imports/client/templates/info/info';
import '../imports/client/templates/user/user';
import '../imports/client/templates/contacts/contacts';
import './main.html';

Template.registerHelper(
  'detail', (segment)=> {
    let result;
    switch (segment) {
      case 'organizadora':
        result = 'Produtora/Organizadora';
        break;
      default:
    }
    return result;
  }
);

Template.App_body.onRendered(()=> {
  $('.sidenav').sidenav();
});

/*
organizadora'}} value="organizadora">Produtora/Organizadora
alimentos'}} value="alimentos">Alimentos & Bebidas
equipamentos'}} value="equipamentos">Locação de equipamentos (áudio/vídeo/luz/informática)
servicos'}} value="servicos">Serviços/Consultoria
redes'}} value="redes">Internet e Redes lógicas
software'}} value="software">Softwares/Credenciamento/Interatividade
eletrica'}} value="eletrica">Elétrica e Grupos Geradores
rh'}} value="rh">Recursos Humanos/Cerimonial/Recepção
logistica'}} value="logistica">Logística/Transporte/Traslado
seguranca'}} value="seguranca">Segurança/Brigada
mobiliario'}} value="mobiliario">Mobiliário
cenogarfia'}} value="cenogarfia">Cenografia/Decoração
estrutura'}} value="estrutura">Estrutura
local'}} value="local">Espaço (salões de festas / auditório / centro de convenções)
industria'}} value="industria">Indústria/Comércio
conteudo'}} value="conteudo">Conteúdo (design gráfico / edição de vídeo / motion / 3D)
engenharia'}} value="engenharia">Engenharia/Arquitetura
*/
