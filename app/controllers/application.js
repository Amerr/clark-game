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
  @tracked
  tries = 3;

  constructor() {
    super(...arguments);
    this.randomScene();
  }

  @tracked
  scenes = [
    {
      name: 'Accident Insurance',
      scenarioOrder: [ 'car', 'hit', 'user' ],
      points: 1,
      done: false,
      hint: 'Its claimed when you car accidently hits another friendly car'
    }, {
      name: 'Private Liability Insurance',
      scenarioOrder: [ 'user', 'hit', 'car' ],
      points: 1,
      done: false,
      hint: "A private liability protects insured persons against claims of third parties who have suffered damage in the private sector by the insured - if the damage was not intentionally caused, but by negligence."
    }, {
      name: 'Household Insurance',
      scenarioOrder: [ 'thief', 'steal', 'house' ],
      points: 1,
      done: false,
      hint: "The household insurance is a property insurance. It provides insurance cover for the inventory, that is home furnishings, consumer goods and consumables of a private household (household goods) against fire, tap water, storm, hail, burglary, robbery and vandalism."
    }, {
      name: 'Car Insurance',
      scenarioOrder: [ 'car', 'steal', 'car' ],
      points: 1,
      done: false,
      hint: 'The automobile liability insurance covers property damage and personal injury, which the driver has to answer for; it does not cover damage to the vehicle of the polluter.'
    }, {
      name: 'Legal Insurance',
      scenarioOrder: [ 'user', 'prosecutes', 'user' ],
      points: 1,
      done: false,
      hint: 'Its claimed when legal prosecution between two individuals'
    }
  ];

  @tracked
  currentScene = null;

  randomScene() {
    let currentScene = this.scenes.filter((i) => !i.done);
    if (currentScene.length) {
      this.currentScene = currentScene[ Math.ceil(Math.random() * 10)% currentScene.length];
    } else {
      // Route to dashboard
      alert(
        'Game over'
      );
    }
  }

  validatePlaceholders() {
    return ![this.placeholder1, this.placeholder2, this.placeholder3].some((i) => !i);
  }

  resetPuzzle() {
    this.placeholder1 = null;
    this.placeholder2 = null;
    this.placeholder3 = null;
  }


  @action
  submit() {
    if (this.validatePlaceholders()) {
      const hasFalseCase = [this.placeholder1, this.placeholder2, this.placeholder3]
      .map((i, index) => 
        this.currentScene.scenarioOrder[index] == i
      ).some((i) => !i);

      if (hasFalseCase) {
        if (this.tries != 0) {
          this.tries = this.tries - 1;
          alert('try again loser');  
        } else {
          alert('Game over');  
          window.location.reload();
        }
      } else {
        this.currentScene.done = true;
        this.resetPuzzle();
        this.randomScene();
      }
    } else {
      alert('Fill all the jigsaw puzzle');
    }
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