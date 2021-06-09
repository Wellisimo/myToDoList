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

const LightStyles: globalStylesProps = StyleSheet.create({
  background: {
    backgroundColor: white,
  },
  navigationHeader: {
    backgroundColor: white,
    borderBottomColor: black,
  },
  buttonContainer: {
    backgroundColor: white,
    borderColor: black,
  },
  tabBarOptions: {
    backgroundColor: grey,
  },
});

export default LightStyles;
