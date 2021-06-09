import { StyleSheet } from 'react-native';
import { black } from '../../Constants/Colors';
import { white } from '../../Constants/Colors';
import { grey } from '../../Constants/Colors';

type globalStylesProps = {
  background: {
    backgroundColor: string;
  };
  navigationHeader: {
    backgroundColor: string;
  };
  buttonContainer: {
    backgroundColor: string;
    borderColor: string;
  };
  tabBarOptions: {
    backgroundColor: string;
  };
};

const DarkStyles: globalStylesProps = StyleSheet.create({
  background: {
    backgroundColor: black,
  },
  navigationHeader: {
    backgroundColor: black,
    borderBottomColor: white,
  },
  buttonContainer: {
    backgroundColor: black,
    borderColor: white,
  },
  tabBarOptions: {
    backgroundColor: grey,
  },
});

export default DarkStyles;
