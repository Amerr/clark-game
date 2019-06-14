import Route from '@ember/routing/route';
import { action } from '@ember/object';

export default class ApplicationRoute extends Route {
  model() {
    return {
      objectList: ['car', 'thief', 'user', 'house'],
      actionList: ['steal', 'hit', 'prosecutes']
    };
  }

}
