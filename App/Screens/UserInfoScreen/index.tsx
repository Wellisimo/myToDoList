import React, { useState, useEffect } from 'react';
import { View, Image, TouchableOpacity, Platform } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { useDispatch } from 'react-redux';

import Typography from '../../Components/Typography';
import ButtonElement from '../../Components/ButtonElement';
import Input from '../../Components/Input';

import { showError } from '../../redux/actions/index';
import { useAppSelector } from '../../redux/useAppSelector';
import styles from './styles';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';
import { Avatar } from '../../Constants/URL';

type UserInfoScreenProps = {
  navigation: {
    [key: string]: (arg?: any) => boolean;
  };
};

enum dataEdit {
  Edit = 'Edit',
  Save = 'Save',
}

const UserInfoScreen: React.FC<UserInfoScreenProps> = ({ navigation }) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState('');
  const [editable, setEditable] = useState(false);
  const isLightThemeEnabled = useAppSelector(({ isLightThemeEnabled }) => isLightThemeEnabled);
  const dispatch = useDispatch();

  const globalStyles = isLightThemeEnabled ? globalStylesWhite : globalStylesDark;

  useEffect(() => {
    // granting permission to chose image, when screen active
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

      // loading user info from local storage
      (async () => {
        const userInfo = await AsyncStorage.getItem('userInfo');
        const parsedUserInfo = userInfo && JSON.parse(userInfo);
        if (parsedUserInfo) {
          setName(parsedUserInfo.name);
          setAge(parsedUserInfo.age);
          setImage(parsedUserInfo.image);
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
      <Typography type={'h3'} darkModeEnabled={!isLightThemeEnabled}>
        User Info
      </Typography>
      <TouchableOpacity
        onPress={() => {
          navigation.setParams({ message: 'Image' });
          editable && pickImage();
        }}>
        <Image
          style={styles.image}
          resizeMethod="resize"
          source={
            // checking if user did chose picture, if not - showing default avatar
            image
              ? { uri: image }
              : {
                uri: Avatar,
              }
          }
        />
      </TouchableOpacity>
      {!editable ? (
        <Typography type={'h4'} paddingTop={10} darkModeEnabled={!isLightThemeEnabled}>
          Name: {name}
        </Typography>
      ) : (
        <Input text={name} textInputHandler={setName} onFocus={navigation.setParams} placeholder="Name" />
      )}
      {!editable ? (
        <Typography type={'h4'} paddingVertical={10} darkModeEnabled={!isLightThemeEnabled}>
          Age: {age}
        </Typography>
      ) : (
        <Input text={age} textInputHandler={setAge} onFocus={navigation.setParams} placeholder="Age" />
      )}
      <ButtonElement
        title={!editable ? dataEdit.Edit : dataEdit.Save}
        onPress={() => {
          navigation.setParams({ message: !editable ? dataEdit.Edit : dataEdit.Save });
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
