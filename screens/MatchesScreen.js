import React, { useState, useEffect, useCallback } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, Modal, TextInput, Alert } from 'react-native';
import { getTeams } from '../data/database'; // Atualize com o caminho correto
import Icon from 'react-native-vector-icons/FontAwesome'; // Certifique-se de instalar o pacote 'react-native-vector-icons'

const DEFAULT_TEAM_IMAGE = require('../assets/default.jpg');

const MatchesScreen = () => {
  const [teams, setTeams] = useState([]);
  const [matches, setMatches] = useState([]);
  const [remainingTeams, setRemainingTeams] = useState([]);
  const [selectedMatch, setSelectedMatch] = useState(null);
  const [editMatchModalVisible, setEditMatchModalVisible] = useState(false);
  const [editDetailsModalVisible, setEditDetailsModalVisible] = useState(false);
  const [matchDetails, setMatchDetails] = useState({ title: '', date: '', time: '', location: '', notes: '' });

  // Carregar times do banco de dados
  const loadTeams = useCallback(async () => {
    const loadedTeams = await getTeams();
    setTeams(loadedTeams);
    setRemainingTeams(loadedTeams);
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  // Gerar um confronto aleatório
  const generateNextMatch = () => {
    if (remainingTeams.length < 2) {
      Alert.alert('Erro', 'É necessário pelo menos dois times para gerar confrontos.');
      return;
    }

    const shuffledTeams = [...remainingTeams];
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
    }

    const [teamA, teamB, ...rest] = shuffledTeams;

    const newMatch = {
      id: `match_${matches.length}`,
      teamA,
      teamB,
    };

    setMatches([...matches, newMatch]);
    setRemainingTeams(rest);
  };

  const handleEditMatch = (match) => {
    setSelectedMatch(match);
    setEditMatchModalVisible(true);
  };

  const handleDeleteMatch = () => {
    Alert.alert(
      'Confirmar Exclusão',
      'Você tem certeza que deseja excluir este confronto?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { text: 'Excluir', style: 'destructive', onPress: () => {
          setMatches(matches.filter(match => match.id !== selectedMatch.id));
          setSelectedMatch(null);
          setEditMatchModalVisible(false);
        }},
      ]
    );
  };

  const handleEditDetails = () => {
    setEditDetailsModalVisible(true);
  };

  const handleSaveDetails = () => {
    setEditDetailsModalVisible(false);
    setMatches(matches.map(match => 
      match.id === selectedMatch.id ? { ...match, ...matchDetails } : match
    ));
  };

  const renderMatch = ({ item }) => (
    <TouchableOpacity style={styles.matchRow} onPress={() => handleEditMatch(item)}>
      <View style={styles.teamSide}>
        <Image 
          source={item.teamA?.imageUri ? { uri: item.teamA.imageUri } : DEFAULT_TEAM_IMAGE} 
          style={styles.teamImage} 
        />
        <Text style={styles.teamName}>{item.teamA?.name}</Text>
      </View>

      <Text style={styles.vsText}>X</Text>

      <View style={styles.teamSide}>
        <Image 
          source={item.teamB?.imageUri ? { uri: item.teamB.imageUri } : DEFAULT_TEAM_IMAGE} 
          style={styles.teamImage} 
        />
        <Text style={styles.teamName}>{item.teamB?.name}</Text>
      </View>
    </TouchableOpacity>
  );

  const keyExtractor = (item) => item.id;

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Gerar Confrontos</Text>

      <TouchableOpacity style={styles.button} onPress={generateNextMatch}>
        <Text style={styles.buttonText}>Gerar Próximo Confronto</Text>
      </TouchableOpacity>

      {matches.length > 0 ? (
        <FlatList
          data={matches}
          keyExtractor={keyExtractor}
          renderItem={renderMatch}
          style={styles.matchList}
        />
      ) : (
        <Text style={styles.noMatchesText}>Nenhum confronto gerado ainda.</Text>
      )}

      {/* Editar Match Modal */}
      <Modal
        visible={editMatchModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditMatchModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Editar Confronto</Text>
            <View style={styles.modalButtonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleEditDetails}>
                <Icon name="edit" size={20} color="#fff" />
                <Text style={styles.modalButtonText}>Editar Detalhes</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={handleDeleteMatch}>
                <Icon name="trash" size={20} color="#fff" />
                <Text style={styles.modalButtonText}>Excluir Confronto</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setEditMatchModalVisible(false)}>
                <Icon name="close" size={20} color="#fff" />
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>

      {/* Editar Detalhes Modal */}
      <Modal
        visible={editDetailsModalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setEditDetailsModalVisible(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Detalhes do Confronto</Text>
            <TextInput
              style={styles.input}
              placeholder="Título"
              value={matchDetails.title}
              onChangeText={(text) => setMatchDetails({ ...matchDetails, title: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Data"
              value={matchDetails.date}
              onChangeText={(text) => setMatchDetails({ ...matchDetails, date: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Hora"
              value={matchDetails.time}
              onChangeText={(text) => setMatchDetails({ ...matchDetails, time: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Local"
              value={matchDetails.location}
              onChangeText={(text) => setMatchDetails({ ...matchDetails, location: text })}
            />
            <TextInput
              style={styles.input}
              placeholder="Aviso"
              value={matchDetails.notes}
              onChangeText={(text) => setMatchDetails({ ...matchDetails, notes: text })}
            />
            <View style={styles.buttonContainer}>
              <TouchableOpacity style={styles.modalButton} onPress={handleSaveDetails}>
                <Icon name="save" size={20} color="#fff" />
                <Text style={styles.modalButtonText}>Salvar</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.modalButton} onPress={() => setEditDetailsModalVisible(false)}>
                <Icon name="close" size={20} color="#fff" />
                <Text style={styles.modalButtonText}>Fechar</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F9F9F9',
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 15,
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#041F21',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 20,
    marginBottom: 20,
    alignItems: 'center',
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  matchRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 15,
    borderRadius: 10,
    elevation: 3,
    marginBottom: 10,
  },
  teamSide: {
    flexDirection: 'column',
    alignItems: 'center',
  },
  teamImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
  },
  teamName: {
    fontSize: 14,
    textAlign: 'center',
    marginTop: 5,
  },
  vsText: {
    fontSize: 18,
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  noMatchesText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
    marginTop: 20,
  },
  matchList: {
    marginTop: 20,
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: '90%',
    backgroundColor: '#FFFFFF',
    borderRadius: 10,
    padding: 20,
    elevation: 5,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 15,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalButtonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  modalButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#041F21',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 5,
    marginBottom: 10,
  },
  modalButtonText: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default MatchesScreen;

