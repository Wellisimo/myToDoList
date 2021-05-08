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
        const updateTarget = items.find(element => element.value === action.payload.oldValue);
        const updateTargetIndex = items.indexOf(updateTarget);
        const modifiedUpdateTarget = { value: action.payload.newValue, done: updateTarget.done };
        const newUpdateList = [...items];
        newUpdateList.splice(updateTargetIndex, 1, modifiedUpdateTarget);
        return newUpdateList;
      }
      return items;
    case 'MARK_ITEM':
      const markTarget = items.find(element => element.value === action.payload);
      const markTargetIndex = items.indexOf(markTarget);
      const modifiedMarkTarget = { value: markTarget.value, done: !markTarget.done };
      const newMarkList = [...items];
      newMarkList.splice(markTargetIndex, 1, modifiedMarkTarget);
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
      const lastState = history[history.length - 1];
      const jsonLastState = JSON.stringify(lastState);
      const jsonPayload = JSON.stringify(action.payload);
      if (jsonLastState === jsonPayload) {
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
  style: styleReducer,
});
