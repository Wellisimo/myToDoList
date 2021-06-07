import React from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';

const styles = StyleSheet.create({
  h1: {
    fontSize: 24,
    lineHeight: 26,
    fontWeight: 'bold',
  },
  h2: {
    fontSize: 21,
    fontWeight: 'bold',
    lineHeight: 23,
  },
  h3: {
    fontSize: 18,
    lineHeight: 20,
  },
  h4: {
    fontSize: 16,
    lineHeight: 20,
  },
  h5: {
    fontSize: 14,
    lineHeight: 16,
  },
  h6: {
    fontSize: 12,
    lineHeight: 14,
  },
  h7: {
    fontSize: 10,
    lineHeight: 12,
    fontWeight: 'bold',
  },
  upperCase: {
    textTransform: 'uppercase',
  },
});

type MarginStyles = Partial<
  Pick<
    TextStyle,
    | 'marginBottom'
    | 'marginLeft'
    | 'marginRight'
    | 'marginTop'
    | 'marginVertical'
    | 'marginHorizontal'
    | 'paddingBottom'
    | 'paddingLeft'
    | 'paddingRight'
    | 'paddingTop'
    | 'paddingVertical'
    | 'paddingHorizontal'
  >
>;

type TypographyProps = TextProps &
  MarginStyles & {
    type: keyof typeof styles;
    color?: TextStyle['color'];
    fontWeight?: TextStyle['fontWeight'];
    upperCase?: boolean;
  };

const Typography: React.FC<TypographyProps> = ({
  type,
  color,
  fontWeight,
  style,
  upperCase,
  marginBottom,
  marginLeft,
  marginRight,
  marginTop,
  marginVertical,
  marginHorizontal,
  paddingBottom,
  paddingLeft,
  paddingRight,
  paddingTop,
  paddingVertical,
  paddingHorizontal,
  ...props
}) => (
  <Text
    style={[
      styles[type],
      {
        ...(color && { color }),
        ...(fontWeight && { fontWeight }),
        ...(upperCase && styles.upperCase),
        marginBottom,
        marginLeft,
        marginRight,
        marginTop,
        marginVertical,
        marginHorizontal,
        paddingBottom,
        paddingLeft,
        paddingRight,
        paddingTop,
        paddingVertical,
        paddingHorizontal,
      },
      style,
    ]}
    {...props}
  />
);

export default Typography;
