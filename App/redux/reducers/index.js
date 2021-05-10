import { combineReducers } from 'redux';

const itemsReducer = (items = [], action) => {
  switch (action.type) {
    case 'ADD_ITEM':
      if (action.payload !== '') {
        return [...items, { value: action.payload, done: false }];
      }
      return items;
    case 'UPDATE_ITEM':
      if (action.payload.newValue !== '' && action.payload.newValue !== action.payload.oldValue) {
        const newUpdateList = items.map(element => {
          if (element.value === action.payload.oldValue) {
            return { ...element, value: action.payload.newValue };
          }
          return element;
        });
        return newUpdateList;
      }
      return items;
    case 'MARK_ITEM':
      const newMarkList = items.map(element => {
        if (element.value === action.payload) {
          return { ...element, done: !element.done };
        }
        return element;
      });
      return newMarkList;
    case 'DELETE_ITEM':
      return items.filter(element => element.value !== action.payload);
    case 'LOAD_ITEMS':
      return action.payload;
    case 'DOWNLOAD_ITEMS':
      return action.payload;
    case 'UNDO_ITEMS':
      if (action.payload && action.payload.length) {
        return action.payload[action.payload.length - 1];
      }
      return items;
    default:
      return items;
  }
};

const historyReducer = (history = [], action) => {
  const condition = () => {
    if (history.length) {
      if (JSON.stringify(history[history.length - 1]) === JSON.stringify(action.payload)) {
        return false;
      }
    }
    return true;
  };
  if (action.type === 'ADD_HISTORY' && condition()) {
    return [...history, action.payload];
  }
  if (action.type === 'UNDO_ITEMS' && history.length > 0) {
    return history.slice(0, history.length - 1);
  }
  return history;
};

const errorReducer = (error = '', action) => {
  if (action.type === 'SHOW_ERROR') {
    return action.payload;
  }
  return error;
};

const loginReducer = (login = false, action) => {
  if (action.type === 'LOGIN_CHECK') {
    return action.payload;
  }
  return login;
};

const styleReducer = (light = true, action) => {
  if (action.type === 'STYLE_CHANGE') {
    return action.payload;
  }
  if (action.type === 'STYLE_GET') {
    return action.payload;
  }
  return light;
};

export default combineReducers({
  items: itemsReducer,
  error: errorReducer,
  login: loginReducer,
  history: historyReducer,
  isLightThemeEnabled: styleReducer,
});
