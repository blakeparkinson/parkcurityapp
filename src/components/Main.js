import React, { Component } from 'react';
import { View, Text, ListView, StyleSheet, TouchableHighlight, ActivityIndicator, Image} from 'react-native';
import { Container, Content, Card, CardItem, Thumbnail, Icon, Button, Header, Title, Spinner} from 'native-base';
import Dataset from 'impagination';

import MainItem from './MainItem';



class Main extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dataset: null,
      datasetState: null
    };
  }
  static navigationOptions = {
    title: 'Main',
  }

  setupImpagination() {
    let dataset = new Dataset({
      pageSize: 2,

      // Anytime there's a new state emitted, we want to set that on
      // the componets local state.
      observe: (datasetState) => {
        this.setState({datasetState});
      },

      // Where to fetch the data from.
      fetch(pageOffset, pageSize, stats) {
        return fetch(`https://parkcurity.herokuapp.com/photo?offset=0&limit=${pageSize}`)
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

  renderItem(){
    return this.state.datasetState.map(record => {
        if (!record.isSettled) {
          return <Spinner key={Math.random()}/>;
        }
        console.log(record);
        return <MainItem record={record} key={record.content._id} />;
    })

  }

  render() {
    return (
      <Container>
        <Header>
          <Title>Parkcurity</Title>
        </Header>
        <Content>
          {this.renderItem()}
        </Content>
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
    flex:1, width: 200, height: 100
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
