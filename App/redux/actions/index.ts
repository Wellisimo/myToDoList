import AsyncStorage from '@react-native-async-storage/async-storage';
import { RootState, Items, HistoryItems, Actions } from '../../Helpers/Types';

export const addItem = (item: string) => ({
  type: Actions.AddItem,
  payload: item,
});

export const updateItem = (oldValue: string, newValue: string) => ({
  type: Actions.UpdateItem,
  payload: { oldValue, newValue },
});

export const markItem = (value: string) => ({
  type: Actions.MarkItem,
  payload: value,
});

export const deleteItem = (value: string) => ({
  type: Actions.DeleteItem,
  payload: value,
});

export const addUserActionHistory = () => (dispatch: (arg: {type: string, payload: Items}) => void, getState: () => RootState) => {
  const items = getState().items;
  dispatch({ type: Actions.addUserActionHistory, payload: items || []});
};

export const undoUserAction = (data: HistoryItems) => ({
  type: Actions.undoUserAction,
  payload: data,
});

export const loadItems = () => async (dispatch: (arg: {type: string, payload: Items}) => void) => {
  const value = await AsyncStorage.getItem('List');
  if (value !== null) {
    dispatch({ type: Actions.LoadItems, payload: JSON.parse(value) });
  }
};

export const downloadItems = () => async (dispatch: (arg: {type: string, payload: Items}) => void) => {
  const value = await fetch('https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app/list.json');
  if (value !== null) {
    const jsonValue = await value.json();
    dispatch({ type: Actions.DownloadItems, payload: jsonValue });
  }
};

export const saveItems = (value: Items) => async () => {
  const jsonValue = JSON.stringify(value);
  await AsyncStorage.setItem('List', jsonValue);
};

export const uploadItems = (value: Items) => async () => {
  const jsonValue = JSON.stringify(value);
  fetch('https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app/list.json', {
    method: 'PUT',
    body: jsonValue,
  });
};

export const showError = (value: string) => ({
  type: Actions.ShowError,
  payload: value,
});

export const login = () => async (dispatch: (arg: {type: string, payload: boolean}) => void) => {
  const jsonValue = JSON.stringify(true);
  await AsyncStorage.setItem('isLogged', jsonValue);
  const result = await AsyncStorage.getItem('isLogged');
  dispatch({ type: Actions.LoginCheck, payload: result && JSON.parse(result) });
};

export const logout = () => async (dispatch: (arg: {type: string, payload: boolean}) => void) => {
  const JSONloginStatus = JSON.stringify(false);
  await AsyncStorage.setItem('isLogged', JSONloginStatus);
  const loginStatus = await AsyncStorage.getItem('isLogged');
  dispatch({ type: Actions.LoginCheck, payload: loginStatus && JSON.parse(loginStatus) });
};

export const checkLogin = () => async (dispatch: (arg: {type: string, payload: boolean}) => void) => {
  const value = await AsyncStorage.getItem('isLogged');
  if (value !== null) {
    dispatch({ type: Actions.LoginCheck, payload: JSON.parse(value) });
  }
};

export const changeStyle = () => async (dispatch: (arg: {type: string, payload: boolean}) => void) => {
  const jsonResult = await AsyncStorage.getItem('style');
  const result = jsonResult ? JSON.parse(jsonResult) : null;
  if (result === null) {
    const jsonValue = JSON.stringify(true);
    await AsyncStorage.setItem('style', jsonValue);
    dispatch({ type: Actions.StyleChange, payload: true });
  } else {
    dispatch({ type: Actions.StyleChange, payload: !result });
    const jsonValue = JSON.stringify(!result);
    await AsyncStorage.setItem('style', jsonValue);
  }
};

export const getStyle = () => async (dispatch: (arg: {type: string, payload: boolean}) => void) => {
  const jsonResult = await AsyncStorage.getItem('style');
  const result = jsonResult ? JSON.parse(jsonResult) : null;
  if (result === null) {
    dispatch({ type: Actions.StyleGet, payload: true });
  } else {
    dispatch({ type: Actions.StyleGet, payload: result });
  }
};
