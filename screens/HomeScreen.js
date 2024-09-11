import React, { useState, useEffect, useRef, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, Image, TouchableOpacity, Animated, Easing } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import Menu from '../components/menu/menu';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { getChampionships } from '../data/database';
import ChampionshipCard from '../components/card/ChampionshipCard';

export default function HomeScreen() {
  const [activeTab, setActiveTab] = useState('Região');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [championships, setChampionships] = useState([]);
  const [filteredChampionships, setFilteredChampionships] = useState([]);
  const [searchText, setSearchText] = useState('');
  const tabWidth = wp('45%');
  const menuTranslateX = useRef(new Animated.Value(-wp('80%'))).current;
  const navigation = useNavigation();

  useEffect(() => {
    loadChampionships();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadChampionships();
    }, [])
  );

  const loadChampionships = async () => {
    try {
      const loadedChampionships = await getChampionships();
      const sortedChampionships = loadedChampionships.sort((a, b) => b.id - a.id);
      setChampionships(sortedChampionships);
      setFilteredChampionships(sortedChampionships);
    } catch (error) {
      console.error('Error loading championships:', error);
    }
  };

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

  const handleSearch = (text) => {
    setSearchText(text);
    if (text) {
      const filtered = championships.filter(championship =>
        championship.name.toLowerCase().includes(text.toLowerCase())
      );
      setFilteredChampionships(filtered);
    } else {
      setFilteredChampionships(championships);
    }
  };

  const handleChampionshipPress = (championship) => {
    navigation.navigate('ChampionshipDetail', {
      name: championship.name,
      image: championship.image,
      description: championship.description,
    });
  };

  return (
    <View style={styles.container}>
      <Animated.View style={[styles.menuContainer, { transform: [{ translateX: menuTranslateX }] }]}>
        <Menu isOpen={isMenuOpen} onClose={toggleMenu} navigate={navigation.navigate} />
      </Animated.View>
      {!isMenuOpen && (
        <TouchableOpacity style={styles.menuButton} onPress={toggleMenu}>
          <Ionicons name={'menu'} size={32} color="white" />
        </TouchableOpacity>
      )}
      <View style={styles.headerContainer}>
        <View style={styles.logoContainer}>
          <Image source={require('../assets/logo.png')} style={styles.logo} />
        </View>
      </View>

      <View style={styles.searchContainer}>
        <Ionicons name="search" size={22} color="#111" style={styles.searchIcon} />
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar campeonatos"
          value={searchText}
          onChangeText={handleSearch}
        />
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
        <Text style={styles.organizersTitle}>Campeonatos</Text>
        <View style={styles.cardsContainer}>
          {filteredChampionships.map((championship) => (
            <ChampionshipCard
              key={championship.id}
              championship={championship}
              onPress={() => handleChampionshipPress(championship)}
            />
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
    backgroundColor: '#222f2f',
    // backgroundColor: '#084d6e',
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
    color: 'white'
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
    backgroundColor: 'white',
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
    backgroundColor: 'white',
    position: 'absolute',
    bottom: 0,
    borderRadius: hp('0.25%'),
  },
  activeTabText: {
    color: 'white',
  },
  inactiveTabText: {
    color: '#9C9C9C',
  },
  organizersTitle: {
    fontSize: wp('4%'),
    fontWeight: 'bold',
    marginVertical: hp('2%'),
    color: 'white',
  },
  cardsScrollView: {
    flexGrow: 1,
  },
  cardsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
});