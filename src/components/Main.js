import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableOpacity, ActivityIndicator, Image, ScrollView} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Button, Header, Title, Spinner} from 'native-base';
import Dataset from 'impagination';

import MainItem from './MainItem';
import HeaderItem from './HeaderItem';
import Thumb from './Thumb';

class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      datasetState: null,
      picView: false
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
    let dataset = new Dataset({
      pageSize: 10,
      loadHorizon: 10,


      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe: (datasetState) => {
        this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://parkcurity.herokuapp.com/photo?offset=${pageOffset}&limit=${pageSize}`)
          .then(response => response.json())
          .catch((error) => {
            console.error(error);
          });
      }
    });

    // Set the readOffset to the first record in the state
    dataset.setReadOffset(0);
    this.setState({dataset});
  }

  componentWillMount() {
    this.setupImpagination();
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
    let itemHeight = 200;
    let currentOffset = Math.floor(event.nativeEvent.contentOffset.y);
    let newItemIndex = Math.ceil(currentOffset / itemHeight);
    if (this.currentItemIndex != newItemIndex){
      this.state.dataset.setReadOffset(newItemIndex);
      this.currentItemIndex = newItemIndex;
    }

    if (event.nativeEvent.contentOffset.y < -70){
      this.timer = setTimeout(() => {
        //scrolling up refreshes  data
        this.triggerRefresh = true;
        this.setupImpagination();
      }, 300);
    }

    else{

      //user quickly unscrolled, don't refetch
      clearTimeout(this.timer);
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
        <Content onScroll={this.setCurrentReadOffset} scrollEventThrottle={5} removeClippedSubviews={true}>
          {this.renderItem()}
        </Content>
       ) :(
        <Content>
          <Thumb photos={this.state.datasetState} navigation={this.props.navigation}></Thumb>
        </Content>
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

export default Main;
