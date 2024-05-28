import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePicture({ imageUrl }) {
  return (
    <View style={styles.profilePictureContainer}>
      {imageUrl ? (
        <Image source={{ uri: imageUrl }} style={styles.profilePicture} />
      ) : (
        <Ionicons name="person" size={120} color="#bbb" />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  profilePictureContainer: {
    width: 130,
    height: 130,
    borderRadius: 60,
    backgroundColor: '#eee',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginTop: 45,
    marginBottom: 20,
  },
  profilePicture: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
  },
});
