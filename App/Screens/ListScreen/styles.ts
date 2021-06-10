import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: '40%',
    width: '100%',
    height: '100%',
  },
  tips: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  row: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
  iconContainer: {
    height: 45,
    width: 45,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    right: 10,
  }
});
