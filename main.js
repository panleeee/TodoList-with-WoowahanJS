import Woowahan from 'woowahan';
import MainView from './views/main';

global.$ = global.jQuery = Woowahan.$;

const app = new Woowahan();

const routes = {
  url: '/', view: MainView , container: 'body'
};

app.start(routes);
