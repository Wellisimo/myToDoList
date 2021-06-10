import { Platform, Dimensions } from 'react-native';

export default (() => {
    const IsIOS = () => Platform.OS === 'ios';
    const HasNotch = () => Dimensions.get('screen').height >= 812;
    return HasNotch() && IsIOS() ? 40 : IsIOS() ? 20 : 0;
})()