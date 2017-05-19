import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Right,
  Left
} from 'react-native';

import { Header, Title, Container } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import Moment from 'moment-timezone';


export default class HeaderItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
       data: null
    }
  }

  async componentWillMount() { 
      this.init();
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.triggerRefresh){
      this.init();
    }
  }

  async init(){
    this.setState(
        {data: await this.setupData()}
      )
  }

  setupData(){
    return fetch(`https://parkcurity.herokuapp.com/photolimit`)
      .then((response) => response.json())
      .then((responseJson) => {
        return this.formatData(responseJson);
      })
      .catch((error) => {
        console.error(error);
    });
  }

  render(){
    return (
       <View style={styles.header}>
             <View style={styles.subheader}>
               <SvgUri width="40" height="40" fill="#E3E3E3" source={require('../img/fireclock.svg')} />
               <Text style={styles.text}>Hottest Hour:</Text>
               {this.state.data &&
                   <Text style={styles.text2}>{this.state.data.hotHour}</Text>
               }
             </View>
             <View style={styles.subheader}>
               <SvgUri width="40" height="40" fill="#E3E3E3" source={require('../img/badguy.svg')} />
               <Text style={styles.text}>Bad Guys:</Text>
              {this.state.data &&

                <Text style={styles.text2}>{this.state.data.count}</Text>
              }

             </View>

          
        </View>
    );
  }

  formatData(data){
    var buckets = {};
    for (let item of data){
      var hour = Moment(item.createdAt).tz('America/Denver').format('H');
      if (buckets[hour]){
        buckets[hour] = buckets[hour] + 1;
      }
      else{
        buckets[hour] = {};
        buckets[hour] = 1
      }

    }
    
    var keys = Object.keys(buckets);
    var maxKey = keys[0];
    for (var i = 0; i < keys.length;  i++ ){
      if(buckets[keys[i +1 ]] > buckets[keys[i]]){
        maxKey = keys[i +1 ];
      }
    }

    var display = '';
    if (maxKey > 12){
      display = (maxKey - 12) + 'pm';
    }
    else {
      display = maxKey + 'am';
    }

    var items = {
      count: data.length,
      hotHour: display
    };
    return items;
  }

  
}

const styles = StyleSheet.create({
  header:{
    backgroundColor: '#01D0A7',
    flexDirection:'row',
    alignItems:'stretch',
    justifyContent:'space-between',
    padding:20
  },
  subheader:{
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center'
  },
  text:{
    color: 'white',
    fontSize: 10,
    marginTop: 10
  },
  text2:{
    color: 'white',
    fontSize: 12,
    fontWeight: 'bold'
  }
  
});