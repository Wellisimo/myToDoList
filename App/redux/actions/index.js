import AsyncStorage from '@react-native-async-storage/async-storage';

export const addItem = (item) => {
    return {
        type: 'ADD_ITEM',
        payload: item
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