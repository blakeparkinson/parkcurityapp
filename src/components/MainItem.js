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

  getLabels(record){
    if (!record.labels || !record.labels.length){
      return '';
    }

    var limit = 3;
    var labelArray = [];
    for (var i = 0; i < record.labels.length; i++){
      if (labelArray.length < 3){
        labelArray.push(record.labels[i].Name);
      }
      else{
        break;
      }

    }
    return labelArray.toString();
  }


  getConfidence(record){
    var stringItem = '';

    if (!record.labels || !record.labels.length){
      return stringItem;
    }
    var stringItem;
    var validEntries = [ 'People', 'Person', 'Human', 'Group', 'Animal'];
        for (var i = 0; i < record.labels.length; i++){
          if (validEntries.indexOf(record.labels[i].Name) > -1){
            item = record.labels[i];
            stringItem = `${item.Name}: ${Math.round( item.Confidence * 10 ) / 10}%` 
            break;
          }
        }
    return stringItem;
  }

  cardStyle(){
    if (this.props.isMotion){
      return {
        backgroundColor: '#c1e1fd'
      };
    }
  }

  render(){
    var renderItem;
    if (this.props.isMotion){
        renderItem = this.getLabels(this.recordData);
      }
    else{
      renderItem = this.getConfidence(this.recordData);
    }

    return (
      <Card key={Math.random()} onLayout={(event) => { this.find_dimensions(event.nativeEvent.layout) }}>
        <CardItem cardBody>
        </CardItem>
        <CardItem style={this.cardStyle()}>
            <View style={styles.bottomContent}>
                <View style={styles.bottomView}>
                    <Text style={styles.camera}>{renderItem}</Text>
                    <Text style={styles.date}>{this.fomatted_date}</Text>
                </View>
            </View>
          </CardItem>
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
      fontFamily: 'Helvetica Neue',
      color: '#878686',
      alignItems: 'flex-end'
    },
    camera:{
      fontFamily: 'Helvetica Neue',
      color: '#046552',
      fontSize:10
    },
    bottomContent:{
      flexDirection:'row',
      padding:10,
      alignItems: 'center',
    justifyContent: 'center'
    },
    bottomView:{
      flex: 1,
      flexDirection:'row',
     alignItems: 'center',
    justifyContent: 'space-between'
    }
});