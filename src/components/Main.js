import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView, RefreshControl} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Button, Header, Title, Spinner} from 'native-base';
import Dataset from 'impagination';
import PushNotification from 'react-native-push-notification';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'

import MainItem from './MainItem';
import HeaderItem from './HeaderItem';
import Thumb from './Thumb';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      datasetState: null,
      picView: false,
      refreshing: false
    };
    this.triggerRefresh = false;
    this.timer = false;
    this.currentItemIndex = 0;
  }

  static navigationOptions = () => {
    return{
    title: 'Main',
    headerStyle: {
      backgroundColor: '#f9f9ff'
    },
    headerTintColor: "#01D0A7",
    headerTitleStyle:{
      fontFamily: 'AppleSDGothicNeo-Light'
    }
    }
  }


  setupImpagination() {

    var props = this.props;
    var that = this;
    let dataset = new Dataset({
      pageSize: 10,
      loadHorizon: 10,

      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe: (datasetState) => {
        this.setState({refreshing: false});
        this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {

        return props.getPhotos(pageOffset, pageSize)
           .then((response) => {
             var p = response.json();
             setTimeout(() => {
                
                that.setState({refreshing: false});

            }, 300);

             return p;
           })
      }
    });

    // Set the readOffset to the first record in the state
    dataset.setReadOffset(0);
    this.setState({dataset});
    this.props.photos = this.state.datasetState;
  }

  componentWillMount() {
    this.setupImpagination();
  }

  componentDidMount(){

    var props = this.props;

    //props.navigation.navigate('Image', { imageId: "5922733ea327d90011bb8e22" })

    PushNotification.configure({

    // (optional) Called when Token is generated (iOS and Android)
    onRegister: function(token) {
        console.log( 'TOKEN:', token );
        props.saveToken(token);
    },

    // (required) Called when a remote or local notification is opened or received
    onNotification: function(notification) {
        console.log( 'NOTIFICATION:', notification );
        props.navigation.navigate('Image', { imageId: notification.data.imageId })
    },

    // ANDROID ONLY: GCM Sender ID (optional - not required for local notifications, but is need to receive remote push notifications)
    senderID: "YOUR GCM SENDER ID",

    // IOS ONLY (optional): default: all - Permissions to register.
    permissions: {
        alert: true,
        badge: true,
        sound: true
    },

    // Should the initial notification be popped automatically
    // default: true
    popInitialNotification: true,

    /**
      * (optional) default: true
      * - Specified if permissions (ios) and token (android and ios) will requested or not,
      * - if not, you must call PushNotificationsHandler.requestPermissions() later
      */
    requestPermissions: true,
    });
  }

  handlePicView(){
    if (this.state.picView){
          this.setState({picView: false});
    }
    else{
          this.setState({picView: true});
    }
  }


  renderItem(){
    const { navigate } = this.props.navigation;
    return this.state.datasetState.map((record, index) => {
        if (!record.isSettled) {
          return <Spinner key={Math.random()}/>;
        }
        return <TouchableOpacity onPress={() => {navigate('Image', { photo: record })}} key={index}>
                  <MainItem record={record} key={index} indexPass={index}/>
                </TouchableOpacity>;
    })

  }

  setCurrentReadOffset = (event) => {
    this.triggerRefresh = false;
    let itemHeight = 64;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let newItemIndex = Math.ceil(currentOffset / itemHeight);
    if (this.currentItemIndex != newItemIndex){
      this.state.dataset.setReadOffset(newItemIndex);
      this.currentItemIndex = newItemIndex;
    }

    this.checkForRefresh(event);
  }

  checkForRefresh = (event) =>{
    var threshold;
    if (this.state.picView){
      threshold = -70;
    }
    else{
      threshold = -70;
    }

    if (event.nativeEvent.contentOffset.y < threshold){

      if (!this.state.refreshing){
        this.setState({refreshing: true});
          //scrolling up refreshes  data
          this.setupImpagination();
      }
      
    }
    else{

      this.setState({refreshing: false});
      //user quickly unscrolled, don't refetch
    }
  }

  onRefresh = (event) => {
    if (!this.state.refreshing){
      this.setState({refreshing: true});
      this.setupImpagination();
    }

  }

  

  render() {
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };

    return (
      <Container>

       <HeaderItem triggerRefresh={this.triggerRefresh} callback={this.handlePicView.bind(this)} picView={this.state.picView}></HeaderItem>

       {!this.state.picView ? (
        <Content onScroll={this.setCurrentReadOffset} scrollEventThrottle={1} removeClippedSubviews={true}>
          {this.renderItem()}
        </Content>
       ) :(
        <ScrollView 
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
          <Thumb photos={this.state.datasetState} navigation={this.props.navigation}></Thumb>
        </ScrollView>
       )}
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
    flex:1, width: 300, height: 225
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

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    dataSet: state.datasetState
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Main);
