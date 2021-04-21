import AsyncStorage from '@react-native-async-storage/async-storage';

export default class GetStore {
    store = [];

    loadStore = async function () {
        let keys = await AsyncStorage.getAllKeys();
        let fullStorage = await Promise.all(keys.map(async (key) => {
            let value = await AsyncStorage.getItem(key);
            let jsonValue = JSON.parse(value);
            return {[key]: jsonValue};
        }))
        this.store = fullStorage;
    }

    getStatus = function(key) {
        let myData = this.store.find((object) => object.hasOwnProperty(key))
        return myData[key]
    }
}