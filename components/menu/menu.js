import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { Ionicons, MaterialIcons, FontAwesome6 } from '@expo/vector-icons';
import ProfilePicture from '../perfil/pictureProfile';
import SignUpButton from '../signUp/signUpButton';
import { useNavigation } from '@react-navigation/native';
import SignUpModal from '../modal/siginUpModal';

const screenHeight = Dimensions.get('window').height;

export default function Menu({ isOpen, onClose }) {
  const menuTranslateX = useRef(new Animated.Value(-348)).current;
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);
  const navigation = useNavigation();

  useEffect(() => {
    Animated.timing(menuTranslateX, {
      toValue: isOpen ? 0 : -348,
      duration: 300,
      easing: Easing.inOut(Easing.ease),
      useNativeDriver: true,
    }).start();
  }, [isOpen]);

  const handleSignUpPress = () => {
    setIsSignUpModalVisible(true);
  };

  const handleModalClose = () => {
    setIsSignUpModalVisible(false);
  };

  const navigateToOrganizarCampeonatos = () => {
    onClose();
    navigation.navigate('Campeonatos');
  };

  const navigateToCampeonatosSeguidos = () => {
    onClose();
    navigation.navigate('Seguidos');
  };

  const navigateToContato = () => {
    onClose();
    navigation.navigate('Contato');
  };

  const navigateToPoliticaPrivacidade = () => {
    onClose();
    navigation.navigate('PoliticaPrivacidade');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menu, { transform: [{ translateX: menuTranslateX }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="arrow-forward" size={35} color="white" />
        </TouchableOpacity>

        <View style={styles.profileContainer}>
          <View style={styles.profileContent}>
            <ProfilePicture />
            <SignUpButton onPress={handleSignUpPress} />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campeonatos</Text>
          <TouchableOpacity style={styles.sectionItem} onPress={navigateToOrganizarCampeonatos}>
            <Ionicons name="trophy" size={24} color="white" />
            <Text style={styles.sectionItemText}>Organizar Campeonatos</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={navigateToCampeonatosSeguidos}>
            <Ionicons name="bookmark" size={24} color="white" />
            <Text style={styles.sectionItemText}>Campeonatos Seguidos</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajuda</Text>
          <TouchableOpacity style={styles.sectionItem} onPress={navigateToContato}>
            <FontAwesome6 name="contact-book" size={24} color="white" />
            <Text style={styles.sectionItemText}>Contato</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.sectionItem} onPress={navigateToPoliticaPrivacidade}>
            <MaterialIcons name="policy" size={24} color="white" />
            <Text style={styles.sectionItemText}>Política de Privacidade</Text>
          </TouchableOpacity>
        </View>
      </Animated.View>

      <SignUpModal visible={isSignUpModalVisible} onClose={handleModalClose} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  menu: {
    position: 'absolute',
    // top: 45,
    bottom: 0,
    left: 0,
    width: 350,
    height: '100%',
    backgroundColor: '#1F1F1F',
    zIndex: 1,
    padding: 0,
  },
  closeButton: {
    position: 'absolute',
    top: 50,
    right: 15,
    zIndex: 4,
  },
  profileContainer: {
    width: '100%',
    height: 300,
    backgroundColor: '#2C2C2C', 
    alignItems: 'center',
    justifyContent: 'center',
  },
  profileContent: {
    marginBottom: 20,
    alignItems: 'center',
  },
  section: {
    paddingHorizontal: 15,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: 'white', 
  },
  sectionItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 15,
    padding: 10,
    backgroundColor: '#333', 
    borderRadius: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
  },
  sectionItemText: {
    marginLeft: 10,
    fontSize: 18,
    color: 'white', 
  },
});
