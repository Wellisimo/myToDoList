import { combineReducers } from 'redux';
import { Actions, Items } from '../../Helpers/Types';

type Action = {
  type: Partial<Actions>;
  payload?: any;
};

const itemsReducer = (items: Items = [], action: Action) => {
  switch (action.type) {
    case Actions.AddItem:
      if (action.payload !== '' && !items.map(element => element.value).includes(action.payload)) {
        return [...items, { value: action.payload, done: false }];
      }
      return items;
    case Actions.UpdateItem:
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
    case Actions.MarkItem:
      const newMarkList = items.map(element => {
        if (element.value === action.payload) {
          return { ...element, done: !element.done };
        }
        return element;
      });
      return newMarkList;
    case Actions.DeleteItem:
      return items.filter(element => element.value !== action.payload);
    case Actions.LoadItems:
      return action.payload;
    case Actions.DownloadItems:
      return action.payload;
    case Actions.undoUserAction:
      if (action.payload && action.payload.length) {
        return action.payload[action.payload.length - 1];
      }
      return items;
    default:
      return items;
  }
};

const historyReducer = (history = [], action: Action) => {
  const isDataDuplicated = () => {
    if (history.length) {
      if (JSON.stringify(history[history.length - 1]) === JSON.stringify(action.payload)) {
        return false;
      }
    }
    return true;
  };
  if (action.type === Actions.addUserActionHistory && isDataDuplicated()) {
    return [...history, action.payload];
  }
  if (action.type === Actions.undoUserAction && history.length > 0) {
    return history.slice(0, history.length - 1);
  }
  return history;
};

const errorReducer = (error = '', action: Action) => {
  if (action.type === Actions.ShowError) {
    return action.payload;
  }
  return error;
};

const loginReducer = (login = false, action: Action) => {
  if (action.type === Actions.LoginCheck) {
    return action.payload;
  }
  return login;
};

const styleReducer = (light = true, action: Action) => {
  if (action.type === Actions.StyleChange) {
    return action.payload;
  }
  if (action.type === Actions.StyleGet) {
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
