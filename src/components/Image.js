import React, { Component } from 'react';
import { View, Text } from 'react-native';

class Image extends Component {
  static navigationOptions = {
    title: 'Image',
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
