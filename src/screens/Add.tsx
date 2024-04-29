import React, {useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {TContactPayload} from '../utils/type';
import {createContact} from '../utils/api';
import {
  Loading,
  ImagePicker,
  FormContact,
  ModalImagePicker,
} from '../components';

const Add = ({navigation, route}: any) => {
  const {onAddComplete} = route.params;
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<TContactPayload>({
    age: 0,
    firstName: '',
    lastName: '',
    photo: '',
  });
  const [prevImage, setPrevImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);

  const callback = (response: any) => {
    if (response?.assets) {
      const image = response.assets[0];
      const fileName = response.assets[0].fileName;
      setFormData({...formData, photo: fileName});
      setPrevImage(image);
      setModalVisible(false);
    }
  };

  const handleChooseImage = () => {
    setModalVisible(true);
  };

  const handleAdd = () => {
    const {photo, firstName, lastName, age} = formData;
    if (!firstName || !lastName || !age) {
      let errorMessage = 'The following fields are required:\n';
      if (!photo) {
        errorMessage += '- Photo\n';
      }
      if (!firstName) {
        errorMessage += '- First Name\n';
      }
      if (!lastName) {
        errorMessage += '- Last Name\n';
      }
      if (!age) {
        errorMessage += '- Age\n';
      }
      Alert.alert('Fields Required', errorMessage);
      return;
    }

    setLoading(true);
    createContact(formData)
      .then(_ => {
        Alert.alert(
          'Success',
          'Your contact added successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                onAddComplete();
                navigation.goBack();
              },
            },
          ],
          {cancelable: false},
        );
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      })
      .finally(() => {
        setLoading(false);
      });

    setFormData({
      photo: '',
      firstName: '',
      lastName: '',
      age: 0,
    });
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <View style={styles.container}>
      <ImagePicker
        formData={formData}
        handleChooseImage={handleChooseImage}
        prevImage={prevImage}
      />
      <FormContact
        formData={formData}
        setFormData={setFormData}
        handleAdd={handleAdd}
      />
      <ModalImagePicker
        isVisible={modalVisible}
        imageCallback={callback}
        setIsVisible={setModalVisible}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
});

export default Add;
