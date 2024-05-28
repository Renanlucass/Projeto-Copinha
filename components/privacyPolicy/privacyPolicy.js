import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function PoliticaPrivacidade() {
  return (
    <TouchableOpacity style={styles.sectionItem}>
      <MaterialIcons name="policy" size={24} color="black" />
      <Text style={styles.sectionItemText}>Política de Privacidade</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  sectionItemText: {
    marginLeft: 20,
    fontSize: 18,
    paddingLeft: 20,
  },
});
