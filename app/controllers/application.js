import Controller from "@ember/controller"
import { action } from '@ember/object';
import { tracked } from "@glimmer/tracking";

export default class ApplicationController extends Controller {
  @tracked
  placeholder1 = null;
  @tracked
  placeholder2 = null;
  @tracked
  placeholder3 = null;
  

  @action
  reorderItems() {
    console.log(...arguments);
  }

  @action
  onTarget(object, ops) {
    switch (ops.target.pos) {
      case 1:
        if (object.type == 'a') {
          this.placeholder1 = object.item;
        }
      break;
      case 2:
          if (object.type == 'b') {
            this.placeholder2 = object.item;
          }
      break;
      case 3:
          if (object.type == 'a') {
            this.placeholder3 = object.item;
          }
      break;
    }
  }
}