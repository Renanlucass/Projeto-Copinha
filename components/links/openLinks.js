
import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function AbrirLink() {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name="link" size={24} color="black" />
      <Text style={styles.text}>Abrir Link</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 5,
  },
  text: {
    marginLeft: 10,
    fontSize: 18,
    paddingLeft: 20,
  },
});
