import React, { Component } from 'react';
import {Image, StyleSheet, View, WebView, Dimensions} from 'react-native';
import {Container} from 'native-base';

const win = Dimensions.get('window');

var Orientation = require('react-native-orientation');

export default class Video extends Component {
  constructor(props) {
    super(props);
    this.state = {
      height: 10,
    };
  }

  static navigationOptions = {
    title: 'Video',
     headerStyle: {
      backgroundColor: '#f9f9ff'
    },
    headerTintColor: "#01D0A7",
    headerTitleStyle:{
      fontFamily: 'AppleSDGothicNeo-Light'
    }
  }

  componentDidMount(){

      Orientation.unlockAllOrientations();
      Orientation.addOrientationListener(this.orientationDidChange);

  }

  componentWillUnmount() {
    Orientation.getOrientation((err, orientation) => {
      console.log(`Current Device Orientation: ${orientation}`);
    });
    Orientation.lockToPortrait();
    // Remember to remove listener
    Orientation.removeOrientationListener(this.orientationDidChange);

  }



render(){
      var html = '<!DOCTYPE html><html><body><script>window.location.hash = 1;document.title = document.height;</script></body></html>';
    return (
      <View style={styles.parent}>
          <WebView source={{uri: 'http://24.8.81.144/'}} 
          style={{height: this.state.height, width: this.state.width}}
          onNavigationStateChange={this.onNavigationStateChange.bind(this)} 
          scalesPageToFit={true} 
          automaticallyAdjustContentInsets={false}
        scrollEnabled={true}/>
    </View>

    )
  }
  
}
const styles = StyleSheet.create({
    parent:{
    flex: 5
 },
 video:{
 }
});