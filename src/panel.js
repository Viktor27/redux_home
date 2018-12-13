import { Dispatcher, Store } from './flux';

const panelDispatcher = new Dispatcher();

const CHANGE_USERNAME = 'CHANGE_USERNAME';
const CHANGE_FONTSIZE = 'CHANGE_FONTSIZE';

class PanelStore extends Store {
  getInitialState() {
    const stub = {
      userName: 'Maksim',
      fontSize: 'small',
    };
    const preferences = localStorage['preferences'];
    return preferences ? JSON.parse() : stub;
  }
  __onDispatch(action) {
    const { type, payload } = action;
    switch (type) {
      case CHANGE_USERNAME:
        this.__state.userName = payload.userName;
        break;
      case CHANGE_FONTSIZE:
        this.__state.fontSize = payload.fontSize;
        break;
      default:
        break;
    }
    this.__changeEmit();
  }
}

const panelStore = new PanelStore(panelDispatcher);

const inputUser = document.getElementById('userNameInput');
inputUser.addEventListener('input', ({ target }) => {
  const userName = target.value;
  panelDispatcher.dispatch({
    type: CHANGE_USERNAME,
    payload: { userName },
  });
});
const fsCheck = document.forms.fontSizeForm.fontSize;
fsCheck.forEach(el => {
  const { fontSize } = panelStore.getState();
  el.value === fontSize && (el.checked = true);
  el.addEventListener('change', ({ target }) => {
    const fontSize = target.value;
    panelDispatcher.dispatch({
      type: CHANGE_FONTSIZE,
      payload: { fontSize },
    });
  });
});

const render = () => {
  const { userName, fontSize } = panelStore.getState();
  document.getElementById('userName').textContent = userName;
  let fontSizeStyle = fontSize === 'small' ? '16px' : '32px';
  document.getElementById('userName').style.fontSize = fontSizeStyle;
};
render();

panelStore.addEventListener(state => {
  render();
  //   localStorage['preferences'] = JSON.stringify(state);
});
