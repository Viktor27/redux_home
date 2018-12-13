import { Store } from './Store';

class reduceStore extends Store {
  constructor(dispatcher) {
    super(dispatcher);
    this.__history = [];
  }
  reducer(state, action) {
    throw new Error('метод должен быть переопределен у потомка');
  }
  __onDispatch(action) {
    const newState = this.reducer(this.__state, action);
    if (newState !== this.__state) {
      this.__history.push(this.__state);
      this.__state = newState;
      this.__changeEmit();
    }
  }
  isHistory() {
    return this.__history.length > 0;
  }
  revert() {
    if (this.isHistory()) {
      this.__state = this.__history.pop();
      this.__changeEmit();
    }
  }
}
export { reduceStore };
