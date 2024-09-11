import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

const ChampionshipCard = ({ championship, onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.cardWrapper}>
      <View style={styles.card}>
        <Image source={{ uri: championship.image }} style={styles.cardImage} />
      </View>
      <Text style={styles.cardText}>{championship.name}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  cardWrapper: {
    width: '48%',
    marginBottom: hp('2%'),
  },
  card: {
    backgroundColor: '#fff', 
    borderColor: '#808080',  
    borderWidth: 1,
    borderRadius: 10,   
    padding: 5,
    alignItems: 'center',
    shadowColor: '#000',   
    shadowOpacity: 0.4,
    shadowRadius: 6,
    elevation: 8,
    height: hp('20%'),
    justifyContent: 'center',
  },
  cardImage: {
    width: '100%',
    height: '90%',
    resizeMode: 'contain',  
  },
  cardText: {
    marginTop: 5,
    fontSize: wp('4%'),
    textAlign: 'center',
    color: 'white',       
    fontWeight: 'bold',       
  },
});

export default ChampionshipCard;
