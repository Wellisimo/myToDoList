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

const LightStyles: globalStylesProps = StyleSheet.create({
  background: {
    backgroundColor: 'white',
  },
  navigationHeader: {
    backgroundColor: 'white',
  },
  buttonContainer: {
    backgroundColor: 'white',
    borderColor: 'black',
  },
  tabBarOptions: {
    backgroundColor: '#878787',
  },
});

export default LightStyles;