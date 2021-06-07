import React from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';

import StackMain from './App/Navigation/StackMain';

import ModalError from './App/Screens/ModalErrorScreen';
import Store from './App/redux/store';

export default function App() {
  return (
    <Provider store={Store}>
      <ModalError />
      <Root>
        <StackMain />
      </Root>
    </Provider>
  );
}
