import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import ChampionshipDetailScreen from '../screens/ChampionshipDetailsScreen';
import MatchesScreen from '../screens/MatchesScreen';
import StatsScreen from '../screens/StatsScreen';
import TableScreen from '../screens/TablesScreen';

const Tab = createBottomTabNavigator();

export default function ChampionshipDetailTabs({ route }) {
  const params = route.params || {};

  return (
    <Tab.Navigator
      screenOptions={{
        tabBarStyle: { 
          backgroundColor: '#041F21', 
          height: 60, 
          paddingBottom: 10, 
          borderRadius: 50,
          top: '-0.5%',
          width: '95%',
          marginLeft: '2%',
        },
        tabBarActiveTintColor: '#fff',
        tabBarLabelStyle: {
          fontSize: 12, 
          backgroundColor: '#041F21', 
        },
      }}
    >
      <Tab.Screen 
        name="Inicio" 
        component={ChampionshipDetailScreen} 
        initialParams={params}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Partidas"
        component={MatchesScreen} 
        initialParams={params}
        options={{ 
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Tabela" 
        component={TableScreen} 
        initialParams={params}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="podium-outline" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen 
        name="Estatisticas" 
        component={StatsScreen} 
        initialParams={params}
        options={{
          headerShown: false,
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="stats-chart" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}
