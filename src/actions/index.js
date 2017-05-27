import * as types from './types';
import Moment from 'moment-timezone';


export function getPhotos(pageOffset, pageSize){
  var obj = formatRequest('get');
   return (dispatch, getState) => {
    return fetch (`https://parkcurity.herokuapp.com/photo?offset=${pageOffset}&limit=${pageSize}`, obj)
        .then((response) => {
          return(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }
}

export function getPhotoById(id){
  var obj = formatRequest('get');
   return (dispatch, getState) => {
    return fetch (`https://parkcurity.herokuapp.com/photo/${id}`, obj)
        .then((response) => {
          return (response.json());
        })
        .catch((error) => {
          console.error(error);
        });
    }
}


export function getPhotoLimit(){
  var obj = formatRequest('get');
  return (dispatch, getState) => {

    return fetch(`https://parkcurity.herokuapp.com/photolimit`, obj)
        .then((response) => response.json())
        .then((responseJson) => {
          var formattedData = formatData(responseJson);
          return (formattedData);
        })
        .catch((error) => {
          console.error(error);
      });
  }
}

export function saveToken(tokenObj){
    var params = {
      token: tokenObj.token,
      os: tokenObj.os
    }
    var obj = formatRequest('post', params);
    return (dispatch, getState) => {

      return fetch(`https://parkcurity.herokuapp.com/token`, obj)
        .then((response) => {
          return(response);
        })
        .catch((error) => {
          console.error(error);
        });
    }

}

function formatData(data){
    var buckets = {};
    for (let item of data){
      var hour = Moment(item.createdAt).tz('America/Denver').format('H');
      if (buckets[hour]){
        buckets[hour] = buckets[hour] + 1;
      }
      else{
        buckets[hour] = {};
        buckets[hour] = 1
      }

    }
    
    var keys = Object.keys(buckets);
    var maxKey = keys[0];
    for (var i = 0; i < keys.length;  i++ ){
      if(buckets[keys[i +1 ]] > buckets[keys[i]]){
        maxKey = keys[i +1 ];
      }
    }

    var display = '';
    if (maxKey){
      if (maxKey > 12){
        display = (maxKey - 12) + 'pm';
      }
      else {
        display = maxKey + 'am';
      }
    }

    var items = {
      count: data.length,
      hotHour: display
    };
    return items;
  }

function formatRequest(method, params){

  var obj = {  
    method: method,
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'authentication': 'glassenberg'
    }
  };
  if (params){
    obj.body = JSON.stringify(params);
  }
  return obj;
}


