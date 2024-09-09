import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SignUpButton({ onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <Text style={styles.buttonText}>Cadastre-se</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 40,
    backgroundColor: '#FF8C00',
    borderRadius: 20,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});