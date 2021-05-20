import AsyncStorage from '@react-native-async-storage/async-storage';

export const addItem = item => ({
  type: 'ADD_ITEM',
  payload: item,
});

export const updateItem = (oldValue, newValue) => ({
  type: 'UPDATE_ITEM',
  payload: { oldValue, newValue },
});

export const markItem = value => ({
  type: 'MARK_ITEM',
  payload: value,
});

export const deleteItem = value => ({
  type: 'DELETE_ITEM',
  payload: value,
});

export const addHistory = value => (dispatch, getState) => {
  const items = value || getState().items;
  dispatch({ type: 'ADD_HISTORY', payload: items });
};

export const undoItems = data => ({
  type: 'UNDO_ITEMS',
  payload: data,
});

export const loadItems = () => async dispatch => {
  const value = await AsyncStorage.getItem('List');
  if (value !== null) {
    dispatch({ type: 'LOAD_ITEMS', payload: JSON.parse(value) });
  }
};

export const downloadItems = () => async dispatch => {
  const value = await fetch('https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app/list.json');
  if (value !== null) {
    const jsonValue = await value.json();
    dispatch({ type: 'DOWNLOAD_ITEMS', payload: jsonValue });
  }
};

export const saveItems = value => async () => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem('List', jsonValue);
};

export const uploadItems = value => async () => {
  const jsonValue = JSON.stringify(value);
  fetch('https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app/list.json', {
    method: 'PUT',
    body: jsonValue,
  });
};

export const showError = value => ({
  type: 'SHOW_ERROR',
  payload: value,
});

export const login = () => async dispatch => {
  const jsonValue = JSON.stringify(true);
  await AsyncStorage.setItem('isLogged', jsonValue);
  const result = await AsyncStorage.getItem('isLogged');
  dispatch({ type: 'LOGIN_CHECK', payload: JSON.parse(result) });
};

export const logout = () => async dispatch => {
  const jsonValue = JSON.stringify(false);
  await AsyncStorage.setItem('isLogged', jsonValue);
  const result = await AsyncStorage.getItem('isLogged');
  dispatch({ type: 'LOGIN_CHECK', payload: JSON.parse(result) });
};

export const checkLogin = () => async dispatch => {
  const value = await AsyncStorage.getItem('isLogged');
  if (value !== null) {
    dispatch({ type: 'LOGIN_CHECK', payload: JSON.parse(value) });
  }
};

export const changeStyle = () => async dispatch => {
  const jsonResult = await AsyncStorage.getItem('style');
  const result = jsonResult ? JSON.parse(jsonResult) : null;
  if (result === null) {
    const jsonValue = JSON.stringify(true);
    await AsyncStorage.setItem('style', jsonValue);
    dispatch({ type: 'STYLE_CHANGE', payload: true });
  } else {
    dispatch({ type: 'STYLE_CHANGE', payload: !result });
    const jsonValue = JSON.stringify(!result);
    await AsyncStorage.setItem('style', jsonValue);
  }
};

export const getStyle = () => async dispatch => {
  const jsonResult = await AsyncStorage.getItem('style');
  const result = jsonResult ? JSON.parse(jsonResult) : null;
  if (result === null) {
    dispatch({ type: 'STYLE_GET', payload: true });
  } else {
    dispatch({ type: 'STYLE_GET', payload: result });
  }
};
