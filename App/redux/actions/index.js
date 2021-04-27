import AsyncStorage from '@react-native-async-storage/async-storage';

export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item
    };
};

export const updateItem = (oldValue, newValue) => {
    return {
        type: 'UPDATE_ITEM',
        payload: {oldValue: oldValue, newValue: newValue}
    };
};

export const markItem = (value) => {
    return {
        type: 'MARK_ITEM',
        payload: value
    };
};

export const deleteItem = (value) => {
    return {
        type: 'DELETE_ITEM',
        payload: value
    };
};

export const addHistory = (items) => {
    return {
        type: 'ADD_HISTORY',
        payload: items
    };
};

export const undoItems = (data) => {
    return {
        type: 'UNDO_ITEMS',
        payload: data
    };
};

export const loadItems = () => {
    return async (dispatch) => {
        const value = await AsyncStorage.getItem('List');
        if (value !== null) {
            dispatch({type: 'LOAD_ITEMS', payload: JSON.parse(value)});
        }
    };
};

export const downloadItems = () => {
    return async (dispatch) => {
        const value = await fetch('https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app/list.json');
        if (value !== null) {
            const jsonValue = await value.json();
            dispatch({type: 'DOWNLOAD_ITEMS', payload: jsonValue});
        }
    };
};

export const saveItems = (value) => {
    return async (dispatch) => {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem('List', jsonValue);
    };
};

export const uploadItems = (value) => {
    return async (dispatch) => {
        const jsonValue = JSON.stringify(value);
        fetch('https://mytodolist-d5e1a-default-rtdb.europe-west1.firebasedatabase.app/list.json', {
            method: 'PUT',
            body: jsonValue,
        })
    };
};

export const showError = (value) => {
    return {
        type: 'SHOW_ERROR',
        payload: value
    };
};

export const interaction = (item) => {
    return {
        type: 'PRESSED_ITEM',
        payload: item
    };
};

export const login = () => {
    return async (dispatch) => {
        const jsonValue = JSON.stringify(true);
        await AsyncStorage.setItem('isLogged', jsonValue);
        const result = await AsyncStorage.getItem('isLogged');
        dispatch({type: 'LOGIN_CHECK', payload: JSON.parse(result)});
    };
};

export const logout = () => {
    return async (dispatch) => {
        const jsonValue = JSON.stringify(false);
        await AsyncStorage.setItem('isLogged', jsonValue);
        const result = await AsyncStorage.getItem('isLogged');
        dispatch({type: 'LOGIN_CHECK', payload: JSON.parse(result)});
    };
};

export const checkLogin = () => {
    return async (dispatch) => {
        const value = await AsyncStorage.getItem('isLogged');
        if (value !== null) {
            dispatch({type: 'LOGIN_CHECK', payload: JSON.parse(value)});
        }
    };
};

export const changeStyle = () => {
    return async (dispatch) => {
        const jsonResult = await AsyncStorage.getItem('style');
        const result = jsonResult ? JSON.parse(jsonResult) : null;
        if (result === null) {
            const jsonValue = JSON.stringify(true);
            await AsyncStorage.setItem('style', jsonValue)
            dispatch({type: 'STYLE_CHANGE', payload: true});
        } else {
            dispatch({type: 'STYLE_CHANGE', payload: !result});
            const jsonValue = JSON.stringify(!result);
            await AsyncStorage.setItem('style', jsonValue)
        }
    };
};

export const getStyle = () => {
    return async (dispatch) => {
        const jsonResult = await AsyncStorage.getItem('style');
        const result = jsonResult ? JSON.parse(jsonResult) : null;
        if (result === null) {
            dispatch({type: 'STYLE_GET', payload: true});
        } else {
            dispatch({type: 'STYLE_GET', payload: result});
        }
    };
};