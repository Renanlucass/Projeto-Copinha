import React, { useState, useRef } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TextInput, Dimensions, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import Menu from '../components/menu/menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function App() {
  const [activeTab, setActiveTab] = useState('Região');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const tabWidth = wp('45%');
  const menuTranslateX = useRef(new Animated.Value(-wp('80%'))).current;

  const navigation = useNavigation();

  const handleTabPress = (tab) => {
    setActiveTab(tab);
  };

  const toggleMenu = () => {
    if (isMenuOpen) {
      Animated.timing(menuTranslateX, {
        toValue: -wp('80%'),
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start(() => {
        setIsMenuOpen(false);
      });
    } else {
      setIsMenuOpen(true);
      Animated.timing(menuTranslateX, {
        toValue: 0,
        duration: 300,
        easing: Easing.inOut(Easing.ease),
        useNativeDriver: true,
      }).start();
    }
  };

  const handleChampionshipsNavigation = () => {
    navigation.navigate('Championships');
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuTranslateX }] }]}>
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} navigate={navigation.navigate} />
      </Animated.View>
      {!isMenuOpen && (
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name={'menu'} size={32} color="black" />
        </TouchableOpacity>
      )}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#111" style={styles.searchIcon} />
        <TextInput style={styles.searchInput} placeholder="Campeonatos" />
      </View>

      <View style={styles.tabContainer}>
        <TouchableOpacity onPress={() => handleTabPress('Região')}>
          <View style={[styles.tab, activeTab === 'Região' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Região' ? styles.activeTabText : styles.inactiveTabText]}>Região</Text>
            {activeTab === 'Região' && <View style={[styles.tabIndicator, { left: 0, width: tabWidth }]} />}
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => handleTabPress('Online')}>
          <View style={[styles.tab, activeTab === 'Online' && styles.activeTab]}>
            <Text style={[styles.tabText, activeTab === 'Online' ? styles.activeTabText : styles.inactiveTabText]}>Online</Text>
            {activeTab === 'Online' && <View style={[styles.tabIndicator, { right: 0, width: tabWidth }]} />}
          </View>
        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={styles.cardsScrollView}>
        <Text style={styles.organizersTitle}>Organizadores</Text>
        <View style={styles.cardsContainer}>
          {Array.from({ length: 10 }).map((_, index) => (
            <TouchableOpacity onPress={handleChampionshipsNavigation} key={index} style={styles.cardWrapper}>
              <View style={styles.card}>
                <Image source={require('../assets/logo.png')} style={styles.cardImage} />
              </View>
              <Text style={styles.cardText}>Campeonato {index + 1}</Text>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
    backgroundColor: 'white',
  },
  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: hp('2%'),
    top: 20,
  },
  menuContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    width: wp('80%'),
    zIndex: 3,
  },
  menuButton: {
    position: 'absolute',
    top: hp('9%'),
    left: wp('7%'),
    zIndex: 2,
  },
  logoContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignSelf: 'center',
    alignItems: 'center',
    marginBottom: 10,
  },
  logo: {
    width: wp('30%'),
    height: hp('10%'),
    resizeMode: 'contain',
    marginBottom: 10,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#000',
    borderWidth: 1,
    borderRadius: 20,
    height: hp('6%'),
    width: wp('85%'),
    marginVertical: hp('1%'),
    marginHorizontal: wp('5%'),
    backgroundColor: '#F5F5F5',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
  },
  searchIcon: {
    marginLeft: wp('5%'),
  },
  searchInput: {
    flex: 1,
    paddingHorizontal: wp('2%'),
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: hp('2%'),
  },
  tab: {
    paddingHorizontal: wp('15%'),
    paddingVertical: hp('1%'),
    position: 'relative',
  },
  tabText: {
    fontSize: wp('5%'),
    fontWeight: 'bold',
  },
  tabIndicator: {
    height: hp('0.5%'),
    backgroundColor: 'black',
    position: 'absolute',
    bottom: 0,
    borderRadius: hp('0.25%'),
  },
  activeTabText: {
    color: 'black',
  },
  inactiveTabText: {
    color: '#9C9C9C',
  },
  organizersTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
  },
  cardsScrollView: {
    flexGrow: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  cardWrapper: {
    width: '48%',
    marginBottom: hp('2%'),
  },
  card: {
    backgroundColor: '#fff',
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
    elevation: 5,
    height: hp('20%'),
    justifyContent: 'center', 
  },
  cardImage: {
    width: '90%', 
    height: '70%',
    resizeMode: 'contain',
  },
  cardText: {
    marginTop: 5,
    fontSize: wp('4%'),
    textAlign: 'center',
  },
});
