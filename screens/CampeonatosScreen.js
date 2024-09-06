import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CampeonatosScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.textChamp}>Lista de Campeonatos</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textChamp: {
    fontSize: 24,
    fontWeight: 'bold',
  },
});

export default CampeonatosScreen;
