import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Button, TextInput} from 'react-native-paper';
import {TContactPayload} from '../utils/type';

type TFormContact = {
  formData: TContactPayload;
  setFormData: React.Dispatch<React.SetStateAction<TContactPayload>>;
  handleAdd?: () => void;
  handleEdit?: () => void;
  handleDelete?: () => void;
};

export const FormContact = ({
  formData,
  setFormData,
  handleAdd,
  handleEdit,
  handleDelete,
}: TFormContact) => {
  return (
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
      {handleAdd && (
        <Button mode="contained" onPress={handleAdd} style={styles.btn}>
          Submit
        </Button>
      )}
      {handleEdit && (
        <Button mode="contained" onPress={handleEdit} style={styles.btn}>
          Edit
        </Button>
      )}
      {handleDelete && (
        <Button
          mode="contained"
          buttonColor="red"
          onPress={handleDelete}
          style={styles.btn}>
          Delete
        </Button>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  formContainer: {
    marginBottom: 20,
    width: '100%',
  },
  input: {
    marginBottom: 16,
  },
  btn: {
    width: '100%',
    marginVertical: 12,
  },
});
