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
import '../imports/client/templates/card/card';
import '../imports/client/templates/contacts_list/contacts';
import '../imports/client/styles/instagramFeed.css';
import '../imports/client/scripts/instagramFeed.min';
import './main.html';

Template.registerHelper(
  'detail', (segment)=> {
    let result;
    switch (segment) {
      case 'organizadora':
      result = 'Produtora/Organizadora';
      break;
      case 'alimentos':
      result = 'Alimentos & Bebidas';
      break;
      case 'equipamentos':
      result = 'Locação de equipamentos (áudio/vídeo/luz/informática)';
      break;
      case 'servicos':
      result = 'Serviços/Consultoria';
      break;
      case 'redes':
      result = 'Internet e Redes lógicas';
      break;
      case 'software':
      result = 'Softwares/Credenciamento/Interatividade';
      break;
      case 'eletrica':
      result = 'Elétrica e Grupos Geradores';
      break;
      case 'rh':
      result = 'Recursos Humanos/Cerimonial/Recepção';
      break;
      case 'logistica':
      result = 'Logística/Transporte/Traslado';
      break;
      case 'seguranca':
      result = 'Segurança/Brigada';
      break;
      case 'mobiliario':
      result = 'Mobiliário';
      break;
      case 'cenografia':
      result = 'Cenografia/Decoração';
      break;
      case 'estrutura':
      result = 'Estrutura';
      break;
      case 'local':
      result = 'Espaço (salões de festas / auditório / centro de convenções)';
      break;
      case 'industria':
      result = 'Indústria/Comércio';
      break;
      case 'conteudo':
      result = 'Conteúdo (design gráfico / edição de vídeo / motion / 3D)';
      break;
      case 'engenharia':
      result = 'Engenharia/Arquitetura';
      break;
      default:
    }
    return result;
  }
);

Template.registerHelper(
  'removeAtsign', (str)=> {
    function remove_character(str_to_remove, str) {
      let reg = new RegExp(str_to_remove)
      return str.replace(reg, '')
    }
    return remove_character('@', str).toLowerCase();
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
cenografia'}} value="cenografia">Cenografia/Decoração
estrutura'}} value="estrutura">Estrutura
local'}} value="local">Espaço (salões de festas / auditório / centro de convenções)
industria'}} value="industria">Indústria/Comércio
conteudo'}} value="conteudo">Conteúdo (design gráfico / edição de vídeo / motion / 3D)
engenharia'}} value="engenharia">Engenharia/Arquitetura
*/
