import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useSelector, useDispatch } from 'react-redux';

import Typography from '../../Components/Text';
import ButtonElement from '../../Components/ButtonElement';
import Input from '../../Components/Input';

import { showError } from '../../redux/actions/index';
import { RootState } from '../../Helpers/Types';
import styles from './styles';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

type UserInfoScreenProps = {
  navigation: {
    [key: string]: (arg?: any) => boolean;
  };
}

const UserInfoScreen: React.FC<UserInfoScreenProps> = ({navigation}) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');
  const [editable, setEditable] = useState(false);
  const isLightThemeEnabled = useSelector(({isLightThemeEnabled}: RootState) => isLightThemeEnabled);
  const dispatch = useDispatch();

  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  useEffect(() => {
    const isFocused: boolean = navigation.isFocused();
    if (isFocused) {
      (async () => {
        if (Platform.OS !== 'web') {
          const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
          if (status !== 'granted') {
            dispatch(showError('Sorry, we need camera roll permissions to make this work!'));
          }
        }
      })();

      (async () => {
        const result = await AsyncStorage.getItem('userInfo');
        const parsedResult = result && JSON.parse(result);
        if (parsedResult) {
          setName(parsedResult.name);
          setAge(parsedResult.age);
          setImage(parsedResult.image);
        }
      })();
    }
  }, []);

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImage(result.uri);
    }
  };

  return (
    <View style={[styles.container, globalStyles.background]}>
      <Typography 
          type={'h3'}
          color={isLightThemeEnabled ? 'black' : 'white'}
      >User Info</Typography>
      <TouchableOpacity
        onPress={() => {
          navigation.setParams({ message: 'Image' });
          editable ? pickImage() : null;
        }}>
        <Image
          style={styles.image}
          resizeMethod="resize"
          source={
            image
              ? { uri: image }
              : {
                  uri: 'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png',
                }
          }
        />
      </TouchableOpacity>
      {!editable ? (
        <Typography
          type={'h4'}
          color={isLightThemeEnabled ? 'black' : 'white'}
        >
          Name: {name}
        </Typography>
      ) : (
        <Input text={name} textInputHandler={setName} onFocus={navigation.setParams} placeholder="Name" />
      )}
      {!editable ? (
        <Typography 
          type={'h4'}
          color={isLightThemeEnabled ? 'black' : 'white'}
        >
          Age: {age}
        </Typography>
      ) : (
        <Input text={age} textInputHandler={setAge} onFocus={navigation.setParams} placeholder="Age" />
      )}
      <ButtonElement
        title={!editable ? 'Edit' : 'Save'}
        onPress={() => {
          navigation.setParams({ message: !editable ? 'Edit' : 'Save' });
          if (editable) {
            const jsonValue = JSON.stringify({
              name,
              age,
              image,
            });
            AsyncStorage.setItem('userInfo', jsonValue);
          }
          setEditable(!editable);
        }}
      />
    </View>
  );
};

export default UserInfoScreen;