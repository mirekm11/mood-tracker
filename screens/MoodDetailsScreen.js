import React, { useState, useContext } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, KeyboardAvoidingView, Platform, TouchableWithoutFeedback, Keyboard } from 'react-native';
import { MoodContext } from '../context/MoodContext';

export default function MoodDetailsScreen({ route, navigation }) {
  const { mood, index, comment: initialComment } = route.params;
  const { addComment } = useContext(MoodContext);
  const [comment, setComment] = useState(initialComment || '');

  const handleSave = () => {
    if (comment.trim().length > 0) {
      addComment(index, comment);
      Keyboard.dismiss();
      navigation.goBack();
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      keyboardVerticalOffset={80}
      style={{ flex: 1 }}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <Text style={styles.title}>{mood}</Text>

          <TextInput
            style={styles.input}
            placeholder="Why do you feel this way?"
            value={comment}
            onChangeText={setComment}
            multiline
          />

          {/* Tutaj zmiana Button na TouchableOpacity */}
          <TouchableOpacity style={styles.button} onPress={handleSave}>
            <Text style={styles.buttonText}>Save Comment</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
  },
  input: {
    borderWidth: 1,
    borderColor: '#aaa',
    padding: 10,
    borderRadius: 8,
    height: 100,
    marginBottom: 20,
    backgroundColor: 'white',
    textAlignVertical: 'top',
  },
  button: {
    backgroundColor: '#4CAF50', // ten sam piękny zielony
    padding: 15,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 20,
  },
  buttonText: {
    color: 'white',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
