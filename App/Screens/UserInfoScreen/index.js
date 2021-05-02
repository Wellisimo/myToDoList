import React, { useState, useEffect } from 'react';
import {
  Text, View, Image, TouchableOpacity,
} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import { connect } from 'react-redux';

import ButtonElement from '../../Components/ButtonElement';
import Input from '../../Components/Input';

import { interaction } from '../../redux/actions/index';

import styles from './styles';
import globalStylesWhite from '../../Styles/Light';
import globalStylesDark from '../../Styles/Dark';

const userInfoScreen = (props) => {
  const [name, setName] = useState('');
  const [age, setAge] = useState('');
  const [image, setImage] = useState(null);
  const [editable, setEditable] = useState(false);

  const globalStyles = props.style ? globalStylesWhite : globalStylesDark;

  useEffect(() => {
    (async () => {
      if (Platform.OS !== 'web') {
        const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
        if (status !== 'granted') {
          alert('Sorry, we need camera roll permissions to make this work!');
        }
      }
    })();
    // implement login+password instead of 'userinfo' saving pattern
    AsyncStorage.getItem('userInfo')
      .then((result) => JSON.parse(result))
      .then((parsedResult) => {
        if (parsedResult) {
          setName(parsedResult.name);
          setAge(parsedResult.age);
          setImage(parsedResult.image);
        }
      });
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
      <Text style={[styles.text, globalStyles.mainText]}>User Info</Text>
      <TouchableOpacity
        onPress={() => {
          editable ? pickImage : null;
          // props.interaction('Image')
          props.route.params.callBack('Image');
        }}
      >
        <Image
          style={styles.image}
          resizeMethod="resize"
          source={
                        image
                          ? { uri: image }
                          : { uri: 'https://dt2sdf0db8zob.cloudfront.net/wp-content/uploads/2019/12/9-Best-Online-Avatars-and-How-to-Make-Your-Own-for-Free-image1-5.png' }
                    }
        />
      </TouchableOpacity>
      {
                !editable
                  ? (
                    <Text style={[styles.text, globalStyles.mainText]}>
                      Name:
                      {name}
                    </Text>
                  )
                  : (
                    <Input
                      value={name}
                      textInputHandler={setName}
                      placeholder="Name"
                    />
                  )
            }
      {
                !editable
                  ? (
                    <Text style={[styles.text, globalStyles.mainText]}>
                      Age:
                      {age}
                    </Text>
                  )
                  : (
                    <Input
                      value={age}
                      textInputHandler={setAge}
                      placeholder="Age"
                    />
                  )
            }
      <ButtonElement
        title={!editable ? 'Edit' : 'Save'}
        onPress={() => {
          if (editable) {
            const jsonValue = JSON.stringify({
              name,
              age,
              image,
            });
            AsyncStorage.setItem('userInfo', jsonValue);
          }
          // props.interaction(`${!editable ? 'Edit' : 'Save'} button`)
          props.route.params.callBack(`${!editable ? 'Edit' : 'Save'} button`);
          setEditable(!editable);
        }}
      />
    </View>
  );
};

const mapStateToProps = (state) => ({
  style: state.style,
});

export default connect(mapStateToProps, { interaction })(userInfoScreen);
