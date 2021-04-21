import { StyleSheet } from 'react-native';

export default styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: 15,
    paddingBottom: '45%',
    width: '100%',
    height: '100%',
    borderBottomColor: 'black',
    borderTopColor: 'black',
    borderBottomWidth: 1,
    borderTopWidth: 1,
  },
  tips: {
    alignSelf: 'flex-start',
    padding: 10,
  },
  buttonsContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },
});