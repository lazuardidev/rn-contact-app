import React, {useState} from 'react';
import {
  View,
  //   TextInput,
  StyleSheet,
  Alert,
  Modal,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {Avatar, Button, TextInput} from 'react-native-paper';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {TContact, TContactPayload} from '../utils/type';
import {createContact} from '../utils/api';

const Add = ({navigation, route}) => {
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

  const handleSubmit = () => {
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

    setLoading(true);
    createContact(formData)
      .then(res => {
        console.log(res);
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
        console.log(e);
      })
      .finally(() => {
        setLoading(false);
      });

    // Reset form fields
    setFormData({
      photo: '',
      firstName: '',
      lastName: '',
      age: 0,
    });
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
          ) : (
            <Avatar.Icon size={150} icon="camera" />
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
          label="Age"
          mode="outlined"
          style={styles.input}
          placeholder="Age"
          keyboardType="numeric"
          value={String(formData.age)}
          onChangeText={text => setFormData({...formData, age: Number(text)})}
        />
      </View>
      <Button
        mode="contained"
        onPress={handleSubmit}
        style={{
          width: '100%',
        }}>
        Submit
      </Button>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: 'center',
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
    marginBottom: 20,
    width: '100%',
  },
  input: {
    marginBottom: 20,
  },
});

export default Add;
