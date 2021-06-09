import { StyleSheet } from 'react-native';
import { black } from '../../Constants/Colors';
import { white } from '../../Constants/Colors';

export default StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10,
  },
  body: {
    margin: 10,
    backgroundColor: white,
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    shadowColor: black,
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.5,
    shadowRadius: 4,
    elevation: 10,
  },
});
