import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions } from 'react-native';
import { Container, Spinner } from 'native-base';

import PhotoView from 'react-native-photo-view';

const win = Dimensions.get('window');
import Moment from 'moment-timezone';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'

class Image extends Component {

  constructor(props) {
    super(props);

    this.state = {
      photo: undefined
    }
  }
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

    componentWillMount() {
      if (this.props.navigation.state.params.imageId){
        this.props.getPhotoById(this.props.navigation.state.params.imageId).then((response) =>{
          console.log(response);
          this.setState({photo: response});

        });
      }
      else{
        this.setState({photo: this.props.navigation.state.params.photo.content});

      }
    }

  render() {


    if (!this.state.photo){
       return <View style={styles.spinner}><Spinner key={Math.random()}/></View>
    }
    var fomatted_date = Moment(this.state.photo.createdAt).tz('America/Denver').format('MM/DD/YY hh:mm a');
    return (
      <View style={styles.parent}> 
        <View style={styles.main}>
          <PhotoView
          source={{uri: this.state.photo.url}}
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
           <Text style={styles.camera}>Camera ID: {this.state.photo.cameraId}</Text>
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
    spinner:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 3
    }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    params: {}
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Image);