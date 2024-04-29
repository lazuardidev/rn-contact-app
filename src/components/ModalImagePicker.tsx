import React from 'react';
import {Modal, View, StyleSheet} from 'react-native';
import {launchCamera, launchImageLibrary} from 'react-native-image-picker';
import {Button} from 'react-native-paper';

type TModalImagePicker = {
  isVisible: boolean;
  setIsVisible: (isVisible: boolean) => void;
  imageCallback: (response: any) => void;
};

export const ModalImagePicker = ({
  isVisible,
  setIsVisible,
  imageCallback,
}: TModalImagePicker) => {
  const handleTakePhoto = () => {
    launchCamera(
      {
        mediaType: 'photo',
      },
      imageCallback,
    );
  };

  const handleSelectFromLibrary = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
      },
      imageCallback,
    );
  };

  return (
    <Modal animationType="fade" transparent={true} visible={isVisible}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Button
            icon="camera"
            mode="contained"
            style={styles.modalButton}
            onPress={handleTakePhoto}>
            Take Photo
          </Button>
          <Button
            icon="folder"
            mode="contained"
            style={styles.modalButton}
            onPress={handleSelectFromLibrary}>
            Choose from Library
          </Button>
          <Button
            mode="contained"
            buttonColor="red"
            style={styles.modalButton}
            onPress={() => setIsVisible(false)}>
            Cancel
          </Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
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
});
