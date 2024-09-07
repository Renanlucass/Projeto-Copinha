import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from './screens/HomeScreen';
import OrganizarCampeonatos from './screens/OrganizarCampeonatos';
import CampeonatosSeguidos from './screens/CampeonatosSeguidos';
import AbrirLink from './screens/AbrirLink';
import Contato from './screens/Contato';
import PoliticaPrivacidade from './screens/PoliticaPrivacidade';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="OrganizarCampeonatos" component={OrganizarCampeonatos} options={{ title: 'Organizar Campeonatos' }} />
        <Stack.Screen name="CampeonatosSeguidos" component={CampeonatosSeguidos} options={{ title: 'Campeonatos Seguidos' }} />
        <Stack.Screen name="AbrirLink" component={AbrirLink} options={{ title: 'Abrir Link' }} />
        <Stack.Screen name="Contato" component={Contato} options={{ title: 'Contato' }} />
        <Stack.Screen name="PoliticaPrivacidade" component={PoliticaPrivacidade} options={{ title: 'Política de Privacidade' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
