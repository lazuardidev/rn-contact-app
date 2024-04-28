import React from 'react';
import {Text, View, Image, TouchableOpacity} from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {TContact} from '../utils/type.js';

const CardContact = ({contact}: {contact: TContact}) => {
  return (
    <View
      style={{
        padding: 15,
        borderBottomColor: '#ddd',
        borderBottomWidth: 1,
        flexDirection: 'row',
      }}>
      <View style={{marginRight: 9}}>
        <Image
          style={{
            width: 50,
            height: 50,
          }}
          source={{
            uri: 'https://reactnative.dev/img/tiny_logo.png',
          }}
        />
      </View>
      <View style={{flex: 1}}>
        <Text style={{fontSize: 20}}>{contact.firstName}</Text>
        <Text style={{color: 'rgba(0, 0, 0, .5)'}}>{contact.lastName}</Text>
      </View>
      <View>
        <TouchableOpacity onPress={() => {}}>
          {contact.isFavorite ? (
            <Ionicons
              name="ios-heart"
              size={50}
              color="#555"
              style={{textAlign: 'right'}}
            />
          ) : (
            <Ionicons
              name="ios-heart-empty"
              size={50}
              color="#aaa"
              style={{textAlign: 'right'}}
            />
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default CardContact;
