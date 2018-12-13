import { createStore, combineReducers } from 'redux';
import { generate as id } from 'shortid';
import { data } from './data';

//state
const currentState = data;
const store = createStore(reducer, currentState);

/* Actions */
function addName(amount) {
  return {
    type: 'ADD',
    amount,
  };
}

/* Reducers */
function reducer(currentState, action) {
  switch (action.type) {
    case 'ADD':
      currentState.players.push({
        id: id(),
        name: action.amount,
        result: 1,
        status: 2,
      });
      return currentState;
    default:
      return currentState;
  }
}

store.dispatch(addName('blah-blah'));

console.log(store.getState());
