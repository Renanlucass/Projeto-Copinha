import React, { useState, useEffect } from 'react';
import { View, TextInput, Button, Text, Alert, ActivityIndicator, FlatList, StyleSheet, TouchableOpacity, Image, ScrollView } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { addTeam, getTeams, updateTeam, deleteTeam } from '../data/database';

const DEFAULT_TEAM_IMAGE = require('../assets/default.jpg');

const AddTeamScreen = ({ navigation }) => {
  const [teamName, setTeamName] = useState('');
  const [loading, setLoading] = useState(false);
  const [teams, setTeams] = useState([]);
  const [imageUri, setImageUri] = useState('');
  const [editingTeam, setEditingTeam] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      const loadedTeams = await getTeams();
      setTeams(loadedTeams);
    };

    loadTeams();
  }, []);

  const handleAddTeam = async () => {
    if (!teamName) {
      Alert.alert('Erro', 'Por favor, insira o nome do time.');
      return;
    }
  
    setLoading(true);
  
    try {
      // Use uma URI padrão se imageUri não estiver definido
      const finalImageUri = imageUri || 'https://res.cloudinary.com/dsrnunimq/image/upload/v1725989446/xaxazshqy7o0zd6dplyi.jpg';
       
      if (editingTeam) {
        await updateTeam(editingTeam.id, teamName, finalImageUri);
        Alert.alert('Sucesso', 'Time atualizado com sucesso!');
        setEditingTeam(null);
      } else {
        await addTeam(teamName, finalImageUri);
        Alert.alert('Sucesso', 'Time adicionado com sucesso!');
      }
  
      setTeamName('');
      setImageUri('');
      
      const updatedTeams = await getTeams();
      setTeams(updatedTeams);
    } catch (error) {
      console.error('Erro ao adicionar/atualizar time:', error);
      Alert.alert('Erro', 'Falha ao adicionar/atualizar o time. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };
  

  const handleSelectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à galeria para selecionar uma imagem.');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    console.log('ImagePicker result:', result); 

    if (!result.canceled) {
      setImageUri(result.assets[0].uri); 
    }
  };

  const handleEditTeam = (team) => {
    setTeamName(team.name);
    setImageUri(team.imageUri || '');
    setEditingTeam(team);
  };

  const handleDeleteTeam = async (teamId) => {
    Alert.alert(
      'Excluir Time',
      'Tem certeza que deseja excluir este time?',
      [
        { text: 'Cancelar', style: 'cancel' },
        { 
          text: 'Excluir', 
          onPress: async () => {
            try {
              await deleteTeam(teamId);
              Alert.alert('Sucesso', 'Time excluído com sucesso!');
              const updatedTeams = await getTeams();
              setTeams(updatedTeams);
            } catch (error) {
              console.error('Erro ao excluir time:', error);
              Alert.alert('Erro', 'Falha ao excluir o time. Tente novamente.');
            }
          }
        },
      ]
    );
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <TouchableOpacity style={styles.rowContent} onPress={() => handleEditTeam(item)}>
        <Image source={item.imageUri ? { uri: item.imageUri } : DEFAULT_TEAM_IMAGE} style={styles.teamImage} />
        <Text style={styles.cell}>{item.name}</Text>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => handleDeleteTeam(item.id)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Excluir</Text>
      </TouchableOpacity>
    </View>
  );

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <Text style={styles.title}>{editingTeam ? 'Editar Time' : 'Adicionar Time'}</Text>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Nome do time"
          value={teamName}
          onChangeText={setTeamName}
          editable={!loading}
          style={styles.input}
        />
        <Button title="Selecionar Imagem" onPress={handleSelectImage} color="#FF8C00" />
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.selectedImage} />
        )}
        {editingTeam && !imageUri && (
          <Image source={DEFAULT_TEAM_IMAGE} style={styles.selectedImage} />
        )}
      </View>
      {loading ? (
        <ActivityIndicator size="large" color="#FF8C00" style={styles.loader} />
      ) : (
        <Button title={editingTeam ? 'Salvar Alterações' : 'Adicionar Time'} onPress={handleAddTeam} color="#FF8C00" />
      )}
      <View style={styles.table}>
        <FlatList
          data={teams}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
        />
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#F5F5F5', 
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 20,
    textAlign: 'center', 
  },
  inputContainer: {
    marginBottom: 20,
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#fff',
    padding: 15,
    elevation: 5, 
  },
  input: {
    height: 40,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
    backgroundColor: '#fff',
  },
  selectedImage: {
    width: 120,
    height: 120,
    marginVertical: 10,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    alignSelf: 'center',
  },
  loader: {
    marginVertical: 20,
  },
  table: {
    marginTop: 20,
    borderRadius: 10,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
    padding: 15,
    alignItems: 'center',
    marginBottom: 10,
    backgroundColor: '#fff',
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#ddd',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  rowContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  cell: {
    flex: 1,
    fontSize: 16,
    color: '#333', 
  },
  teamImage: {
    width: 60,
    height: 60,
    borderRadius: 30,
    marginRight: 10,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    padding: 10,
  },
  deleteButtonText: {
    color: '#FF0000',
    fontWeight: 'bold',
  },
});

export default AddTeamScreen;
