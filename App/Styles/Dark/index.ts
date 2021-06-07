import { StyleSheet } from 'react-native';

type globalStylesProps = {
  background: {
    backgroundColor: string,
  },
  navigationHeader: {
    backgroundColor: string,
  },
  buttonContainer: {
    backgroundColor: string,
    borderColor: string,
  },
  tabBarOptions: {
    backgroundColor: string,
  }
}

const DarkStyles: globalStylesProps = StyleSheet.create({
  background: {
    backgroundColor: 'black',
  },
  navigationHeader: {
    backgroundColor: 'black',
  },
  buttonContainer: {
    backgroundColor: 'black',
    borderColor: 'white',
  },
  tabBarOptions: {
    backgroundColor: '#878787',
  },
});

export default DarkStyles;