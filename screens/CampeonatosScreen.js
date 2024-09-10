import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, FlatList, Image, Alert } from 'react-native';
import ReusableModal from '../components/modal/ReusableModal';
import { Ionicons } from '@expo/vector-icons';
import * as ImagePicker from 'expo-image-picker';
import TypeSelectionModal from '../components/modal/SelectionModal';
import NameInputModal from '../components/modal/InputModal';
import { initializeDatabase, addChampionship, getChampionships } from '../data/database';

export default function OrganizeChampionshipsScreen({ route }) {
  const { updateChampionships } = route.params || {};
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentStep, setCurrentStep] = useState('typeSelection');
  const [championshipName, setChampionshipName] = useState('');
  const [championships, setChampionships] = useState([]);
  const [championshipImage, setChampionshipImage] = useState(null);

  useEffect(() => {
    initializeDatabase()
      .then(() => {
        console.log('Database initialized');
        loadChampionships();
      })
      .catch((error) => {
        console.error('Error initializing database:', error);
      });
  }, []);

  const loadChampionships = async () => {
    const loadedChampionships = await getChampionships();
    setChampionships(loadedChampionships);
  };

  const openModal = () => {
    setIsModalVisible(true);
    setCurrentStep('typeSelection');
  };

  const closeModal = () => {
    setIsModalVisible(false);
    setChampionshipName('');
    setChampionshipImage(null);
    loadChampionships();
  };

  const handleOptionSelect = (option) => {
    setCurrentStep('nameInput');
  };

  const handleCreateChampionship = async () => {
    if (!championshipName.trim()) {
      Alert.alert('Erro', 'Por favor, preencha o nome do campeonato.');
      return;
    }

    const newId = await addChampionship(championshipName, championshipImage || 'https://via.placeholder.com/50');
    setChampionships([...championships, { id: newId, name: championshipName, image: championshipImage }]);
    closeModal();
    if (updateChampionships) {
      updateChampionships();
    }
  };

  const handleGoBack = () => {
    setCurrentStep('typeSelection');
  };

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      const selectedImageUri = result.assets[0].uri;
      setChampionshipImage(selectedImageUri);
    } else {
      console.log("Image selection was canceled or no image selected");
    }
  };

  const renderChampionship = ({ item }) => (
    <View style={styles.championshipItem}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: item.image }} style={styles.championshipImage} />
      </View>
      <Text style={styles.championshipName}>{item.name}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.button} onPress={openModal}>
        <Ionicons name="add" size={24} color="white" />
        <Text style={styles.buttonText}>Cadastrar Novo Campeonato</Text>
      </TouchableOpacity>

      <FlatList
        data={championships}
        keyExtractor={(item) => item.id ? item.id.toString() : ''}
        renderItem={renderChampionship}
        contentContainerStyle={styles.championshipList}
      />

      <ReusableModal visible={isModalVisible} onClose={closeModal}>
        {currentStep === 'typeSelection' ? (
          <TypeSelectionModal onSelect={handleOptionSelect} />
        ) : (
          <NameInputModal
            championshipName={championshipName}
            onChangeName={setChampionshipName}
            onCreate={handleCreateChampionship}
            onBack={handleGoBack}
            pickImage={pickImage}
            championshipImage={championshipImage}
          />
        )}
      </ReusableModal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#041F21',
  },
  button: {
    width: '60%',
    display: 'flex',
    alignSelf: 'center',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#FF8C00',
    borderRadius: 20,
    marginBottom: 20,
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    marginLeft: 10,
  },
  championshipList: {
    paddingTop: 10,
  },
  championshipItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    backgroundColor: '#d3d3d3',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 5,
  },
  imageContainer: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginRight: 15,
    borderColor: '#000',
    borderWidth: 1,
    elevation: 10,
    overflow: 'hidden',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  championshipImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  championshipName: {
    fontSize: 16,
    fontWeight: 'bold',
  },
});
