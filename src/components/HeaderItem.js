import React, { Component } from 'react';
import {
  Text,
  Image,
  StyleSheet,
  View,
  Right,
  Left,
  Switch
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
       data: null,
       isMotion: false
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
      this.props.navigation.navigate('ThumbPage', { isMotion: this.props.motionValue});
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

  mainStyle(){
    var mstyle={
      backgroundColor: '#01D0A7',
      padding:20
    };
    if (this.props.viewMode == 'picture'){
      mstyle.backgroundColor = 'white';
    }
    return mstyle;
  }

  headerStyle(){
    var hStyle = {
        flexDirection:'row',
        alignItems:'stretch',
        justifyContent:'space-between',
    };
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

  valueChange(value){
    this.setState({isMotion: value});

    setTimeout( () => {
      this.props.switchValueChange(value);

    },300);
  }

  render(){
    const { navigate } = this.props.navigation;
    return (
      <View style={this.mainStyle()}>
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
        <View style={styles.switch}>
            <Text style={this.textStyle()}>Other Motion</Text>

              <Switch
            onValueChange={(value) => this.valueChange(value)}
            style={{marginBottom: 10, marginLeft: 10}}
            value={this.state.isMotion} onTintColor="#c1e1fd"/>
            </View>

        </View>
    );
  }

  
}

const styles = StyleSheet.create({
  header:{
    flexDirection:'row',
    alignItems:'stretch',
    justifyContent:'space-between',
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
  },
  switch:{
    flexDirection:'row',
    justifyContent:'flex-end'
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