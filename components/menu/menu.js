import React, { useEffect, useRef, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions, ImageBackground } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import ProfilePicture from '../perfil/pictureProfile';
import SignUpButton from '../signUp/signUpButton';
import OrganizarCampeonatos from '../campeonatos/orgCampeonatos';
import CampeonatosSeguidos from '../campeonatosSeguidos/followCamp';
import AbrirLink from '../links/openLinks';
import Contato from '../contact/contact';
import PoliticaPrivacidade from '../privacyPolicy/privacyPolicy';
import SignUpModal from '../modal/siginUpModal'

const screenHeight = Dimensions.get('window').height;

export default function Menu({ isOpen, onClose }) {
  const menuTranslateX = useRef(new Animated.Value(-348)).current;
  const [isSignUpModalVisible, setIsSignUpModalVisible] = useState(false);

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

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menu, { transform: [{ translateX: menuTranslateX }] }]}>
        <TouchableOpacity style={styles.closeButton} onPress={onClose}>
          <Ionicons name="arrow-forward" size={35} color="black" />
        </TouchableOpacity>

        <ImageBackground source={require('../../assets/camp.jpeg')} style={styles.profileContainer}>
          <View style={styles.profileContent}>
            <ProfilePicture />
            <SignUpButton onPress={handleSignUpPress} /> 
          </View>
        </ImageBackground>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Campeonatos</Text>
          <OrganizarCampeonatos />
          <CampeonatosSeguidos />
          <AbrirLink />
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Ajuda</Text>
          <Contato />
          <PoliticaPrivacidade />
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
    top: 25,
    bottom: 0,
    left: 0,
    width: 350,
    height: '100%',
    backgroundColor: '#fff',
    zIndex: 3,
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
    height: 'auto',
    marginTop: 10,
    alignItems: 'center',
  },
  profileContent: {
    marginTop: 10,
    marginBottom: 20,
    display: 'flex',
    alignItems: 'center',
  },
  section: {
    marginTop: 20,
    paddingHorizontal: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
});
