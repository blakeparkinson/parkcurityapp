import React, { Component } from 'react';
import {Image, StyleSheet, View, Dimensions, Tex, ScrollView, TouchableOpacity} from 'react-native';

import {Container} from 'native-base';

const win = Dimensions.get('window');

export default class Thumb extends Component {
  constructor(props) {
    super(props);
  }

  renderThumbs(){
    const { navigate } = this.props.navigation;
    return this.props.photos.map((photo, index) => {
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
    }
});