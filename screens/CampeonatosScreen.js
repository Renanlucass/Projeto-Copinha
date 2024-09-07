import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import ReusableModal from '../components/modal/ReusableModal';
import { Ionicons } from '@expo/vector-icons';
import TypeSelectionModal from '../components/modal/SelectionModal';
import NameInputModal from '../components/modal/InputModal';

export default function OrganizeChampionshipsScreen() {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState('typeSelection');
  const [championshipName, setChampionshipName] = useState('');

  const openModal = () => {
    setIsModalVisible(true);
    setCurrentStep('typeSelection');
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setChampionshipName('');
  };

  const handleOptionSelect = (option) => {
    console.log(`Opção selecionada: ${option}`);
    setCurrentStep('nameInput');
  };

  const handleCreateChampionship = () => {
    console.log(`Nome do campeonato: ${championshipName}`);
    closeModal();
  };

  const handleGoBack = () => {
    setCurrentStep('typeSelection');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.buttonText}>Cadastrar Novo Campeonato</Text>
      </TouchableOpacity>

      <ReusableModal visible={isModalVisible} onClose={closeModal}>
        {currentStep === 'typeSelection' ? (
          <TypeSelectionModal onSelect={handleOptionSelect} />
        ) : (
          <NameInputModal
            championshipName={championshipName}
            onChangeName={setChampionshipName}
            onCreate={handleCreateChampionship}
            onBack={handleGoBack}
          />
        )}
      </ReusableModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#041F21',
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
});
