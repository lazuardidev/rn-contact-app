import React from 'react';
import {TouchableOpacity, View, Text, Image, StyleSheet} from 'react-native';
import {Avatar} from 'react-native-paper';
import {TContactPayload} from '../utils/type';

type TImagePicker = {
  prevImage: any;
  formData: TContactPayload;
  handleChooseImage: () => void;
};

export const ImagePicker = ({
  prevImage,
  formData,
  handleChooseImage,
}: TImagePicker) => {
  const isValidUrl = (url: string) => {
    return url.startsWith('http') || url.startsWith('https');
  };

  const renderAvatarContent = () => {
    if (prevImage && prevImage.uri) {
      return <Avatar.Image size={150} source={{uri: prevImage.uri}} />;
    } else if (isValidUrl(formData.photo)) {
      return (
        <Image
          alt="avatar"
          resizeMode="cover"
          source={{uri: formData.photo}}
          style={styles.cardImg}
        />
      );
    } else if (formData.photo) {
      return (
        <View style={[styles.cardImg, styles.cardAvatar]}>
          <Text style={styles.cardAvatarText}>{formData.firstName[0]}</Text>
        </View>
      );
    } else {
      return <Avatar.Icon size={150} icon="camera" />;
    }
  };

  return (
    <View style={styles.imageContainer}>
      <TouchableOpacity onPress={handleChooseImage}>
        {renderAvatarContent()}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  imageContainer: {
    marginBottom: 20,
  },
  cardImg: {
    width: 180,
    height: 180,
    borderRadius: 90,
  },
  cardAvatar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#9ca1ac',
  },
  cardAvatarText: {
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
  },
});
