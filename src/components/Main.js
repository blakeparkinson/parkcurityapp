import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight, ActivityIndicator} from 'react-native';
import { getImages } from '../actions/index';


class Main extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: null
    }
  }
  static navigationOptions = {
    title: 'Main',
  }

  async componentWillMount() { 
    this.setState(
      {data: await this.getImages()},
    )
}

getImages(id) {
    return fetch('https://parkcurity.herokuapp.com/photo')
      .then((response) => response.json())
      .then((responseJson) => {
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}
  render() {
   const { navigate } = this.props.navigation;

   if (!this.state.data) {
      return (
        <ActivityIndicator
          animating={true}
          style={styles.indicator}
          size="large"
        />
      );
    }

  
    return (
      <View>
        <Text>React Native</Text>
        <Text
        onPress={() => navigate('Image', { user: 'Lucy' })}>
        HUWWO {this.state.data.result[0].url}</Text>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  }
});

export default Main;
