import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons, FontAwesome5 } from '@expo/vector-icons';

export default function TypeSelectionModal({ onSelect }) {
  return (
    <View>
      <Text style={styles.modalTitle}>Escolha o Tipo de Campeonato</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => onSelect('Único')}>
        <Ionicons name="trophy" size={24} color="white" />
        <Text style={styles.optionText}>Campeonato Único</Text>
      </TouchableOpacity>
      <Text style={styles.optionDescription}>(Campeonato sem categorias ou divisões)</Text>
      <TouchableOpacity style={styles.optionButton} onPress={() => onSelect('Categorias')}>
        <FontAwesome5 name="th-list" size={24} color="white" />
        <Text style={styles.optionText}>Campeonato com Categorias</Text>
      </TouchableOpacity>
      <Text style={styles.optionDescription}>
        (Campeonato com divisões. Ex: Masculino/Feminino, Sub 19/Sub 20, 1º Divisão/2º Divisão)
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    display: 'flex',
    alignSelf: 'center',
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  optionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#041F21',
    borderRadius: 5,
    marginVertical: 5,
    width: 330,
  },
  optionText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  optionDescription: {
    color: '#000',
    fontSize: 13,
    marginLeft: 10,
    alignSelf: 'flex-start',
    marginBottom: 10,
  },
});
