
import React from 'react';
import { View, Text,TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function Campeonatos() {
  return (
    <TouchableOpacity style={styles.container}>
      <Ionicons name="trophy" size={25} style={styles.icon} />
      <Text style={styles.text}>Organizar Campeonatos</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  icon: {
    marginRight: 10,
  },
  text: {
    fontSize: 20,
    paddingLeft: 20,
  },
});
