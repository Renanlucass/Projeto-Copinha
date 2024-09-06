import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import HomeScreen from './screens/HomeScreen';
import CampeonatosScreen from './screens/CampeonatosScreen';
import SeguidosScreen from './screens/SeguidosScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
        <Stack.Screen name="Campeonatos" component={CampeonatosScreen} options={{ title: 'Organizar Campeonatos' }} />
        <Stack.Screen name="Seguidos" component={SeguidosScreen} options={{ title: 'Campeonatos Seguidos' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
