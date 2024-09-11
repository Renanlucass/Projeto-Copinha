import React from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { FontAwesome } from '@expo/vector-icons'; 

export default function ChampionshipDetailScreen({ route }) {
  const { name, image, description } = route.params;

  console.log({ name, image, description });

  return (
    <ScrollView contentContainerStyle={styles.scrollContainer}>
      <Image
        source={{ uri: 'https://res.cloudinary.com/dsrnunimq/image/upload/v1725995139/q6r5q7mxk6lkpwgazpzy.jpg' }}
        style={styles.banner}
      />
      <View style={styles.detailsContainer}>
        <View style={styles.imageWrapper}>
          <Image source={{ uri: image }} style={styles.championshipImage} />
        </View>
        <Text style={styles.title}>{name}</Text>
        <Text style={styles.description}>{description}</Text>
        <View style={styles.followSection}>
          <Text style={styles.followers}>Número de seguidores: 0</Text>
          <TouchableOpacity style={styles.followButton}>
            <Text style={styles.followButtonText}>Seguir</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.organizerSection}>
          <FontAwesome name="user" size={24} color="#007BFF" />
          <Text style={styles.organizerText}>Organizador: Nome do Organizador</Text>
        </View>
        <View style={styles.categoriesSection}>
          <Text style={styles.categoriesTitle}>Categorias</Text>
          <View style={styles.categoriesList}>
            <Text style={styles.categoryItem}>Categoria 1</Text>
            <Text style={styles.categoryItem}>Categoria 2</Text>
            <Text style={styles.categoryItem}>Categoria 3</Text>
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollContainer: {
    flexGrow: 1,
    paddingBottom: 80,
    backgroundColor: '#F5F5F5',
  },
  banner: {
    width: '100%',
    height: 220,
    resizeMode: 'cover',
  },
  detailsContainer: {
    marginTop: -60,
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  imageWrapper: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    borderRadius: 100,
    overflow: 'hidden',
    marginBottom: 20,
  },
  championshipImage: {
    width: 130,
    height: 130,
    borderRadius: 100,
    borderWidth: 4,
    borderColor: '#007BFF',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
    marginVertical: 10,
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    marginBottom: 20,
  },
  followSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  followers: {
    fontSize: 16,
    color: '#007BFF',
  },
  followButton: {
    backgroundColor: '#007BFF',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    elevation: 2,
  },
  followButtonText: {
    color: '#FFF',
    fontSize: 16,
  },
  organizerSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  organizerText: {
    fontSize: 16,
    marginLeft: 10,
    color: '#333',
  },
  categoriesSection: {
    marginTop: 20,
    width: '100%',
  },
  categoriesTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 10,
  },
  categoriesList: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
  },
  categoryItem: {
    fontSize: 16,
    color: '#007BFF',
    margin: 5,
  },
});
