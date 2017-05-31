import React, { Component } from 'react';
import {Image, StyleSheet, View, Dimensions, Text, ScrollView, TouchableOpacity, RefreshControl} from 'react-native';
import {Container, Button} from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as ActionCreators from '../actions';

import HeaderItem from './HeaderItem';

const win = Dimensions.get('window');

class ThumbPage extends Component {
  constructor(props) {
    super(props);
    this.state = 
        {   
            offset: 0,
            limit: 15,
            refreshing: false,
            fetching: false
        };
      
  }

   async componentWillMount() { 
      this.init();
  }

  async init(offset = 0, limit = 15){
    var pics = await this.setupData(offset, limit);
    console.log(pics);
    this.setState(
        {   
            data: pics
        }
      )
  }

  setupData(offset, limit){

    return this.props.getPhotos(offset, limit)
      .then((response) => {
        this.setState({refreshing: false, fetching: false});
        var pics = response.json();
        
        return pics;
    })
  }

  loadMore = (event) => {
    if (!this.state.refreshing){
      this.setState(
        {
            offset: this.state.offset + 1,
            fetching: true
        }
      );
      this.init(this.state.offset, 15);

    }

  }
  
  static navigationOptions = {
    title: 'Thumbs',
     headerStyle: {
      backgroundColor: '#f9f9ff'
    },
    headerTintColor: "#01D0A7",
    headerTitleStyle:{
      fontFamily: 'AppleSDGothicNeo-Light'
    }
  }

onRefresh = (event) => {
    if (!this.state.refreshing){
      this.setState({refreshing: true});
      this.init();
    }

  }



renderThumbs(){
    const { navigate } = this.props.navigation;
    if (!this.state.data || !this.state.data.length){
        return;
    }
    return this.state.data.map((photo, index) => {
        if (!photo){
            return;
        }
        return (
            <TouchableOpacity onPress={() => {navigate('Image', { photo: photo })}} key={Math.random()}>
                <Image style={styles.photo} source={{uri: photo.url}} key={Math.random()}/>
            </TouchableOpacity>
        )
    });

  }

render(){
    return (
    <View>
    <HeaderItem navigation={this.props.navigation} viewMode="picture"></HeaderItem>
    <Button block light onPress={this.loadMore}>
        <Text style={{color: '#01D0A7'}}>Load More</Text>
    </Button>
      <ScrollView
          refreshControl={
          <RefreshControl
            refreshing={this.state.refreshing}
            onRefresh={this.onRefresh.bind(this)}
          />
        }>
        <Container>
            <ScrollView style={{flex:1}}>

            <View style={styles.thumbs}>
                {this.renderThumbs()}
          </View>
          </ScrollView>
        </Container>
        </ScrollView>
    </View>
    )
  }
  
}
const styles = StyleSheet.create({
    thumbs:{
        flexDirection:'row',
        flexWrap: 'wrap'
    },
    photo:{
        width: win.width / 3 ,
        height: (win.width / 3) * .73,
    },
    container:{
        backgroundColor: '#01D0A7'
    },
    spinner:{
      flexDirection:'row',
      alignItems: 'center',
      justifyContent: 'center',
      flex: 3
    },
    buttonBlock:{
        color: '#01D0A7'
    }
});

function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return { 'hello': true};
}

export default connect(mapStateToProps, mapDispatchToProps)(ThumbPage);