import React from 'react';
import { Root } from 'native-base';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import StackMain from './App/Navigation/StackMain';
import reducers from './App/redux/reducers';

import ModalError from './App/Screens/ModalErrorScreen';

export default function App() {
  return (
    <Provider store={createStore(reducers, applyMiddleware(thunk))}>
      <ModalError />
      <Root>
        <StackMain />
      </Root>
    </Provider>
  );
}
