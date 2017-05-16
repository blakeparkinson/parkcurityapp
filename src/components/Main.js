import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight, ActivityIndicator, Image} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Button } from 'native-base';
import Moment from 'moment-timezone';



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
        var fomatted_date = Moment(images[i].createdAt).tz('America/Denver').format('MM/DD/YY hh:mm a');
        imageDisplay.push(

          <Card key={i}
          onPress={() => navigate('Image', { photo: images[i] })}>
                        <CardItem>
                          </CardItem>
                          <CardItem cardBody>
                             <Image
          style={styles.stretch} resizeMode='cover'
          source={{uri: images[i].url}}key={i}/>
                          </CardItem>
                          <View style={styles.bottomContent}>
                          <Button transparent>
                          <Icon active name="camera" />
                                  <Text>{images[i].cameraId}</Text>
                              </Button>
                                                    <Button transparent>

                          <Text style={styles.date}>{fomatted_date}</Text>
                                                        </Button>

                          </View>
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
  },
    date:{
      alignItems: 'flex-end',
    },
    bottomContent:{
        flex:1,
        flexDirection:'row',
        alignItems:'stretch',
        justifyContent:'space-between'
    }
});

export default Main;
