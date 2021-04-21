import {combineReducers} from 'redux';
 
const itemsReducer = (items=[], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            if (action.payload !== '') {
                return [...items, {value: action.payload, done: false}];
            }
            return items;
        case 'MARK_ITEM':
            let target = items.find((element) => element.value === action.payload)
            let targetIndex = items.indexOf(target);

            let modifiedTarget = {value: target.value, done: !target.done};

            let newList = [...items];
            newList.splice(targetIndex, 1, modifiedTarget);

            return newList;   
        case 'DELETE_ITEM':
            return items.filter((element) => element.value !== action.payload)
        case 'LOAD_ITEMS':
            return action.payload;
        case 'DOWNLOAD_ITEMS':
            return action.payload;
        default: 
            return items;
        }
};

const errorReducer = (error='', action) => {
    if (action.type === 'SHOW_ERROR') {
        return action.payload
    }
    return error
}

const interactionReducer = (pressed='', action) => {
    if (action.type === 'PRESSED_ITEM') {
        return action.payload
    }
    return pressed
}

export default combineReducers({
    items: itemsReducer,
    error: errorReducer,
    test: interactionReducer,
});