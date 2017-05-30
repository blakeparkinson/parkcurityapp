import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Right,
  Left
} from 'react-native';

import { Header, Title, Container, Button, Icon } from 'native-base';
import SvgUri from 'react-native-svg-uri';
import Moment from 'moment-timezone';

import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import * as ActionCreators from '../actions'


class HeaderItem extends Component {
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

    return this.props.getPhotoLimit()
      .then((response) => {
        return response;
    })
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
       <View style={styles.header}>
             <View style={styles.subheader}>
               <Button small outline bordered light onPress={() => navigate('Video', { })}>
                    <Icon name='videocam' />
              </Button>
              <Text style={styles.text}>Live Stream</Text>


             </View>
             <View style={styles.subheader}>
               <SvgUri style={styles.badGuy} width="40" height="40" fill="#E3E3E3" source={require('../img/badguy.svg')} />
               <Text style={styles.text}>Bad Guys:</Text>
              {this.state.data &&

                <Text style={styles.text2}>{this.state.data.count}</Text>
              }

             </View>
             <View style={styles.subheader}>
               <Button small outline bordered light onPress={() => {this.viewClick();}}>
                    <Icon name='md-apps' />
              </Button>
              {this.props.picView ? (
                  <Text style={styles.text}>List View</Text>
              ):(

                  <Text style={styles.text}>Picture View</Text>
              )}

             </View>

          
        </View>
    );
  }

  viewClick(){
    this.props.callback();            
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
    fontFamily: 'Noteworthy',
    marginTop: 10
  },
  text2:{
    color: 'white',
    fontSize: 14,
    fontFamily: 'Noteworthy',
    fontWeight: 'bold'
  },
  badGuy:{
    marginLeft: 5
  },
  button:{
    backgroundColor: '#eaf1ef'
  }
  
});


function mapDispatchToProps(dispatch) {
  return bindActionCreators(ActionCreators, dispatch);
}

function mapStateToProps(state) {
  return {
    data: state.data
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HeaderItem);