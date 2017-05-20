import React, { Component } from 'react';
import { View, Text } from 'react-native';

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
        <Text>React Native Boilerplate {params.user}</Text>
      </View>
    );
  }
}

export default Image;
