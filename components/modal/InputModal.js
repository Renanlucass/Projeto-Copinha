import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';

export default function NameInputModal({
  championshipName,
  onChangeName,
  onCreate,
  onBack,
}) {
  return (
    <View>
      <Text style={styles.modalTitle}>Nome do Campeonato</Text>
      <TextInput
        style={styles.input}
        placeholder="Digite o nome do campeonato"
        value={championshipName}
        onChangeText={onChangeName}
      />
      <View style={styles.buttonGroup}>
        <TouchableOpacity style={styles.backButton} onPress={onBack}>
          <Text style={styles.backButtonText}>Voltar</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.createButton} onPress={onCreate}>
          <Text style={styles.createButtonText}>Criar Campeonato</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    width: 340,
    borderBottomWidth: 2,
    borderBottomColor: '#000',
    marginBottom: 15,
    paddingHorizontal: 10,
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  backButton: {
    padding: 15,
    backgroundColor: '#041F21',
    borderRadius: 15,
    marginTop: 10,
    width: '48%',
    alignItems: 'center',
  },
  backButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  createButton: {
    padding: 15,
    backgroundColor: '#041F21',
    borderRadius: 15,
    marginTop: 10,
    width: '48%',
    alignItems: 'center',
  },
  createButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});