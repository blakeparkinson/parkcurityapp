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

  handleNav(){

    if (this.props.viewMode == 'list'){
      this.props.navigation.navigate('ThumbPage', { });
    }
    else{
        this.props.navigation.goBack();
    }
  }

  textStyle(){
    if (this.props.viewMode == 'list'){
      return {
        color: 'white',
      fontSize: 10,
      fontFamily: 'Noteworthy',
      marginTop: 10
      }
    }
    else{
      return {
        color: '#01D0A7',
        fontSize: 10,
        fontFamily: 'Noteworthy',
        marginTop: 10
      }
    }
  }

  headerStyle(){
    var hStyle = {
        backgroundColor: '#01D0A7',
        flexDirection:'row',
        alignItems:'stretch',
        justifyContent:'space-between',
        padding:20
    };
    if (this.props.viewMode == 'picture'){
      hStyle.backgroundColor = 'white';
    }
    return hStyle;
  }

  textStyle2(){
    var t2Style = {
      color: 'white',
      fontSize: 14,
      fontFamily: 'Noteworthy',
      fontWeight: 'bold'
    };

    if (this.props.viewMode == 'picture'){
      t2Style.color = '#01D0A7';
    }
    return t2Style;
  }

  buttonStyle(){

    var bStyle = {
      borderColor: 'white',
    };
    if (this.props.viewMode == 'picture'){
      bStyle.borderColor = '#01D0A7';
    }
    return bStyle;
  }

  iconStyle(){

    var iStyle = {
      color: 'white',
    };
    if (this.props.viewMode == 'picture'){
      iStyle.color = '#01D0A7';
    }
    return iStyle;
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View>
       <View style={this.headerStyle()}>
             <View style={styles.subheader}>
               <Button small outline bordered style={this.buttonStyle()} onPress={() => navigate('Video', { })}>
                    <Icon style={this.iconStyle()} name='videocam' />
              </Button>
              <Text style={this.textStyle()}>Live Stream</Text>


             </View>
             <View style={styles.subheader}>
               <SvgUri style={styles.badGuy} width="40" height="40" fill="#E3E3E3" source={require('../img/badguy.svg')} />
               <Text style={this.textStyle()}>Bad Guys:</Text>
              {this.state.data &&

                <Text style={this.textStyle2()}>{this.state.data.count}</Text>
              }

             </View>
             
             <View style={styles.subheader}>
               <Button small outline bordered style={this.buttonStyle()} onPress={() => this.handleNav()}>
                    <Icon style={this.iconStyle()} name='md-apps' />
              </Button>
              {this.props.viewMode == 'list' ? (
                  <Text style={this.textStyle()}>Picture View</Text>
              ):(

                  <Text style={this.textStyle()}>List View</Text>
              )}

             </View>

          
        </View>
        
        </View>
    );
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
  },
  buttonBlock:{
    backgroundColor: '#01D0A7',
    color:'white'
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