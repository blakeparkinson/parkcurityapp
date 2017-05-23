import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container } from 'native-base';

import PhotoView from 'react-native-photo-view';

const win = Dimensions.get('window');
import Moment from 'moment-timezone';



class Image extends Component {
  static navigationOptions = {
    title: 'Photo',
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
    var fomatted_date = Moment(params.photo.content.createdAt).tz('America/Denver').format('MM/DD/YY hh:mm a');
    return (
      <View style={styles.parent}> 
        <View style={styles.main}>
          <PhotoView
          source={{uri: params.photo.content.url}}
          minimumZoomScale={0.5}
          maximumZoomScale={3}
          androidScaleType="center"
          onLoad={() => console.log("Image loaded!")}
          style={{width: (win.height - (win.height  * .2)) , height: win.height - (win.height * .25), transform: [{ rotate: '270deg'}]}} />
        </View>
        <View style={styles.bottom}>
          <Text style={styles.text}>Pinch to Manipulate</Text>
        </View>
        <View style={styles.bottom2}>
           <Text style={styles.camera}>Camera ID: {params.photo.content.cameraId}</Text>
           <Text style={styles.date}>{fomatted_date}</Text>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  parent:{
    flex: 1,
    justifyContent: 'center',
    flexDirection: 'column',
    backgroundColor: '#01D0A7'
 },

  bottom: {
    flex:0.5,
    alignItems: 'center',
    justifyContent: 'center'
  },
  bottom2: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 20,
    marginLeft: 20,
    marginRight:20
  },
  text:{
    fontFamily: 'Noteworthy',
    color: 'white',
    fontSize:20
  },
  date:{
      alignItems: 'flex-end',
      fontFamily: 'Helvetica Neue',
      color: 'white'
    },
    camera:{
      fontFamily: 'Helvetica Neue',
      color: 'white'
    },
});

export default Image;
