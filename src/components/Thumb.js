import React, { Component } from 'react';
import {Image, StyleSheet, View, Dimensions, Tex, ScrollView, TouchableOpacity} from 'react-native';

import {Container, Spinner} from 'native-base';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'

const win = Dimensions.get('window');

export default class Thumb extends Component {
  constructor(props) {
    super(props);
  }

  renderThumbs(){
    const { navigate } = this.props.navigation;
    if (!this.props.photos.length || !this.props.photos[0].content){
        return;
    }
    return this.props.photos.map((photo, index) => {
        if (!photo || !photo.content){
            return;

        }
        return (
            <TouchableOpacity onPress={() => {navigate('Image', { photo: photo })}} key={Math.random()}>
                <Image style={styles.photo} source={{uri: photo.content.url}} key={Math.random()}/>
            </TouchableOpacity>
        )
    });

  }

  render(){
    return (
      <Container>
          <ScrollView>
            <View style={styles.thumbs}>
                {this.renderThumbs()}
          </View>
        </ScrollView>
    </Container>

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
    }
});