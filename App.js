/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';
import Splash from './src/component/Splash';
import Home from './src/component/Home';

const AppContainer = createAppContainer(
  createSwitchNavigator({
    Main: Splash,
    Home: Home,
  }),
);

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}
