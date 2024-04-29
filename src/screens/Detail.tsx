import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Alert} from 'react-native';
import {TContactPayload} from '../utils/type';
import {deleteContact, editContact, getContactById} from '../utils/api';
import {
  Loading,
  ImagePicker,
  FormContact,
  ModalImagePicker,
} from '../components';

const Detail = ({navigation, route}: {navigation: any; route: any}) => {
  const {id, onEditComplete} = route.params;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<TContactPayload>({
    age: 0,
    firstName: '',
    lastName: '',
    photo: '',
  });
  const [prevImage, setPrevImage] = useState<any>();
  const [modalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    const fetchContactDetail = async () => {
      try {
        const response = await getContactById({id: id});
        const data = response.data.data;
        setFormData({
          age: data.age,
          firstName: data.firstName,
          lastName: data.lastName,
          photo: data.photo,
        });
        setLoading(false);
      } catch (error) {
        console.error('Error fetching contacts:', error);
        setLoading(false);
      }
    };

    fetchContactDetail();
  }, [id]);

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

  const handleEdit = () => {
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
    editContact({
      id: id,
      payload: formData,
    })
      .then(_ => {
        Alert.alert(
          'Success',
          'Your contact edited successfully',
          [
            {
              text: 'OK',
              onPress: () => {
                onEditComplete();
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
  };

  const handleDelete = () => {
    setLoading(true);
    deleteContact({id: id})
      .then(res => {
        console.log(res);
        navigation.goBack();
      })
      .catch(e => {
        Alert.alert('Error', e.message);
      })
      .finally(() => {
        setLoading(false);
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
        handleEdit={handleEdit}
        handleDelete={handleDelete}
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

export default Detail;
