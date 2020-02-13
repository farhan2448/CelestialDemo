/* eslint-disable prettier/prettier */
/* eslint-disable eqeqeq */
/* eslint-disable react-native/no-inline-styles */
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
  SafeAreaView,
  Dimensions,
  FlatList,
  TextInput,
  ActivityIndicator,
  View,
  Text,
} from 'react-native';

//var ViewPager = require("react-native-viewpager");
//var data = JSON.parse(mjson);
export default class Home extends Component {
  constructor(props) {
    super(props);
    this.deviceWidth = Dimensions.get('window').width;
    this.adCount = 0;
    this.prevUrl = '';
    this.state = {
      isLoading: false,
      isDone: false,
      hello: '',
      thumbUrl: '',
      page: 1,
      maxPage: 1,
      input_text: '',
      data: [],
    };
  }
  componentDidMount() {
    this.hitApi();
  }
  hitApi() {
    if (this.state.input_text == '') {
      //  alert('No New Pages');
      return;
    }
    if (this.state.page > this.state.maxPage) {
      this.setState({isLoading: false});
      alert('No New Pages');
      return;
    }
    this.setState({isLoading: true});
    let url = `https://api.flickr.com/services/rest/?method=flickr.photos.search&text=${this.state.input_text}&api_key=cb8e65679bb25463361e9da0faacad58&per_page=20&format=json&nojsoncallback=1&page=${this.state.page}`;

    fetch(url, {
      method: 'GET',
    })
      .then(response => response.json())
      .then(responseJson => {
        // //responseJson);
        if (responseJson.stat == 'ok') {
          // console.log(responseJson.thumb_url);
          // // let markers = [];
          let data = responseJson.photos.photo;
          // [...this.state.data, ...items]
          if (this.state.page == 1) {
            this.setState({
              data: data,
              maxPage: responseJson.photos.pages,
              page: this.state.page + 1,
              isLoading: false,
            });
          } else
            this.setState({
              data: [...this.state.data, ...data],
              maxPage: responseJson.photos.pages,
              page: this.state.page + 1,
              isLoading: false,
            });
        } else {
          alert('Zero result found');
          this.setState({
            isLoading: false,
          });
        }
      })
      .catch(error => {
        console.error(error);
      });
  }
  _renderItem(item) {
    // console.log(this.state.thumbUrl + '' + item.item.thumb);
    return (
      <View
        style={[styles.shadow,styles.row_style]}>
        <Image
          source={{
            uri: `https://farm${item.item.farm}.staticflickr.com/${item.item.server}/${item.item.id}_${item.item.secret}_m.jpg`,
          }}
          style={{
            flex: 1,
            // borderWidth: 1,
            // marginTop: 10,
            // height:100,
            // width:100
          }}
          resizeMode="cover"
        />

        {/* <Text style={styles.myText}>{unescape(x)}</Text> */}
      </View>
    );
  }

  render() {
    return (
      <SafeAreaView style={[styles.container]}>
        <View style={[styles.search_style]}>
          <TextInput
            style={{height: 40}}
            placeholder="Type here to search image!"
            onChangeText={text =>
              this.setState({input_text: text, page: 1}, function() {
                timer.clearTimeout('hitApi');
                timer.setTimeout(
                  'hitApi',
                  () => {
                    this.setState({
                      data: [],
                    });
                    this.hitApi();
                  },
                  500,
                );
              })
            }
            value={this.state.input_text}
          />
        </View>

        <FlatList
          style={{width,backgroundColor:'lightgray'}}
          numColumns={3}
          data={this.state.data}
          renderItem={this._renderItem.bind(this)}
          keyExtractor={this._keyExtractor}
          onEndReachedThreshold={1}
          ListFooterComponent={() =>
            this.state.isLoading ? (
              <View style={{justifyContent: 'center', flexDirection: 'row'}}>
                <ActivityIndicator size="small" color="#00A0DF" />
                <Text>Loading Content</Text>
              </View>
            ) : null
          }
          onEndReached={({distanceFromEnd}) => {
            this.hitApi();
          }}
        />
      </SafeAreaView>
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
  row_style:{
    flex: 1,
    backgroundColor: 'gray',
    height: 100,
    margin: 10,
  },
  search_style: {
    width: width - 10,
    margin: 5,
    paddingHorizontal: 10,

    borderWidth: 2,
    borderRadius: 2,
    borderColor: 'gray',
    justifyContent: 'center',
  },
  shadow: {
  
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.4,


    elevation: 5,
  },
  upper: {
    color: 'gray',

    alignSelf: 'center',
    textAlign: 'center',
  },
});
