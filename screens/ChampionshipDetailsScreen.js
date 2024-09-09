import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView } from 'react-native';

export default function ChampionshipDatailScreen({ route }) {
  const { name, image, description } = route.params;

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image 
        source={{ uri: 'https://i.ytimg.com/vi/pKEVaeI4hwY/maxresdefault.jpg' }} 
        style={styles.banner} 
      />
      <View style={styles.detailsContainer}>
        <Image source={{ uri: image }} style={styles.image} />
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    height: '100%',
    paddingBottom: 80,
    backgroundColor: '#F0F0F0',
  },
  banner: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginTop: -60,
    paddingHorizontal: 16,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginVertical: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  description: {
    fontSize: 16,
    color: '#333',
  },
});
