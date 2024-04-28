import React, {useEffect, useState} from 'react';
import {
  View,
  // TextInput,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
  Image,
  Text,
} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TContact, TContactPayload} from '../utils/type';
import {
  createContact,
  deleteContact,
  editContact,
  getContactById,
} from '../utils/api';

const Detail = ({navigation, route}) => {
  const {id, onEditComplete} = route.params;
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState<TContactPayload>({
    age: 0,
    firstName: '',
    lastName: '',
    photo: '',
  });
  const [prevImage, setPrevImage] = useState();
  const [modalVisible, setModalVisible] = useState(false);
  console.log(route.params, ' route.params');

  useEffect(() => {
    const fetchContactDetail = async () => {
      try {
        const response = await getContactById({id: id});
        const data = response.data.data;
        console.log(response.data.data, ' responsedetailsss----=====');
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
      console.log(image, ' res?.assets');
    }
  };

  const handleChooseImage = () => {
    setModalVisible(true);
  };

  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      callback,
    );
  };

  const handleSelectFromLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      callback,
    );
  };

  const handleEdit = () => {
    const {photo, firstName, lastName, age} = formData;
    if (!firstName || !lastName || !age) {
      let errorMessage = 'The following fields are required:\n';
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
    // Handle form submission
    console.log('Form submitted:', JSON.stringify(formData));

    setLoading(true);
    editContact({
      id: id,
      payload: formData,
    })
      .then(res => {
        console.log(res);
        // navigation.goBack();
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
        console.log(JSON.stringify(e, null, 2));
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
        console.log(JSON.stringify(e, null, 2));
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const isValidUrl = (url: string) => {
    const pattern =
      /^(https?:\/\/)?([\w.]+)\.([a-z]{2,6}\.?)(\/[\w.&+=%#?]*)*$/i;
    return !!pattern.test(url);
  };

  if (loading) {
    return (
      <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <TouchableOpacity onPress={handleChooseImage}>
          {prevImage && prevImage.uri ? (
            <Avatar.Image size={150} source={{uri: prevImage.uri}} />
          ) : isValidUrl(formData.photo) ? (
            <Image
              alt=""
              resizeMode="cover"
              source={{uri: formData.photo}}
              style={styles.cardImg}
            />
          ) : (
            <View style={[styles.cardImg, styles.cardAvatar]}>
              <Text style={styles.cardAvatarText}>{formData.firstName[0]}</Text>
            </View>
          )}
        </TouchableOpacity>
        <Modal
          animationType="fade"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.modalContainer}>
            <View style={styles.modalContent}>
              <Button icon="camera" mode="contained" onPress={handleTakePhoto}>
                Take Photo
              </Button>
              <Button
                icon="folder"
                mode="contained"
                style={{
                  marginVertical: 18,
                }}
                onPress={handleSelectFromLibrary}>
                Choose from Library
              </Button>
              <Button
                mode="contained"
                buttonColor="red"
                onPress={() => setModalVisible(false)}>
                Cancel
              </Button>
            </View>
          </View>
        </Modal>
      </View>
      <View style={styles.formContainer}>
        <TextInput
          label="First Name"
          mode="outlined"
          style={styles.input}
          placeholder="First Name"
          value={formData.firstName}
          onChangeText={text => setFormData({...formData, firstName: text})}
        />
        <TextInput
          label="Last Name"
          mode="outlined"
          style={styles.input}
          placeholder="Last Name"
          value={formData.lastName}
          onChangeText={text => setFormData({...formData, lastName: text})}
        />
        <TextInput
          style={styles.input}
          label="Age"
          mode="outlined"
          keyboardType="numeric"
          value={String(formData.age)}
          onChangeText={text => setFormData({...formData, age: Number(text)})}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleEdit}
        style={{
          width: '100%',
          marginVertical: 12,
        }}>
        Edit
      </Button>
      <Button
        mode="contained"
        buttonColor="red"
        onPress={handleDelete}
        style={{
          width: '100%',
          marginVertical: 12,
        }}>
        Delete
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  imageContainer: {
    marginBottom: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    justifyContent: 'space-around',
  },
  modalButton: {
    marginBottom: 10,
  },
  formContainer: {
    marginBottom: 20, // Add margin bottom to create space between components
    width: '100%',
  },
  input: {
    marginBottom: 16,
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

export default Detail;
