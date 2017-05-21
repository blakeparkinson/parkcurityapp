import React, { Component } from 'react';
import { View, Text } from 'react-native';

import PhotoView from 'react-native-photo-view';


class Image extends Component {
  static navigationOptions = {
    title: 'Image',
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
    console.log(params);

    return (
      <View>
        <PhotoView
        source={{uri: params.photo.content.url}}
        minimumZoomScale={0.5}
        maximumZoomScale={3}
        androidScaleType="center"
        onLoad={() => console.log("Image loaded!")}
        style={{width: 350, height: 263}} />
      </View>
    );
  }
}

export default Image;
