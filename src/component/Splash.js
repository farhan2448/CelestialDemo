/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import timer from 'react-native-timer';
import {
  StyleSheet,
  Image,
  StatusBar,
  Dimensions,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

//var ViewPager = require("react-native-viewpager");
//var data = JSON.parse(mjson);
export default class Splash extends Component {
  constructor(props) {
    super(props);
    this.deviceWidth = Dimensions.get('window').width;
    this.adCount = 0;
    this.prevUrl = '';
    this.state = {
      isLoading: false,
      isDone: false,
      hello: '',
    };
  }
  componentWillMount() {
    timer.setTimeout(
      'test',
      () => {
        this.props.navigation.navigate('Home');
      },
      4000,
    );
  }
  render() {
    return (
      <View style={[styles.container]}>
        <StatusBar backgroundColor="#ffff00" barStyle="dark-content" />
        <Image source={require('./../../assets/logo.png')} />
      </View>
    );
  }
}
export const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    width,
    height,
  },
  shadow: {
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,
    shadowRadius: 8,

    elevation: 5,
  },
  upper: {
    color: 'gray',

    alignSelf: 'center',
    textAlign: 'center',
  },
});
