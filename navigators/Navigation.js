import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import { NavigationContainer } from '@react-navigation/native';
import HomeScreen from '../screens/HomeScreen';
import OrganizarCampeonatos from '../screens/CampeonatosScreen';
import CampeonatosSeguidos from '../screens/SeguidosScreen';
import ChampionshipDetailTabs from './BottomTab';
import TeamsScreen from '../screens/TeamsScreen';

const Stack = createStackNavigator();

export default function AppNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: { backgroundColor: '#041F21' },
          headerTintColor: '#fff',
          headerTitleStyle: { fontWeight: 'bold' },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Campeonatos"
          component={OrganizarCampeonatos}
          options={{ title: 'Organizar Campeonatos' }}
        />
        <Stack.Screen
          name="Seguidos"
          component={CampeonatosSeguidos}
          options={{ title: 'Campeonatos Seguidos' }}
        />
        <Stack.Screen
          name="ChampionshipDetail"
          component={ChampionshipDetailTabs}
          options={({ route }) => ({ title: route.params.name })}
        />
        <Stack.Screen
          name="AddTeamsScreen"
          component={TeamsScreen}
          options={({ route }) => ({
            title: 'Times',
          })}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
