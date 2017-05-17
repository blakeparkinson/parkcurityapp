import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View
} from 'react-native';

import {
  Card,
  CardItem,
  Button,
  Icon
} from 'native-base';

import Moment from 'moment-timezone';


export default class MainItem extends Component {
  constructor(props) {
    super(props);

    this.recordData = props.record.content;
    this.fomatted_date = Moment(this.recordData.createdAt).tz('America/Denver').format('MM/DD/YY hh:mm a');
  }

  render(){
    return (

      <Card key={Math.random()}onPress={() => navigate('Image', { photo: this.recordData })}>
        <CardItem cardBody>
            <Image style={styles.stretch} resizeMode='cover'source={{uri: this.recordData.url}} key={Math.random()}/>
        </CardItem>
            <View style={styles.bottomContent}>
                <Button transparent>
                    <Icon active name="camera" />
                    <Text>{this.recordData.cameraId}</Text>
                </Button>
                <Button transparent>
                    <Text style={styles.date}>{this.fomatted_date}</Text>
                </Button>

            </View>
        </Card>
    )
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