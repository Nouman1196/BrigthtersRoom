import 'react-native-gesture-handler';
import React from 'react';
import Routes from './src/navigation/index';
import store from './src/redux/Store'
import { Provider } from 'react-redux'
import MusicLoader from './src/components/Helpers/MusicLoader';

export default class App extends React.Component {
  render() {
    return (

      <Provider store={store}>
        <MusicLoader />
        <Routes />
      </Provider>

    )
  }
}