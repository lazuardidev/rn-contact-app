import React from 'react';
import {Provider} from 'react-redux';
import Routes from './src/routes/index.tsx';
import store from './src/hooks/store/store.ts';
import {PaperProvider} from 'react-native-paper';

export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <Routes />
      </PaperProvider>
    </Provider>
  );
}
