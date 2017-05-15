import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight, ActivityIndicator, Image} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail } from 'native-base';

  var imageDisplay = [];

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
        this.handleImages(responseJson.result);
        return responseJson;
      })
      .catch((error) => {
        console.error(error);
      });
}

handleImages(images){
      for (var i = 0; i < images.length; i++ ){
        imageDisplay.push(

          <Card >
                        <CardItem>
                          </CardItem>
                          <CardItem cardBody>
                             <Image
          style={styles.stretch} resizeMode='cover'
          source={{uri: images[i].url}}key={i}/>
                          </CardItem>
                          <CardItem>
        
                              <Text>11h ago</Text>
                        </CardItem>
                   </Card>
          
        )
      }
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
      <Container>
        <Text
        onPress={() => navigate('Image', { photo: this.state.data.result[0] })}>
        HUWWOtttt</Text>
        {imageDisplay}
      </Container>
    );
  }
}

const styles = StyleSheet.create({
  indicator: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: 80
  },
    stretch: {
    flex:1, width: 200, height: 100
  }
});

export default Main;
