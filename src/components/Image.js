import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container } from 'native-base';

import PhotoView from 'react-native-photo-view';

const win = Dimensions.get('window');


class Image extends Component {
  static navigationOptions = {
    title: 'Photo',
     headerStyle: {
      backgroundColor: '#f9f9ff'
    },
    headerTintColor: "#01D0A7",
    headerTitleStyle:{
      fontFamily: 'AppleSDGothicNeo-Light'
    }
  }

  render() {
    const { params } = this.props.navigation.state;
    return (
      <View style={styles.parent}> 
        <View style={styles.main}>
          <PhotoView
          source={{uri: params.photo.content.url}}
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType="center"
          onLoad={() => console.log("Image loaded!")}
          style={{width: win.width, height: win.height - 200}} />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.text}>Pinch to Manipulate</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#01D0A7'
 },

  bottom: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  text:{
    fontFamily: 'Noteworthy',
    color: 'white',
    fontSize:20
  }
});

export default Image;
