import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome6 } from '@expo/vector-icons';

export default function Contato() {
  return (
    <TouchableOpacity style={styles.sectionItem}>
      <FontAwesome6 name="contact-book" size={24} color="black" />
      <Text style={styles.sectionItemText}>Contato</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  sectionItemText: {
    marginLeft: 20,
    fontSize: 18,
    paddingLeft: 20,
  },
});
