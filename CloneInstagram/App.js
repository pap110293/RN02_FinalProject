import React from 'react';
import {Provider} from 'react-redux';
import RootNavigation from './navigation/rootNavigation';
import store from './redux/store';

export default function App() {
  return (
    <Provider store={store}>
      <RootNavigation />
    </Provider>
  );
}
