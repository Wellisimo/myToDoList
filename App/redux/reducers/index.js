import {combineReducers} from 'redux';
 
const itemsReducer = (items=[], action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            if (action.payload !== '') {
                return [...items, {value: action.payload, done: false}];
            }
            return items;
        case 'UPDATE_ITEM':
            if (action.payload.newValue !== '' && action.payload.newValue !== action.payload.oldValue) {
                let updateTarget = items.find((element) => element.value === action.payload.oldValue)
                let updateTargetIndex = items.indexOf(updateTarget);
                let modifiedUpdateTarget = {value: action.payload.newValue, done: updateTarget.done};
                let newUpdateList = [...items];
                newUpdateList.splice(updateTargetIndex, 1, modifiedUpdateTarget);
                return newUpdateList;
            }
            return items;
        case 'MARK_ITEM':
            let markTarget = items.find((element) => element.value === action.payload)
            let markTargetIndex = items.indexOf(markTarget);
            let modifiedMarkTarget = {value: markTarget.value, done: !markTarget.done};
            let newMarkList = [...items];
            newMarkList.splice(markTargetIndex, 1, modifiedMarkTarget);
            return newMarkList;   
        case 'DELETE_ITEM':
            return items.filter((element) => element.value !== action.payload)
        case 'LOAD_ITEMS':
            return action.payload;
        case 'DOWNLOAD_ITEMS':
            return action.payload;
        case 'UNDO_ITEMS':
            if (action.payload && action.payload.length) {
                return action.payload[action.payload.length-1]
            }
            return items
        default: 
            return items;
        }
};

const historyReducer = (history=[], action) => {
    let condition = () => {
        if (history.length) {
            let lastState = history[history.length - 1];
            let jsonLastState = JSON.stringify(lastState);
            let jsonPayload = JSON.stringify(action.payload);
            if (jsonLastState === jsonPayload) {
                return false;
            };
        }
        return true;
    }
    if (action.type === 'ADD_HISTORY' && condition()) {
        return [...history, action.payload]
    }
    if (action.type === 'UNDO_ITEMS' && history.length > 0) {
        return history.slice(0, history.length - 1)
    }
    return history
}

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

const loginReducer = (login=false, action) => {
    if (action.type === 'LOGIN_CHECK') {
        return action.payload
    }
    return login
}

const styleReducer = (light=true, action) => {
    if (action.type === 'STYLE_CHANGE') {
        return action.payload
    }
    if (action.type === 'STYLE_GET') {
        return action.payload
    }
    return light
}

export default combineReducers({
    items: itemsReducer,
    error: errorReducer,
    test: interactionReducer,
    login: loginReducer,
    history: historyReducer,
    style: styleReducer,
});