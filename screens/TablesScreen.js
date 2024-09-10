import React, { useCallback, useEffect, useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ScrollView } from 'react-native';
import { getTeams } from '../data/database';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import SegmentedControl from '@react-native-community/segmented-control';
import Icon from 'react-native-vector-icons/Ionicons'; 

const DEFAULT_TEAM_IMAGE = require('../assets/default.jpg');

const TableScreen = () => {
  const [teams, setTeams] = useState([]);
  const [championshipType, setChampionshipType] = useState('pontos corridos');
  const navigation = useNavigation();

  const loadTeams = useCallback(async () => {
    const loadedTeams = await getTeams();
    const teamsWithDefaults = loadedTeams.map(team => ({
      ...team,
      p: team.p || 0,
      j: team.j || 0,
      v: team.v || 0,
      e: team.e || 0,
      d: team.d || 0,
      sg: team.sg || 0,
    }));
    setTeams(teamsWithDefaults);
  }, []);

  useEffect(() => {
    loadTeams();
  }, [loadTeams]);

  useFocusEffect(
    useCallback(() => {
      loadTeams();
    }, [loadTeams])
  );

  const handleManageTeams = () => {
    navigation.navigate('AddTeamsScreen');
  };

  const handleSegmentChange = (event) => {
    setChampionshipType(event.nativeEvent.selectedSegmentIndex === 0 ? 'pontos corridos' : 'eliminatorias');
  };

  const shuffleTeams = () => {
    const shuffledTeams = [...teams];
    for (let i = shuffledTeams.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledTeams[i], shuffledTeams[j]] = [shuffledTeams[j], shuffledTeams[i]];
    }
    setTeams(shuffledTeams);
  };

  const renderItem = ({ item }) => (
    <View style={styles.row}>
      <Image source={item.imageUri ? { uri: item.imageUri } : DEFAULT_TEAM_IMAGE} style={styles.teamImage} />
      <Text style={styles.nameCell}>{item.name}</Text>
      <>
        <Text style={styles.numberCell}>{item.p}</Text>
        <Text style={styles.numberCell}>{item.j}</Text>
        <Text style={styles.numberCell}>{item.v}</Text>
        <Text style={styles.numberCell}>{item.e}</Text>
        <Text style={styles.numberCell}>{item.d}</Text>
        <Text style={styles.numberCell}>{item.sg}</Text>
      </>
    </View>
  );

  const renderGroup = (group, index) => (
    <View key={index} style={styles.groupContainer}>
      <Text style={styles.groupTitle}>Grupo {String.fromCharCode(65 + index)}</Text>
      <FlatList
        data={group}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderItem}
      />
    </View>
  );

  const getGroupedTeams = () => {
    if (championshipType === 'eliminatorias') {
      const teamsPerGroup = 4;
      const groups = [];
      for (let i = 0; i < teams.length; i += teamsPerGroup) {
        groups.push(teams.slice(i, i + teamsPerGroup));
      }
      return groups;
    }
    return [teams];
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Tabela de Times</Text>

      <SegmentedControl
        values={['Pontos Corridos', 'Eliminatórias']}
        selectedIndex={championshipType === 'pontos corridos' ? 0 : 1}
        onChange={handleSegmentChange}
        style={styles.segmentedControl}
      />

      <TouchableOpacity style={styles.button} onPress={handleManageTeams}>
        <Text style={styles.buttonText}>Gerenciar Times</Text>
      </TouchableOpacity>

      {championshipType === 'eliminatorias' && (
        <TouchableOpacity style={styles.shuffleButton} onPress={shuffleTeams}>
          <Icon name="shuffle" size={24} color="#FFFFFF" />
          <Text style={styles.shuffleText}>Embaralhar Equipes</Text>
        </TouchableOpacity>
      )}

      <ScrollView>
        <View style={styles.tableContainer}>
          <View style={styles.headerRow}>
            <View style={styles.headerLeft}>
              <Text style={styles.headerText}>Foto</Text>
              <Text style={styles.headerText}>Time</Text>
            </View>
            <View style={styles.headerRight}>
              <Text style={styles.headerCell}>P</Text>
              <Text style={styles.headerCell}>J</Text>
              <Text style={styles.headerCell}>V</Text>
              <Text style={styles.headerCell}>E</Text>
              <Text style={styles.headerCell}>D</Text>
              <Text style={styles.headerCell}>SG</Text>
            </View>
          </View>
          {championshipType === 'eliminatorias' ? (
            getGroupedTeams().map((group, index) => renderGroup(group, index))
          ) : (
            <FlatList
              data={teams}
              keyExtractor={(item) => item.id.toString()}
              renderItem={renderItem}
            />
          )}
        </View>
      </ScrollView>
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
  segmentedControl: {
    marginVertical: 10,
  },
  tableContainer: {
    borderRadius: 10,
    overflow: 'hidden',
    backgroundColor: '#FFFFFF',
    elevation: 5,
  },
  headerRow: {
    flexDirection: 'row',
    backgroundColor: '#FF8C00',
    paddingHorizontal: 10,
    paddingVertical: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  headerLeft: {
    flexDirection: 'row',
    flex: 2,
    justifyContent: 'space-between',
  },
  headerRight: {
    flexDirection: 'row',
    flex: 4,
    justifyContent: 'flex-end',
    flexWrap: 'wrap',
  },
  headerText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'left',
    marginVertical: 2,
    marginRight: 50,
  },
  headerCell: {
    flex: 1,
    color: '#FFFFFF',
    fontWeight: 'bold',
    textAlign: 'center',
    marginRight: 15,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 2,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  nameCell: {
    flex: 2,
    color: '#333',
    textAlign: 'left',
    fontSize: 14,
    paddingLeft: 5,
  },
  numberCell: {
    flex: 1,
    color: '#333',
    textAlign: 'center',
    fontSize: 14,
    paddingHorizontal: 5,
  },
  teamImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 5,
  },
  groupContainer: {
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  groupTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FF8C00',
    marginBottom: 10,
  },
  shuffleButton: {
    width: '50%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-end',
    backgroundColor: '#041F21',
    padding: 10,
    borderRadius: 20,
    marginBottom: 15,
  },
  shuffleText: {
    color: '#FFFFFF',
    fontSize: 16,
    marginLeft: 10,
  },
});

export default TableScreen;
