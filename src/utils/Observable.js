import TBoardDraw from "@/Screens/Main/drawcore/TBoardDraw";

export default class Observable {
  /**
   * @type {{
   *  name: "transformListener" | "selectListener" | "tapDownListener" | "tapUpListener" | "onFinishDrawListener" | "rotateGroupObjectListener" | "objectStateChangeListener",
   *  func: TBoardDraw[Observable['observers'][number]['name']]
   * }[]} observers
   */
  observers;

  constructor() {
    this.observers = [];
  }

  /**
   *
   * @param {Observable['observers'][never]} item
   */
  subscribe(item) {
    this.observers.push(item);
  }

  /**
   *
   * @param {Observable['observers'][never]} item
   */
  unsubscribe(item) {
    this.observers = this.observers.filter((observer) => observer !== item);
  }

  /**
   * @param {Observable['observers'][number]['name']} eventName
   * @param {any} data
   */
  notify(eventName, data) {
    this.observers.forEach((observer) => {
      if (observer.name === eventName) observer.func(data);
    });
  }
}
