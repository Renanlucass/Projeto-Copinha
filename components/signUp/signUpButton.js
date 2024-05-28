import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SignUpButton() {
  return (
    <TouchableOpacity style={styles.button}>
      <Text style={styles.buttonText}>Cadastre-se</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#041F21',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});
