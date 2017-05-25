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

  find_dimensions(e){
    //console.log(e);
  }

  render(){
    return (
      <Card key={Math.random()} onLayout={(event) => { this.find_dimensions(event.nativeEvent.layout) }}>
        <CardItem cardBody>
        </CardItem>
            <View style={styles.bottomContent}>
                <View style={styles.bottomView}>
                    <Icon active name="camera" style={{color: '#046552'}} />
                    <Text style={styles.camera}>{this.recordData.cameraId}</Text>
                </View>
                <View style={styles.bottomView}>
                    <Text style={styles.date}>{this.fomatted_date}</Text>
                </View>

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
    flex:1, width: 300, height: 225
  },
    date:{
      alignItems: 'flex-end',
      fontFamily: 'Helvetica Neue',
      color: '#878686'
    },
    camera:{
      fontFamily: 'Helvetica Neue',
      color: '#878686'
    },
    bottomContent:{
      flex:1,
      flexDirection:'row',
      alignItems:'stretch',
      justifyContent:'space-between',
      backgroundColor: '#eaf1ef',
      padding:15
    },
    bottomView:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center'
    }
});