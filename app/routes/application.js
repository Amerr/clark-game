import Route from '@ember/routing/route';

export default class ApplicationRoute extends Route {
  model() {
    return {
      objectList: ['car', 'thief', 'Myself', 'House'],
      actionList: ['steal', 'hit/bump', 'prosecutes']
    };
  }
}
